const express = require("express");
const app = express();
require('dotenv').config()
const path = require('path')
const PORT = process.env.PORT;
const mongoose = require("mongoose")

// BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser")
app.use(cookieParser())

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);



//ADDED FOR SEVER RENDERING
// app.use(express.static(path.join(__dirname, 'build')));

// app.use('/public', express.static(path.join(__dirname, 'public')))



const routes = require("./routes/routes");
const { socketIoConnection } = require("./lib/socketio");
app.use(routes);

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 5000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    },
    pingInterval: 20000,
    pingTimeout: 30000,
  });
  
  socketIoConnection(io, app)

// app.get('/', (req, res) => {
//     res.send({ status: 200, data: "Server running okay" });
// })

// const d = new Date(Date.now())
// console.log(Date.now())


//ADDED FOR SEVER RENDERING
// if (process.env.NODE_ENV === "production") {
//     app.get('/*', function (req, res) {
//         res.sendFile(path.join(__dirname, 'build', 'index.html'));
//     });
// }


mongoose.connect(process.env.MONGODB_URL).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.log(`Database connection error ${error}`)
})


