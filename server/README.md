# Server

This folder contains the mock API server using JSON Server with JWT authentication.

## Files

- `index.ts` - Main server file with JWT authentication middleware
- `db.json` - Database file with users and tasks

## Running the Server

```bash
npm run api
```

The server will start on `http://localhost:3001`

## Configuration

- **Port**: 3001 (configurable via `PORT` environment variable)
- **JWT Secret**: Change `SECRET_KEY` in production (configurable via `JWT_SECRET` environment variable)
- **Token Expiration**: 24 hours
- **API Delay**: 1000ms (1 second) by default, configurable via `API_DELAY` environment variable (in milliseconds). Set to `0` to disable delay.

### Environment Variables

Create a `.env` file in the root directory to customize:

```env
PORT=3001
JWT_SECRET=your-secret-key
API_DELAY=1000  # Delay in milliseconds (1000 = 1 second)
```

To disable the delay for faster development, set `API_DELAY=0`.
