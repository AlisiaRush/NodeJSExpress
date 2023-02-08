// EXPRESS REQUIREMENTS
const express = require('express');
const morgan = require("morgan"); // allows you to see status code/time etc in console.

const moviesRouter = require('./Routes/movies.Routes');

let app = express();

// NOT MIDDLEWARE FUNCTIONS... They will return something
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.static('./public')); // Reads HTML file. Public is a good standard to assign to static
// app.use(morgan('tiny'));

// MIDDLEWARE - Modifies request and response

// MIDDLEWARE - 3 Objects (req, res, next). They will call something
const logger = function(req, res, next){
    console.log(" Custom middleware called");
    next();
}

// If placed after Route Handlers...This will not be indicated. If the request handlers fire off first.. This
// Middleware will not be applied.
app.use(logger);

app.use((req,res,next) =>{
   req.requestedAt = new Date().toISOString();
   next();
})

// GET, POST, PATCH/PUT, DELETE METHODS
// app.get('/api/v1/movies', getAllMovies);
// app.get('/api/v1/movies/:id', getMovie);
// app.post('/api/v1/movies', createMovie);
// app.patch('/api/v1/movies/:id', updateMovies);
// app.delete('/api/v1/movies/:id', deleteMovie);
app.use('/api/v1/movies', moviesRouter);
//------------------------------------------------------------------------------------------------------

module.exports = app;


