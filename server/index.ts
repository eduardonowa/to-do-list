import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'your-secret-key-change-in-production';
const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Login endpoint
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const db = router.db;
  const user = db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '24h',
  });

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    user: userWithoutPassword,
    token,
  });
});

// Middleware to verify JWT token
server.use((req, res, next) => {
  if (req.path === '/auth/login' || req.method === 'GET') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number; email: string };
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Middleware to add userId to POST/PUT/PATCH requests
server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    if (req.path.includes('/tasks')) {
      (req.body as any).userId = (req as any).userId || (req.body as any).userId;
    }
  }
  next();
});

// Filter tasks by userId for GET requests
server.use((req, res, next) => {
  if (req.method === 'GET' && req.path.includes('/tasks')) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: number; email: string };
        (req.query as any).userId = decoded.userId;
      } catch (error) {
        // If token is invalid, continue without filtering
      }
    }
  }
  next();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
