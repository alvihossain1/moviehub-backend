const { postMoviesController, setMovieRating } = require("../controllers/moviesController");
const { authorizationCheck } = require("../middleware/auth");

exports.socketIoConnection = async (io, app) => {

    io.on("connection", (socket) => {
        console.log(`USER CONNECTED: ${socket.id}`)
    

        socket.on("movie_connection", (data, callback) => {
            socket.join('movie_room');
        })

        app.post("/movies", authorizationCheck, postMoviesController, (req, res) => {
            const {name, genre, description,} = req.body
            socket.to('movie_room').emit("movies", {_id: req._id, name, genre, description, ratings: 0});
        })

        app.post("/movies/:id/rate", authorizationCheck, setMovieRating, (req, res) => {
          socket.to('movie_room').emit("movies-ratings", req.dataObject);
          socket.to('movie_room').emit("movie-ratings-update", {movieId: req.dataObject.movieId});
        });
        

          
        // DISCONNECT
        socket.on("disconnect", (reason) => {
          console.log("User Disconnected", socket.id);
    
          
    
    
          
    
          // for (const room of socket.rooms) {      
          //   if (room !== socket.id) {
          //     socket.to(room).emit("receive_message", "User has left the chat");
          //   }
          // }
    
        });
    
        
    
    
    
      });
    };
    