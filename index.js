const express = require('express');
const app = express();
const port = 8080;

//use express router middleware
app.use('/', require('./routes/index'))




app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`)
})