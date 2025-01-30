const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const route = require('./Admin/routes/route');
const routes = require('./Member/routes/route');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const flash = require('connect-flash');

app.locals.AdminRoute = (path = '') => `${path}`;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Admin/views'));

app.use(express.json());

app.use(session({
    secret: 'nodedemo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(cookieParser());

app.use(flash()); 


app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

app.set('layout', 'layout/layout');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.Admin = (path = '') => `${path}`;
    next();
});

app.use((req, res, next) => {
    res.Member = (path = '') => `/Member{path}`;
    next();
});

app.use('/', route);
app.use('/Member', routes);

app.use((err, req, res, next) => {
    let error = { ...err }
    if (error.name === 'JsonWebTokenError') {
        err.message = "please login again";
        err.statusCode = 401;
        return res.status(401).redirect('view/login');
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'errors';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,

    })
});

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));