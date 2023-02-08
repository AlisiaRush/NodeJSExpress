const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

exports.checkId = (req, res, next, value) =>{
    console.log('No movie object with " +id+ " is found');
    
    let movie = movies.find(el => el.id === +value);

    if(!movie){
        return res.status(404).json({
            status: 'Fail',
            message: "Movie with ID " +value+ " Not Found" 
        })
    }
    next();
}

exports.validateBody = (req, res, next) =>{
    if(!req.body.name || !req.body.releaseYear){
        return res.status(400).json({
            status: 'Fail',
            message: "Not a valid movie data"
        })
    }
    next();
}
// ROUTE HANDLER FUNCTIONS--------------------------------------------
exports.getAllMovies = (req, res) =>{
    res.status(200).json({
        status: "success",
        requestedAt: req.requestedAt,
        count: movies.length,
        data: {
            // inveloping
            movies: movies
        }
    })
} 

exports.getMovie = (req, res) =>{
    const id = req.params.id * 1;
    let movie = movies.find(el => el.id === id);

    // if(!movie){
    //     return res.status(404).json({
    //         status: 'Fail',
    //         message: "Movie with ID " +id+ " Not Found"
           
    //     })
    // }
        res.status(200).json({
            status: "success", 
            data : {
                movie: movie
            }
        }) 
}

exports.createMovie = (req, res)=>{
    console.log(req.body);
    const newId = movies[movies.length - 1].id + 1; // Creates new ID
    const newMovie = Object.assign({id: newId}, req.body)

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    })
}

exports.updateMovies = (req, res) =>{
    let id = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id === id);

    // if(!movieToUpdate){
    //    return res.status(404).json({
    //         status: "Fail",
    //         message: "No movie object with " +id+ " is found"
    //     })
    // }

    let movieIndex = movies.indexOf(movieToUpdate);

    Object.assign(movieToUpdate, req.body)

    movies[movieIndex] = movieToUpdate;
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    })
}

exports.deleteMovie = (req, res) => {
    const id = req.params.id *1;
    const movieToDelete = movies.find(el => el.id === id);
    const movieIndex = movies.indexOf(movieToDelete);

    // if(!movieToDelete){
    //    return res.status(404).json({
    //     status: "Fail",
    //     message: "No movie object with " +id+ " is found to delete" 
    //    })
    // }

    movies.splice(movieIndex, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })
}
//------------------------------------------------------------------------------------------------------
