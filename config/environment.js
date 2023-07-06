const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


// const accessLogStream = rfs('access.log', {
//     interval : '1d',
//     path : logDirectory
// })


const development = {
    name : 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    MONGO_URL : "mongodb://0.0.0.0/codial1234mani",
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
            user: 'kumarachilish1997@gmail.com', // Update with your Gmail address
            pass: 'lkxdkeooubzrrydb', // Update with the generated application-specific password
          },
    },
    google_client_id: "449724975312-rg4063ah4fbnto0jp2vmk3fchptp3797.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8080/users/auth/google/callback",
    jwt_secret: 'codeial',
    // morgan:{
    //     mode: 'dev',
    //     options: {
    //         stream : accessLogStream
    //     }
    // }
}


const production = {
    name : 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    MONGO_URL : 'mongodb+srv://Mani_9876:Manish1234@cluster0.2jtmimb.mongodb.net/codeial_db?retryWrites=true&w=majority',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, // Update with your Gmail address
            pass: process.env.CODEIAL_GMAIL_PASSWORD, // Update with the generated application-specific password
          },
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    // morgan:{
    //     mode: 'combined',
    //     options: {
    //         stream : accessLogStream
    //     }
    // }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);