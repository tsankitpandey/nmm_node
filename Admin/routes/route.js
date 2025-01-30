const express = require('express');
const route = express.Router();
const multer = require('multer');
const {verifyToken ,Authenticated ,logout}= require('../../Middleware/auth')
const DashboardController=require("../Controller/DashboardController");
const AuthenticationController=require("../Controller/AuthenticationController");
const EventController=require("../Controller/EventController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// routes

route.get('/',  Authenticated, AuthenticationController.login);
route.post('/login',upload.none(),  AuthenticationController.loginVerify);
route.get('/dashboard', verifyToken, DashboardController.index);
route.get('/logout', logout);

// Sponser Router---
route.get('/sponsor', EventController.sponsorIndex);
route.post('/sponserAdd', EventController.sponserAdd);






module.exports = route;