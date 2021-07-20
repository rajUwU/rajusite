/**
 * Reqiuired External Variables and App Variables
 */

require('dotenv').config();
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var router = express.Router()
const { auth, requiresAuth } = require("express-openid-connect");
var MongoClient = require('mongodb').MongoClient



//mongodb integration
// MongoClient.connect('mongodb://localhost:27017/anime', function(err, client) {
//     if (err) throw err

//     var anime = client.db('anime')

//     anime.collection('titles').find().toArray(function (err, result) {
//         if (err) throw err
//         var titles = [];
//         result.forEach(element => {
//             titles.push(element['name'])
//         })
//         console.log(titles)
//         app.get('/api/anime', (req, res) => {
//             res.send({ctx: titles })
//         })
//     })
// }) 


/**
 * Example for how the api work
 */

app.get('/api/hello', (req, res) => {
    res.send({ctx:'hello world'})
})



/**
 * App Configuration
 */

app.use('/', router);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use(
    auth({
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.AUTH0_CLIENT_ID,
        secret: process.env.SESSION_SECRET,
        authRequired: false,
        auth0Logout: true,
        clientSecret: process.env.CLIENT_SECRET,
        authorizationParams: {
            response_type: 'code',
            audience: process.env.AUTH0_AUDIENCE,
        }
    })
)



/**
 * Routes Definations
 */

 const asyncMiddleware = fn =>
 (req, res, next) => {
   Promise.resolve(fn(req, res, next))
     .catch(next);
 };


// > Authentication

app.get(["/sign-up/","/login/"], (req, res) => {
    const page = "http://localhost:3000/callback"

    res.oidc.login({
        returnTo: page,
        authorizationParams: {
            screen_hint: "signup",
        },
    });
});

app.get(["/v2/logout/","/logout/"], requiresAuth(), (req, res) => {

    res.oidc.logout({ returnTo: "http://localhost:3000" });
});


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.oidc.isAuthenticated();
    res.locals.activeRoute = req.originalUrl;
    next();
})

/**
 * Profile
 */

app.get('/api/profile', requiresAuth(), (req,res) => {
    const user = req.oidc.user;
    res.json(user);
})

/**
 * Other Routes
 */

app.get('/user-info', requiresAuth(), asyncMiddleware(async (req, res) => {

    const userInfo = await req.oidc.fetchUserInfo();
    res.json(userInfo);
}))

app.get('/api/username', asyncMiddleware(async (req, res) => {

    const userInfo = await req.oidc.fetchUserInfo();
    res.send({ ctx: `${userInfo['given_name'] + ' ' + userInfo['family_name']}` });
}))

app.get('/api/isauthenticated', asyncMiddleware(async (req, res) => {

    const userInfo = await req.oidc.isAuthenticated();
    res.send({ ctx: userInfo });
}))



/**
 * Server Activation
 */
const env = process.env.NODE_ENV || "development";
const PORT = 
    env === "development" ? process.env.DEV_PORT : process.env.PROD_PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;