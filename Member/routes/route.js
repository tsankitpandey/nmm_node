const express = require('express');
const route = express.Router();

const multer = require('multer');
const verifyToken=require('../../Middleware/memberAuth')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const asyncHandler = require('express-async-handler');

const AuthenticationController=require('../Controller/AuthenticationController');
const CountryController = require("../Controller/CountryController");
const MembershipController=require("../Controller/MembershipController")
const NewsController = require("../Controller/NewsController")
const EventsController = require("../Controller/EventsController")
route.post('/login',  upload.none(), AuthenticationController.loginVerify);
route.post('/signup',  upload.any(),  AuthenticationController.signup);
route.get('/countryList',CountryController.countryList);
route.get('/cityList',CountryController.cityList);
route.get('/countryCode',CountryController.CountryCode);
route.get('/GetEvents',EventsController.getAllEvents);
route.post('/MembershipPlan',asyncHandler(MembershipController.MembershipPlan));
route.post('/UpgradePlan',asyncHandler(MembershipController.UpgradePlan));
route.get('/getnews',NewsController.getAllNews);


module.exports = route;