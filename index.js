const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = 80;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const saasMiddleware = require('node-sass-middleware');
const dotenv=require('dotenv');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const path = require('path');


app.use(saasMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix : '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));

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




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    secret : env.session_cookie_key,
    //user is not logined , Identity has not established
    saveUninitialized : false,
    // Identity has been established
    resave : false,
    cookie :{
        maxAge: (1000 * 60 * 60)
    },
    store: new MongoStore({
        mongoUrl:  'mongodb+srv://Mani_9876:Manish1234@cluster0.2jtmimb.mongodb.net/?retryWrites=true&w=majority',
        mongooseConnection: db,
        autoRemove: 'disabled'
      }, function (err){
        console.log(err || 'connect-mongod db setup');
      }
)}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
