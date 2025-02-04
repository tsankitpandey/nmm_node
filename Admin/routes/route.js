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

const timelineFeeds = [
    { 
        user: "Alice", 
        post: "This is my first post!", 
        time: "2 hrs ago", 
        user_logo: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        post_image: "https://images.unsplash.com/photo-1612128686557-71729cbcfe41?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
        user: "Bob", 
        post: "Loving this new platform!", 
        time: "5 hrs ago", 
        user_logo: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        post_image: "https://images.unsplash.com/photo-1604356589600-d353607c09b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];


const newsCards = [
    { title: "Breaking News!", description: "Something big just happened.",image:"https://images.unsplash.com/photo-1604356589600-d353607c09b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Tech Update", description: "New tech product released.",image:"https://images.unsplash.com/photo-1612128686557-71729cbcfe41?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

route.get('/',  Authenticated, AuthenticationController.login);
route.post('/login',upload.none(),  AuthenticationController.loginVerify);
route.get('/dashboard', verifyToken, DashboardController.index);

route.get('/logout', logout);
route.get("/timeline", (req, res) => {
    res.render("FreightLoungeViews/Timeline/Timeline", { 
        title: "Timeline",  
        component_title: "Timeline Feeds",
        icon: "<i class='fas fa-clock'></i>",  
        page_title: "Timeline Page",
        timelineFeeds,
        newsCards
    });
});

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


module.exports = route;