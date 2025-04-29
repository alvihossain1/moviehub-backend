# Moviehub server

This project is an express app with mongodb database, using socket.io as realtime connection system.
Packages such as 'bcryptjs' is used for hashing passwords, 'jsobwebtoken' for tokenizing authentication system.

## Setup Instructions
```bash
npm install
npm start
```

## API Endpoints
```bash
|- routes
|-- routes.js
|--- /auth/register
|--- /auth/login
|--- /movies
|--- /movies/:id

|- lib
|-- socketio.js
|--- /movies (post)
|--- /movies/:id/rate (post)
```

## ENV Variables
```bash
PORT=3001
SERVER_URL = http://localhost:3001

NODE_ENV=development
MONGODB_URL=mongodb://localhost/moviehub
ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_secret_key
```

## Token Flow
- User receives Access token and Refresh token when logging into the system

## Deployement
- Application is hosted and live on render.com