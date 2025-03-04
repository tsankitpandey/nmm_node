const express = require('express');
const route = express.Router();

const multer = require('multer');
const verifyToken=require('../../Middleware/memberAuth')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const AuthenticationController=require('../Controller/AuthenticationController');


route.post('/login',  upload.none(), AuthenticationController.loginVerify);
route.post('/signup',  upload.any(),  AuthenticationController.signup);









module.exports = route;