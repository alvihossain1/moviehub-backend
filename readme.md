# Moviehub server
## Run the following commands
```bash
npm install
npm start
```

This project is an express app with mongodb database, using socket.io as realtime connection system.
Packages such as 'bcryptjs' is used for hashing passwords, 'jsobwebtoken' for tokenizing authentication system.

## ENV Variables
```bash
PORT=3001
SERVER_URL = http://localhost:3001

NODE_ENV=development
MONGODB_URL=mongodb://localhost/moviehub
ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_secret_key
```