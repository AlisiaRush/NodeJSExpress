const express = require('express');
const moviesController = require("../Controllers/moviesController");

// MOUNTING ROUTES.. In case you want to use api's in different files.
const router = express.Router();

//param middleware -ID
router.param('id', moviesController.checkId);

router.route('/')
.get(moviesController.getAllMovies)
.post(moviesController.validateBody, moviesController.createMovie)

router.route('/:id')
.get(moviesController.getMovie)
.patch(moviesController.updateMovies)
.delete(moviesController.deleteMovie)

module.exports = router;