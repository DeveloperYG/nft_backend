const express = require('express');
const Router = express.Router();
const Controller = require('../controller/Controller');
var cors = require('cors');
const multer = require("multer");
const path = require("path");
const app = express();
const requestIp = require('request-ip');

app.use(requestIp.mw())
app.use(cors());
app.use(express.json());
app.use(express.static('./upload'));

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000000000,
    },
  });

// <-------------------------------Adminside News Handling Api's------------------------------------>

Router.post('/addnews',Controller.addnews);
Router.get('/news',Controller.news);
Router.delete('/deletenews/:id',Controller.deletenews);
Router.put('/updatenews/:id',Controller.updatenews);

// <------------------------------- Event Handling Api's :--------------------------------------->

Router.post('/addevent',upload.fields([{name:"cover_image",maxCount
:1}]),Controller.addevent);
Router.put('/updatestatus/:id',Controller.updatestatus);
Router.post('/updateevent',upload.fields([{name:"cover_image",maxCount
:1}]),Controller.updateevent);
Router.get('/events',Controller.events);
Router.get('/today',Controller.today);
Router.get('/upcoming',Controller.upcoming);
Router.get('/past',Controller.past);
Router.delete('/deleteevent/:id',Controller.deleteevent);
Router.post('/event',Controller.event);

// <----------------------------------- RSS  Feed --------------------------------------------------->

Router.get('/livenews',Controller.livenews);

// <----------------------------------- NFT Ranking --------------------------------------------------->

Router.post('/24hrankings',Controller.tfhrankings);
Router.post('/7drankings',Controller.sdrankings);
Router.post('/30drankings',Controller.thdrankings);

// <----------------------------------- Event Reaction Api's --------------------------------------------------->

Router.post('/rating',Controller.rating);
Router.post('/getratings',Controller.getratings);

// <----------------------------------- Total Trait --------------------------------------------------->

Router.post('/displaytraits',Controller.displaytraits);

// <----------------------------------- Assets Api --------------------------------------------------->


Router.get('/collectioninfo/:slug',Controller.collectioninfo);
Router.post('/assets/:limit',Controller.assets);

// <----------------------------------- Search Api --------------------------------------------------->

Router.get('/search',Controller.search);

// <----------------------------------- Stats Api --------------------------------------------------->


Router.put('/updatestats',Controller.updatestats);
Router.post('/getstat',Controller.getstat);

// <----------------------------------- Admin side Blog's Api ---------------------------------------->

Router.post('/addblog',Controller.addblog);
Router.get('/blogs',Controller.blogs);
Router.delete('/deleteblog/:id',Controller.deleteblog);
Router.post('/updateblog/:id',Controller.updateblog);


// <----------------------------------- Collection profile Api ---------------------------------------->

Router.post('/getactivity/:slug',Controller.getactivity);
Router.post('/gethistory/:address',Controller.gethistory);

// <-----------------------------------admin profile Api ---------------------------------------->

Router.get('/adminlogin',Controller.adminlogin);
// Router.get('/al',Controller.al);
module.exports = Router