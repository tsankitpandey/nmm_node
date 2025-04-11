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
const DataController = require("../Controller/DataController")
const PricingController= require("../Controller/PricingController")
const TimelineController=require("../Controller/TimelineController");
const ProfileController= require("../Controller/ProfileController");
const BusinessController= require("../Controller/BuisnessController")
const GalleryController = require("../Controller/GalleryController")

route.post('/login',  upload.none(), AuthenticationController.loginVerify);
route.post('/signup',  upload.any(),  AuthenticationController.signup);
route.get('/countryList',CountryController.countryList);
route.get('/cityList',CountryController.cityList);
route.get('/countryCode',CountryController.CountryCode);
route.get('/GetEvents',EventsController.getAllEvents);
route.post('/MembershipPlan',asyncHandler(MembershipController.MembershipPlan));
route.post('/UpgradePlan',asyncHandler(MembershipController.UpgradePlan));
route.get('/getnews',NewsController.getAllNews);
route.get('/getcontainer',DataController.getContainer);
route.get('/getairportmaster',DataController.airportMaster);
route.get('/getcommoditymaster',DataController.commodityMaster);
route.get('/getIMOmaster',DataController.imoMaster);
route.get('/getUNmaster',DataController.UnMaster);
route.get('/getcompanyList',DataController.Companylist);
route.post('/insertPricing', upload.any(),PricingController.insertPricing);
route.post('/getSent_request', upload.any(),PricingController.Requestget);
route.post('/getFillterd_request', upload.any(),PricingController.RequestFillter);
route.post('/request_accept', upload.any(),PricingController.RequestApprove);
route.post('/Approvedrequest', upload.any(),PricingController.ApprovedRequest);

route.post('/TimelineInsert',upload.any(),asyncHandler(TimelineController.FeedsInsert));
route.post('/TimelineGet',upload.none(),asyncHandler(TimelineController.TimelineGet));
route.post('/TimelineLike',upload.none(),asyncHandler(TimelineController.TimelineLike));
route.post('/MemberTimeline',upload.any(), asyncHandler(GalleryController.deleteMedia));

route.post('/ProfileGet',upload.none(),asyncHandler(ProfileController.profileGet));
route.post('/SocialUpdate',upload.none(),asyncHandler(ProfileController.SocialUpdate));
route.post('/introUpdate',upload.none(),asyncHandler(ProfileController.EditIntro));
route.post('/updateMember',upload.any(),asyncHandler(ProfileController.updateMember))
route.get('/getservices',upload.any(),asyncHandler(DataController.Services))
route.post('/Insertservices',upload.any(),asyncHandler(DataController.insertCompanyServices))


route.post('/CompanyLogo',upload.any(),asyncHandler(ProfileController.UpdateCompanyLogo));
route.post('/CompanyBanner',upload.any(),asyncHandler(ProfileController.UpdateCompanyBanner));

route.post('/insertTransaction',upload.any(),asyncHandler(BusinessController.insertTransaction))
route.post('/getTransaction',upload.any(),asyncHandler(BusinessController.getTransaction))


//---------- Gallery's Routes ---------------

route.post('/InsertAlbum',upload.any(), asyncHandler(GalleryController.AlbumInsert));
route.post('/Insertphoto',upload.any(), asyncHandler(GalleryController.PhotoInsert));
// reuse the same controller and model for video 
route.post('/Insertvideo',upload.any(), asyncHandler(GalleryController.PhotoInsert));
route.post('/MediaGet',upload.any(), asyncHandler(GalleryController.MediaGet));
route.post('/AlbumGet',upload.any(), asyncHandler(GalleryController.AlbumGet));
route.post('/updateAlbum',upload.any(), asyncHandler(GalleryController.updateAlbum));
route.post('/deleteAlbum',upload.any(), asyncHandler(GalleryController.deleteAlbum));
route.post('/Mediadelete',upload.any(), asyncHandler(GalleryController.deleteMedia));


module.exports = route;