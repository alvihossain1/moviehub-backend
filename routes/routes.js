const express = require('express');
const { registerController, loginController, handleAccessToken } = require('../controllers/authController');
const { authorizationCheck } = require('../middleware/auth');
const { postMoviesController, getMoviesController, getMovieByIdController } = require('../controllers/moviesController');
const router = express.Router();

router.get("/", (req, res) => { res.status(200).json(`Server is running okay and live on this url: ${process.env.SERVER_URL}, Hello there!`) })
router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
router.post("/auth/refresh-token", handleAccessToken)
router.get("/movies", getMoviesController);
router.get("/movies/:id", getMovieByIdController);

// router.post("/auth/refresh-token", (req, res) => {console.log(`/auth/refresh-token - working fine`)});
// router.post("/movies", (req, res) => {console.log(`/moveis - working fine`)});
// router.get("/movies/:id", (req, res) => {console.log(`/moveis - working fine`)});
// router.post("/movies/:id/rate", (req, res) => {console.log(`/moveis - working fine`)});

module.exports = router;