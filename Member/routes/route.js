const express = require('express');
const route = express.Router();

const multer = require('multer');
const verifyToken=require('../../Middleware/memberAuth')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const AuthenticationController=require('../Controller/AuthenticationController');
const CountryController = require("../Controller/CountryController");


route.post('/login',  upload.none(), AuthenticationController.loginVerify);
route.post('/signup',  upload.any(),  AuthenticationController.signup);
route.get('/countryList',CountryController.countryList);
route.get('/cityList',CountryController.cityList);
route.get('/countryCode',CountryController.CountryCode);









module.exports = route;