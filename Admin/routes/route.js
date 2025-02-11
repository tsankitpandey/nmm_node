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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// routes

route.get('/',  Authenticated, AuthenticationController.login);
route.post('/login',upload.none(),  AuthenticationController.loginVerify);
route.get('/dashboard', verifyToken, DashboardController.index);

route.get('/logout', logout);
route.get("/timeline",FL_timelineController.fetchAllFeeds);

route.get("/chat", (req, res) => {
    const userProfile = {
        avatar: 'path/to/avatar.jpg',
        name: 'Rachel Zane'
    };

    const chats = [
        { name: 'Louis Litt', avatar: 'path/to/avatar2.jpg', lastMessage: 'You just got LITT up, Mike.', lastMessageTime: '9:51 AM', isActive: false },
        { name: 'Louis Litt', avatar: 'path/to/avatar2.jpg', lastMessage: 'You just got LITT up, Mike.', lastMessageTime: '9:51 AM', isActive: false },
        { name: 'Louis Litt', avatar: 'path/to/avatar2.jpg', lastMessage: 'You just got LITT up, Mike.', lastMessageTime: '9:51 AM', isActive: false },
        { name: 'Louis Litt', avatar: 'path/to/avatar2.jpg', lastMessage: 'You just got LITT up, Mike.', lastMessageTime: '9:51 AM', isActive: false },
        { name: 'Louis Litt', avatar: 'path/to/avatar2.jpg', lastMessage: 'You just got LITT up, Mike.', lastMessageTime: '9:51 AM', isActive: false },
        { name: 'Harvey Specter', avatar: 'path/to/avatar3.jpg', lastMessage: 'Let’s win this case, Mike.', lastMessageTime: '9:55 AM', isActive: true },
    ];

    const currentChat = { name: 'Harvey Specter' };

    res.render("FreightLoungeViews/Chat/chat", {
        title: "Timeline",
        component_title: "Timeline Feeds",
        icon: "<i class='fas fa-clock'></i>",
        page_title: "Timeline Page",
        userProfile: userProfile,
        chats: chats,
        currentChat: currentChat
    });
});

//---------------- freight Lounge routes start-------------------- 


route.post("/feedsedit/:id",FL_timelineController.editfeeds);
route.get("/feedsdelete/:id",FL_timelineController.DeletePost);
route.post('/insert',  upload.any(), FL_timelineController.insert);
route.get("/timeline",FL_timelineController.fetchAllFeeds);
route.post("/updatetimeline/:id",upload.any(), FL_timelineController.updatetimeline);
route.post("/commentinsert",  upload.any(),FL_timelineController.commentInsert);
route.post("/comment/:id",FL_timelineController.fetchcomment);



// --------------- freight Lounge routes END -------------------- 



// Sponser Router---
route.get('/sponsor', EventController.sponsorIndex);
route.post('/sponserAdd', EventController.sponserAdd);



// Event Router---
route.get('/EventInfo', EventController.EventInfoIndex);
route.get('/EventOrg', EventController.EventOrgIndex);
route.get('/sponsor', EventController.sponsorIndex);
route.post('/sponserAdd', EventController.sponserAdd);
route.post('/sponserManage', EventController.sponserManage);
route.get('/Ems', EventController.EmsDetails);
route.post('/EmsAdd', EventController.EmsAdd);

// News Router---
route.get('/news', NewsNMMController.NewsIndex);
route.get('/newslist', NewsNMMController.NewsList);
route.post('/NewsAdd', NewsNMMController.NewsAdd);
route.post('/newsSave', upload.any(), NewsNMMController.NewsSave);
route.post('/NewsEdit', NewsNMMController. NewsEdit);
route.post('/NewsUpdate', upload.any(), NewsNMMController.NewsUpdate);
route.get('/NewsDelete', upload.any(), NewsNMMController.NewsDelete);
route.get('/banner', NewsNMMController.Banner);
route.post('/BannerAdd', NewsNMMController.BannerAdd);
route.post('/BannerSave', upload.any(), NewsNMMController.BannerSave);
// route.get('/bannerEdit', authMiddleware, NewsNMMController. BannerEdit);
// route.post('/bannerUpdate', upload.any(), NewsNMMController.BannerUpdate);  

// CRM Router---
route.get('/CrmProsect', CrmNMMController.CrmIndex);
route.post('/ProspectAdd', CrmNMMController.ProspectAdd);

// Business Impact Router---
route.get('/ViewImpact', BusinessNMMController.ViewIndex);
route.get('/Transaction', BusinessNMMController.TransactionIndex);

// Business Impact Router---
route.get('/PlanList', PlanNMMController.PlanIndex);
route.post('/PlanAdd', PlanNMMController.PlanAdd);

// Conference Router---
route.get('/AttendeeList', ConferenceNMMController.AttendeeIndex);
route.get('/Event', ConferenceNMMController.EventIndex);
route.get('/EventAdd', ConferenceNMMController.EventAdd);
route.get('/member', ConferenceNMMController.MemberIndex);
route.get('/guest', ConferenceNMMController.GuestIndex);

//country
route.get('/countrylist', DataController.countrylist);

module.exports = route;