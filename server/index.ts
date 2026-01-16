import jsonServer from 'json-server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const SECRET_KEY = process.env.JWT_SECRET ?? 'dev-secret-key';
const PORT = Number(process.env.PORT) || 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

interface IDecodedToken extends JwtPayload {
  userId: number;
  email: string;
}

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const db = (router as any).db;
  const user = db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;

  return res.json({
    user: userWithoutPassword,
    token,
  });
});

server.use((req, res, next) => {
  if (req.path === '/auth/login') {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as IDecodedToken;
    (req as any).userId = decoded.userId;
    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('JWT verification failed:', error.message);
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
});

server.use((req, _res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.path.startsWith('/tasks')) {
    (req.body as any).userId = (req as any).userId;
  }
  next();
});

server.get('/tasks', (req, res) => {
  const userId = (req as any).userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = (router as any).db;
  const userTasks = db.get('tasks').filter({ userId }).value();

  return res.json(userTasks);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
