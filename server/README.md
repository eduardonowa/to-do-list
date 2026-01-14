# Server

This folder contains the mock API server using JSON Server with JWT authentication.

## Files

- `index.js` - Main server file with JWT authentication middleware
- `db.json` - Database file with users and tasks

## Running the Server

```bash
npm run api
```

The server will start on `http://localhost:3001`

## Configuration

- **Port**: 3001 (configurable in `index.js`)
- **JWT Secret**: Change `SECRET_KEY` in production
- **Token Expiration**: 24 hours
