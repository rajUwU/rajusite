require('dotenv').config();
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var router = express.Router()
const { auth } = require("express-openid-connect");



app.use('/', router);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
            scope: 'openid profile email',
            audience: 'https://localhost:5000/user-info',
            response_type: 'id_token',
        }
    })
)


app.get("/sign-up", (req, res) => {
    res.oidc.login({
        authorizationParams: {
            screen_hint: "signup"
        }
    })
})



app.use((req, res, next) => {
    res.locals.isAuthenticated = req.oidc.isAuthenticated();
    res.locals.activeRoute = req.originalUrl;
    next();
})

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };


app.get('/user-info', asyncMiddleware(async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
    res.json(userInfo);
}))




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;