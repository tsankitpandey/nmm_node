const express = require('express');
const route = express.Router();
const multer = require('multer');
const {verifyToken ,Authenticated ,logout}= require('../../Middleware/auth')
const DashboardController=require("../Controller/DashboardController");
const AuthenticationController=require("../Controller/AuthenticationController");
const EventController=require("../Controller/EventController");
const NewsNMMController=require("../Controller/NewsNMMController");
const CrmNMMController=require("../Controller/CrmNMMController");
const BusinessNMMController=require("../Controller/BusinessNMMController");
const PlanNMMController=require("../Controller/PlanNMMController");
const ConferenceNMMController=require("../Controller/ConferenceNMMController");
const DataController=require('../Controller/DataController');
const FL_timelineController= require("../Controller/FL_timelineController");
const MembershipController= require("../Controller/MembershippController");
const SettingNMMController= require("../Controller/SettingNMMController");
const UD_membershipReqController= require("../Controller/UD_membershipReqController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// routes

route.get('/',  Authenticated, AuthenticationController.login);
route.post('/login',upload.none(),  AuthenticationController.loginVerify);
route.get('/dashboard', verifyToken, DashboardController.index);

route.get('/logout', logout);
route.get("/timeline",FL_timelineController.fetchAllFeeds);



//---------------- freight Lounge routes start-------------------- 


route.post("/feedsedit/:id",FL_timelineController.editfeeds);
route.get("/feedsdelete/:id",FL_timelineController.DeletePost);
route.post('/insert',  upload.any(), FL_timelineController.insert);
route.get("/timeline",FL_timelineController.fetchAllFeeds);
route.post("/updatetimeline/:id",upload.any(), FL_timelineController.updatetimeline);
route.post("/commentinsert",  upload.any(),FL_timelineController.commentInsert);
route.post("/comment/:id",FL_timelineController.fetchcomment);
const EmailTemplateNMMController= require("../Controller/EmailTemplateNMMController");

route.get("/chat", (req, res) => {
    res.render("FreightLoungeViews/Chat/chat", {
        title: "Timeline",
        component_title: "Timeline Feeds",
        icon: "<i class='fas fa-clock'></i>",
        page_title: "Chat Page",
       
    });
});


// --------------- freight Lounge routes END -------------------- 


// --------------------Event Router-----------------------
route.get('/EventInfo', EventController.EventInfoIndex);
route.get('/EventOrg', EventController.EventOrgIndex);
route.post('/EventOrgUpdate/:id',upload.any(), EventController.EventorgUpdate);
route.get('/sponsor', EventController.sponsorIndex);
route.post('/sponserAdd', EventController.sponserAdd);
route.post('/sponserManage', EventController.sponserManage);
route.get('/Ems', EventController.EmsDetails);
route.post('/EmsAdd', EventController.EmsAdd);
route.post('/Emsinsert',upload.any(), EventController.EmsInsert);
route.post('/editEms/:id',upload.any(), EventController.EditEms);
route.post('/updateEms/:id',upload.any(), EventController.UpdateEms);
route.get('/EmsDelete/:id',upload.any(), EventController.EmsDelete); 
route.post('/EventSave', upload.any(), EventController.EventSave);
route.post('/EventSave', upload.any(), EventController.EventSave);
route.post('/AddEventConfrece', upload.any(), EventController.AddEvent);
route.get('/EventEdit',  EventController.editevent);
route.post('/Eventupdate',upload.any(), EventController.Eventupdate);
route.get('/Eventdelete/:id', EventController.DeleteEvent);
route.get('/Event', EventController.EventIndex); 
route.get('/EventAdd', EventController.EventAdd);  

//------------------ Event Routes END----------------------


// Sponser Router---
route.get('/sponsor', EventController.sponsorIndex);
route.post('/sponserAdd', EventController.sponserAdd);



// News Router---
route.get('/news', NewsNMMController.NewsIndex);
route.get('/newslist', NewsNMMController.NewsList);
route.post('/NewsAdd', NewsNMMController.NewsAdd);
route.post('/newsSave', upload.any(), NewsNMMController.NewsSave);
route.post('/NewsEdit', NewsNMMController. NewsEdit);
route.post('/NewsUpdate', upload.any(), NewsNMMController.NewsUpdate);
route.post('/NewsDelete', upload.any(), NewsNMMController.NewsDelete);
route.get('/banner', NewsNMMController.Banner);
route.post('/BannerAdd', NewsNMMController.BannerAdd);
route.post('/BannerSave', upload.any(), NewsNMMController.BannerSave);
route.post('/bannerEdit',  NewsNMMController.BannerEdit);
route.get('/bannerDelete', upload.any(), NewsNMMController.BannerDelete);
route.post('/bannerUpdate', upload.any(), NewsNMMController.BannerUpdate);
route.post('/bannerUpdate', upload.any(), NewsNMMController.BannerUpdate);
route.get('/details', NewsNMMController.NewsDetails); 
route.get('/All', NewsNMMController.NewsAll);  

// CRM Router---
route.get('/CrmProsect', CrmNMMController.CrmIndex);
route.post('/ProspectAdd', CrmNMMController.ProspectAdd);
route.post('/sheetImport', CrmNMMController.sheetImport);

// Business Impact Router---
route.get('/ViewImpact', BusinessNMMController.ViewIndex);
route.get('/Transaction', BusinessNMMController.TransactionIndex);
route.post('/save', BusinessNMMController.TransactionSave);


// Business Impact Router---

route.get('/PlanList', MembershipController.MembershipGet);
route.post("/planinsert",upload.any(),MembershipController.Membershipinsert);
route.post("/planedit/:id",upload.any(),MembershipController.MembershipEdit);
route.post("/planupdate/:id",upload.any(),MembershipController.MembershipUpdate);
route.get("/plandelete/:id", MembershipController.MembershipDelete);
route.post('/PlanAdd',upload.any(), PlanNMMController.PlanAdd);

// Sponser Router---
route.get('/sponsor', EventController.sponsorIndex);
route.post('/sponserAdd', EventController.sponserAdd);

// Conference Router---
route.get('/AttendeeList', ConferenceNMMController.AttendeeIndex);
route.get('/member', ConferenceNMMController.MemberIndex);
route.get('/guest', ConferenceNMMController.GuestIndex);

//country
route.get('/countrylist', DataController.countrylist);
route.get('/citylist', DataController.citylist);
route.get('/timezone', DataController.timezonelist);

//Email Template Router
route.get('/emailList', EmailTemplateNMMController.EmailTemIndex);
route.post('/EmailEdit',upload.any(),EmailTemplateNMMController.EmailTemEdit);
route.post('/updateEmail', upload.any(), EmailTemplateNMMController.EmailTemUpdate);
route.post('/EmailTemView', EmailTemplateNMMController.EmailTemView);
route.post('/CustomAdd', EmailTemplateNMMController.CustomTemAdd);
route.post('/CustomTemSave', upload.any(), EmailTemplateNMMController.CustomTemSave);
route.post('/CustomTemEdit', EmailTemplateNMMController.CustomTemEdit);
route.post('/CustomTemView', EmailTemplateNMMController.CustomTemView);
route.post('/CustomTemUpdate', upload.any(), EmailTemplateNMMController.CustomTemUpdate);
// route.post('/CustomTemDelete', EmailTemplateNMMController.CustomTemDelete);
// route.post('/emailActivate', upload.any(), EmailTemplateNMMController.ActivateTemEmail);
// route.post('/emailDeactivate', upload.any(), EmailTemplateNMMController.DeactivateTemEmail);
route.get('/CustomTemDelete', EmailTemplateNMMController.CustomTemDelete);
route.get('/emailActivate', EmailTemplateNMMController.ActivateTemEmail);
route.get('/emailDeactivate', EmailTemplateNMMController.DeactivateTemEmail);
route.post('/sendTestEmail', EmailTemplateNMMController.sendTestEmail);

//setting 
route.get('/setting', SettingNMMController.SettingIndex);
route.post('/AccountUpdate', upload.any(), SettingNMMController.SettingUpdate);
route.post('/emailUpdate', upload.any(), SettingNMMController.EmailUpdate);

// User Directory
route.get('/MembershipReq', UD_membershipReqController.MembershipReqIndex);
route.post('/RequestDelete', UD_membershipReqController.MembershipReqDelete);
route.post('/Approve', UD_membershipReqController.MembershipReqAprrove);
route.post('/Date', upload.any(), UD_membershipReqController.MembershipDateAdd);
route.post("/DateUpdate",upload.any(),UD_membershipReqController.MembershipDateUpdate);
route.get('/MembershipUpgradeReq', UD_membershipReqController.MembershipUpgradeIndex)
route.post('/UpgradeApprove', UD_membershipReqController.MembershipUpgradeApprove),
route.post('/UpgradeReject', UD_membershipReqController.MembershipUpgradeRej);


module.exports = route;