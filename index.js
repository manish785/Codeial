const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const dotenv=require('dotenv');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

//connect to database
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection Succesful")).catch((err)=>{
    console.log(err);
});

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
