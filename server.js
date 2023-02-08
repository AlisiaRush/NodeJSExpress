const dotenv = require("dotenv");
dotenv.config({path: './config.env'});

const app = require("./app");

// CREATE SERVER)
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log('Server has started');
})
