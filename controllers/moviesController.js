const Movies = require("../models/Movies")
const Users = require("../models/Users")

exports.getMoviesController =  async (req, res) => {
    try{
        let movies = await Movies.aggregate([
            {
              $project: {
                _id: 1,
                name: 1,
                genre: 1,
                ratings: { $size: "$ratings" } // Add a new field 'ratingsCount' with the size of the 'ratings' array
              }
            }
          ]);
        res.json({success: true, data: movies})
    }
    catch (error) {
        console.log("ERR", error)
        res.status(500).json(error)
    }
}

exports.postMoviesController = async (req, res, next) => {
    const {name, genre, description} = req.body
    try{
        const movies = await Movies.create({name, genre, description})
        req._id = movies._id
        if(movies){
            next()
        }
    }
    catch (error) {
        console.log("ERR", error)
        res.status(500).json(error)
    }

}

exports.getMovieByIdController =  async (req, res) => {
    const {id} = req.params

    try{
        const movie = await Movies.findById(id)
        console.log("DATA", movie)
        res.json({success: true, data: movie})
    }
    catch (error) {
        console.log("ERR", error)
        res.status(500).json(error)
    }
}

exports.setMovieRating =  async (req, res, next) => {
    const {id} = req.params
    const {rate, email, description} = req.body
    try{
        const movie = await Movies.findById(id)
        const user = await Users.findOne({ email: email });
        const data = {rate, email, description, username: user.name, userId: user._id}
        movie.ratings = [...movie.ratings, data]
        movie.save()       
        req.dataObject = {...data, movieId: id}
        next()
        
    }
    catch (error) {
        console.log("ERR", error)
        res.status(500).json(error)
    }

}