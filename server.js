const express = require('express');
const dotenv = require('dotenv');
let {parse}=require('rss-to-json');
var mysql = require('mysql');
const axios = require("axios");
const fetch = require('node-fetch-commonjs');
var cors = require('cors');
const multer = require("multer");
const path = require("path");
const app = express();
const requestIp = require('request-ip');
const PORT=process.env.APP_PORT || 5000;
app.use(requestIp.mw())
const {
  v4: uuid
} = require("uuid")
//initialize environment values
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('upload'));
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE,
    multipleStatements: true,
  });
  con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
  });
// <-------------------------------Adminside Blog Handling Api's------------------------------------ >:
app.get("/er",(req,res)=>{

  res.send("hi")
})
 
app.post("/addblog", async (req, res) => {
    let blog_id = uuid(); 
    console.log(req.body.title)
    var sql = `INSERT INTO adminblogs (blog_id,blog_title,blog_content,blog_image,blog_link) VALUES ("${blog_id}","${req.body.title}",'"${req.body.content}"',"${req.body.image}","${req.body.link}")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.status(200).send({ success: true, msg: "blog added successfully." });
    });
    
  });
  app.get("/blogs", async (req, res) => {
    var sql = "SELECT * FROM adminblogs ";
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  });
  app.delete("/deleteblog/:id", function (req, res, next) {
    var sql = `DELETE FROM adminblogs WHERE blog_id="${req.params.id}"; `;
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send({ success: true, msg:"Blog Deleted successfully"});
      }
    });
  });
  app.put("/updateblog/:id", async (req, res) => {
    var sql = `UPDATE adminblogs SET blog_title = " ${req.body.title}",blog_content="${req.body.content}",blog_image="${req.body.image}",blog_link="${req.body.link}" WHERE blog_id = "${req.params.id}"`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log(" News updated.");
    });
    res.status(200).send({ success: true, msg:"Blog Updated successfully."});
  });


  // <------------------------------- Event Handling Api's :--------------------------------------->


  // 1) Event Post API:
  const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1000000000000
  }
})

app.post("/addevent",upload.fields([{name:"cover_image",maxCount
:1}]),async (req, res) => {

  
  const url=req.body.twitterurl;
    let twit_followers;
    
    const arr= url.split("/");
    axios.get(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${arr[3]}`)
    .then((response) => {
      
      twit_followers=response.data[0].followers_count;
      // console.log(req.files.cover_image[0].filename);
    const detail=req.body.content;
    const details=detail.replace(/[']/g, '`');
    let event_id = uuid();
    const sql = `INSERT INTO eventdetailss (event_id,event_title,project_name,contact_person,content,cover_image,event_date,blockchain,marketplace,categories,email,event_website,source,marketplaceurl,twitterurl,twitter_followers,discordUrl,tag, mint_price, collection_count,trait_count,verified) VALUES ("${event_id}","${req.body.event_title}","${req.body.project_name}","${req.body.contact_person}",'"${details}"',"${req.files.cover_image[0].filename}","${req.body.event_date}","${req.body.blockchain}","${req.body.marketplace}","${req.body.categories}","${req.body.email}","${req.body.event_website}","${req.body.source}","${req.body.marketplaceurl}","${req.body.twitterurl}","${twit_followers}","${req.body.discordUrl}","${req.body.tag}","${req.body.mint_price}","${req.body.collection_count}","${req.body.trait_count}","false")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log(" event added.");
    });
    const a=req.files.cover_image[0]
    
    res.status(200).send({ success: true, msg:"Event Added."});
      
    }).catch(error=> {
    twit_followers=0;
    const detail=req.body.content;
    const details=detail.replace(/[']/g, '`');
    let event_id = uuid();
    const sql = `INSERT INTO eventdetailss (event_id,event_title,project_name,contact_person,content,cover_image,event_date,blockchain,marketplace,categories,email,event_website,source,marketplaceurl,twitterurl,twitter_followers,discordUrl,tag, mint_price, collection_count,trait_count,verified) VALUES ("${event_id}","${req.body.event_title}","${req.body.project_name}","${req.body.contact_person}",'"${details}"',"${req.files.cover_image[0].filename}","${req.body.event_date}","${req.body.blockchain}","${req.body.marketplace}","${req.body.categories}","${req.body.email}","${req.body.event_website}","${req.body.source}","${req.body.marketplaceurl}","${req.body.twitterurl}","${twit_followers}","${req.body.discordUrl}","${req.body.tag}","${req.body.mint_price}","${req.body.collection_count}","${req.body.trait_count}","false")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log(" event added.");
    });
    const a=req.files.cover_image[0]
    res.status(200).send({ success: true, msg:"Event Added."});

      
    });
    // const arr= url.split("/");
    // const response = await fetch(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${arr[3]}`);
    // const body = await response.json();
    // const followers=body[0].fllofowers_count;
    
    
    
    // res.send(req.file.filename);
  });
  
// 2) Event Status Update  API Admin :

  app.put("/updatestatus/:id",async (req, res) => {
    var sql = `UPDATE eventdetailss SET verified = true WHERE id = ${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log(" event updated.");
    });
    res.status(200).send({ success: true, msg:"Event Updated."});
  });
  
  app.put("/updateevent",upload.fields([{name:"cover_image",maxCount
  :1}]) ,async (req, res) => {
    var flag=req.body.flag;
    if (!flag){
      var sql = `UPDATE eventdetailss SET event_title="${req.body.event_title}",project_name="${req.body.project_name}",contact_person="${req.body.contact_person}",cover_image="${req.files.cover_image[0].filename}",content="${req.body.content}",event_date="${req.body.event_date}",blockchain="${req.body.blockchain}",marketplace="${req.body.marketplace}",categories="${req.body.categories}",email="${req.body.email}",event_website="${req.body.event_website}",source="${req.body.source}",marketplaceurl="${req.body.marketplaceurl}",twitterurl="${req.body.twitterurl}",twitter_followers="${req.body.twitter_followers}",discordUrl="${req.body.discordUrl}",tag="${req.body.tag}", mint_price="${req.body.mint_price}", collection_count="${req.body.collection_count}",trait_count="${req.body.trait_count}" WHERE event_id = "${req.body.id}"`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(" event updated.");
      });
    }
   else{
    var sql = `UPDATE eventdetailss SET event_title="${req.body.event_title}",project_name="${req.body.project_name}",contact_person="${req.body.contact_person}",content="${req.body.content}",event_date="${req.body.event_date}",blockchain="${req.body.blockchain}",marketplace="${req.body.marketplace}",categories="${req.body.categories}",email="${req.body.email}",event_website="${req.body.event_website}",source="${req.body.source}",marketplaceurl="${req.body.marketplaceurl}",twitterurl="${req.body.twitterurl}",twitter_followers="${req.body.twitter_followers}",discordUrl="${req.body.discordUrl}",tag="${req.body.tag}", mint_price="${req.body.mint_price}", collection_count="${req.body.collection_count}",trait_count="${req.body.trait_count}" WHERE event_id = "${req.body.id}"`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(" event updated.");
    });
   }
    res.status(200).send({ success: true, msg:"Event Updated."});
  }); 

// 3) Event Get API:

  app.get("/events", function (req, res, next) {
    var sql = "SELECT * FROM eventdetailss LIMIT 20";
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  });

  

// 4) Event today API:

  app.get("/today", function (req, res, next) {
    var sql = "SELECT * FROM eventdetailss WHERE event_date = CURDATE() ORDER BY event_date DESC LIMIT 12";
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  });

// 5) Event upcoming API:

  app.get("/upcoming", function (req, res, next) {
    var sql = "SELECT * FROM eventdetailss WHERE event_date > CURDATE() ORDER BY event_date DESC LIMIT 12";
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  });


  // 6) Event Past API:


  app.get("/past", function (req, res, next) {
    var sql = "SELECT * FROM eventdetailss WHERE event_date < CURDATE() ORDER BY event_date DESC LIMIT 12";
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  });

// 7) Event Delete API Admin :

  app.delete("/deleteevent/:id", function (req, res, next) {
    var sql = `DELETE FROM eventdetailss WHERE id=${req.params.id}; `;
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send("Event Deleted");
      }
    });
  });
 // 8)) Get event detail:
 
 app.get("/event/:id", function (req, res, next) {
  var sql = `SELECT * FROM eventdetailss WHERE event_id="${req.params.id}"`;
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

 // <----------------------------------- RSS  Feed ---------------------------------------------------> 
 app.get("/livenews", function (req, res, next) {
  var sql = "SELECT item_title, item_published   FROM blogs WHERE item_published>Date_SUB(CURDATE(),INTERVAL  7 DAY) ";
  
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      res.status(400).json({ status: "error" });
    } else {
      res.status(200).send(results);
    }
  });
});
// <----------------------------------- Collection stats--------------------------------------------------->
app.get("/collectioninfo/:slug", function (req, res, next) {
  var sql = `SELECT * from nft_stats WHERE slug="${req.params.slug}"`;
  
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      res.status(400).json({ status: "error" });
    } else {
      res.status(200).send(results);
    }
  });
});

 // <----------------------------------- NFT Ranking --------------------------------------------------->
 app.post("/24hrankings", function (req, res, next) {
  const limit=100;
  const page = req.body.page;
  const offset = (page - 1) * limit

  var sql = `SELECT * FROM nft_stats ORDER BY one_day_volume DESC LIMIT ${limit} OFFSET ${offset}`;
  
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      res.status(400).json({ status: "error" });
    } else {
      var jsonResult = {
        'page_count':results.length,
        'page_number':page,
        'stats':results
      }
      res.status(200).send(jsonResult);
    }
  });
});  
app.post("/7drankings", function (req, res, next) {
  const limit=100;
  const page = req.body.page;
  const offset = (page - 1) * limit
  var sql = `SELECT * FROM nft_stats ORDER BY seven_day_volume DESC LIMIT ${limit} OFFSET ${offset}`;
  
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      res.status(400).json({ status: "error" });
    }else {
      var jsonResult = {
        'page_count':results.length,
        'page_number':page,
        'stats':results
      }
      res.status(200).send(jsonResult);
    }
  });
});  
app.post("/30drankings", function (req, res, next) {
  const limit=100;
  const page = req.body.page;
  const offset = (page - 1) * limit
  var sql = `SELECT * FROM nft_stats ORDER BY thirty_day_volume DESC LIMIT ${limit} OFFSET ${offset}` ;
  
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      res.status(400).json({ status: "error" });
    } else {
      var jsonResult = {
        'page_count':results.length,
        'page_number':page,
        'stats':results
      }
      res.status(200).send(jsonResult);
    }
  });
});  

 // <----------------------------------- Event Reaction Api's --------------------------------------------------->

 app.post('/rating',(req,res)=>{
  const event_id = req.body.event_id;
  const user_IP = req.clientIp;
  // const ip = req.clientIp;
  const action=req.body.action;
  sql1=` SELECT EXISTS(SELECT * FROM rating_info WHERE event_id = "${event_id}" AND user_IP ="${user_IP}" AND action="${action}")`;
  con.query(sql1, function (err, result) {
      if (err) {
          // console.log(err);
          res.status(400).json({ status: "error" });
        }else {
          // console.log(result)
          // console.log(result[0][`EXISTS(SELECT * FROM rating_info WHERE event_id = "${event_id}" AND user_IP ="${user_IP}" AND action="${action}")`])
          if(result[0][`EXISTS(SELECT * FROM rating_info WHERE event_id = "${event_id}" AND user_IP ="${user_IP}" AND action="${action}")`]==1){
              res.status(404).send("You have already Liked.")
          }
          else{
              switch (action) {
                  case '01':
                      sql=`INSERT INTO rating_info ( event_id,user_IP, action) VALUES ("${event_id}", "${user_IP}", '01') ON DUPLICATE KEY UPDATE action='01'`;
                      con.query(sql, function (err, result) {
                          if (err) throw err;
                          // console.log("sucess");
                          res.send("sucess");
                        });
          
                      break;
                  case '10':
                      sql=`DELETE FROM rating_info WHERE user_IP="${user_IP}" AND event_id="${event_id}" AND action="01"`;
                      con.query(sql, function (err, result) {
                          if (err) throw err;
                          // console.log("sucess");
                          res.send("sucess");
                        });
                      break;
                  case '02':
                          sql=`INSERT INTO rating_info ( event_id,user_IP, action) VALUES ("${event_id}", "${user_IP}", '02') ON DUPLICATE KEY UPDATE action='02'`;
                          con.query(sql, function (err, result) {
                              if (err) throw err;
                              // console.log("sucess");
                              res.send("sucess");
                            });
              
                          break;
                  case '20':
                          sql=`DELETE FROM rating_info WHERE user_IP="${user_IP}" AND event_id="${event_id}" AND action="02"`;
                          con.query(sql, function (err, result) {
                              if (err) throw err;
                              // console.log("sucess");
                              res.send("sucess");
                            });
                          break;
                  case '03':
                              sql=`INSERT INTO rating_info ( event_id,user_IP, action) VALUES ("${event_id}", "${user_IP}", '03') ON DUPLICATE KEY UPDATE action='03'`;
                              con.query(sql, function (err, result) {
                                  if (err) throw err;
                                  // console.log(" heasucessrted");
                                  res.send("sucess");
                                });
                  
                              break;
                  case '30':
                              sql=`DELETE FROM rating_info WHERE user_IP="${user_IP}" AND event_id="${event_id}" AND action="03"`;
                              con.query(sql, function (err, result) {
                                  if (err) throw err;
                                  // console.log("sucess");
                                  res.send("sucess");
                                });
                              break;
                  default:
                      break;
              
                  }
          
          }
          
        }
  
  });

   
})

app.post("/getratings",(req,res) => {
  event_id=req.body.event_id;
  const user_IP = req.clientIp;
  sql2 = `SELECT * FROM rating_info `;
  con.query(sql2,(err,response)=>{
      if (err) throw err;
  })
  // query = `SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='01';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='02';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='03';SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="01");SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="02");SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="03")`;
  query = `SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='01';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='02';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='03';SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="01" AND event_id = "${event_id}");SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="02" AND event_id = "${event_id}" );SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="03" AND event_id = "${event_id}")`;
  
  
  con.query(query ,(err,result)=>{
    
      var jsonResult = {
          'heart_count':result[0][0]['COUNT(*)'],
          'fire_count':result[1][0]['COUNT(*)'],
          'diamond_count':result[2][0]['COUNT(*)'],
          'user_heart':result[3][0][ `EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="01" AND event_id = "${event_id}")`],
          'user_fire':result[4][0][ `EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="02" AND event_id = "${event_id}" )`],
          'user_diamond':result[5][0][ `EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="03" AND event_id = "${event_id}")`]
        }
         
        res.status(200).send(jsonResult);
  });
 
})

//total traits API
app.post('/displaytraits',(req,res)=>{
  
  const options = {
    method: 'GET',
    url: `https://api.opensea.io/api/v1/collection/${req.body.slug}`,
    headers: {Accept: 'application/json', 'X-API-KEY': '7369ed7fd1c148e29856e23a2de9d997'}
  };
  
  axios.request(options).then(function (response) {
    res.send(response.data.collection.traits);
   
  }).catch(function (error) {
    // console.error(error);
  });
})




 // assets API

 app.post('/assets/:limit',(req,res)=>{
  const limit=req.params.limit;
  const slug=req.body.slug;
  const page = req.body.page;
  const offset = (page - 1) * limit;
  const options = {
    method: 'GET',
    url: `https://api.opensea.io/api/v1/assets?collection_slug=${slug}&order_by=pk&order_direction=desc&limit=${limit}&offset=${offset}&include_orders=true`,
    headers: {Accept: 'application/json', 'X-API-KEY': '7369ed7fd1c148e29856e23a2de9d997'}
  };
  
  axios.request(options).then(function (response) {
    var jsonResult = {
      'page_count':response.data.assets.length,
      'page_number':page,
      'asset_name':response.data,
      
    }
    res.send(jsonResult);
  }).catch(function (error) {
    // console.error(error);
  });
})

setInterval(()=>{
  const options = {
    method: 'GET',
    url: `https://api.nftgo.io/api/v1/ranking/collections?offset=0&limit=1871&by=marketCap&interval=24h&asc=-1&rarity=-1&fields=marketCap,marketCapChange24h,relMarketCap,buyerNum24h,buyerNum24hChange24h,sellerNum24h,sellerNum24hChange24h,liquidity24h,liquidity24hChange24h,saleNum24h,saleNum24hChange24h,volume24h,relVolume24h,traderNum24h,traderNum24hChange24h,holderNum,holderNumChange24h,whaleNum,whaleNumChange24h,orderAvgPriceETH24h,orderAvgPriceETH24hChange24h,orderAvgPrice24h,orderAvgPrice24hChange24h,floorPrice,floorPriceChange24h`
  };
  
  axios.request(options).then(function (response) {
    response.data.data.list.forEach(a=>{
      // console.log('name',a.name)
      // console.log('slug',a.slug)
      // console.log('link',a.link)
      // console.log('openseaLink',a.openseaLink)
      // console.log('blockchain',a.blockchain)
      var slug='';
   
      var url=a.openseaLink;
     
      if(url === undefined){
        const slug2=a.slug;
        slug=slug2.replace(/['"]/g, '');
      }
      else{

          var arr= url.split("/");
          slug=arr[4];
          
        }
     
        const name1=a.name;
          
          
        const name=name1.replace(/['"]/g, '');
       
      
        
      var sql = `INSERT IGNORE INTO nft_collections (name,slug,link,openseaLink,logo,blockchain,marketCap) VALUES ('"${name}"',"${slug}","${a.link}","${a.openseaLink}","${a.logo}","${a.blockchain}","${a.marketCap}")`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        // console.log(" Data added.");
      });
      
    })
    
  }).catch(function (error) {
    // console.error(error);
  });
  
 
  const options1 = {
    method: 'GET',
    url: `https://api.aliens.com/top-nft-collections?since=24h`
  };
  axios.request(options1).then(function (response) {
    
    response.data.top_collections.forEach(a=>{
      // console.log(a.collection.name);
      // console.log(a.collection.slug);
      // console.log(a.collection.image_url);
      // console.log(a.opensea_url);
      // console.log(a.collection.stats.market_cap);
        var url=a.opensea_url;
        var arr= url.split("/");
        var slug1=arr[4];
        
      var sql = `INSERT IGNORE INTO nft_collections (name,slug,link,openseaLink,logo,marketCap) VALUES ("${a.collection.name}","${slug1}","${a.opensea_url}","${a.opensea_url}","${a.collection.image_url}","${a.collection.stats.market_cap}")`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        // console.log(" Data added1.");
      });
      
      
    });
    
  }).catch(function (error) {
    // console.error(error);
  });

  var sql = "SELECT COUNT(*) FROM nft_collections";
  
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      
    }  else {

        var a=((results[0]['COUNT(*)'])/100).toFixed(0)
        // console.log(a);
        for(i=1;i<=a;i++)
        {
        const v=i;
        // console.log('a',v);
        const b=(v-1)*100;
        const c=v*100;
        // console.log(` a ${b}-${c}`)
        setTimeout(()=>{
            // console.log('b',v);
            // console.log(` b ${b}-${c}`)
            var sql1 = `SELECT name,slug,logo FROM nft_collections WHERE LIMIT ${b},100`;
                con.query(sql1, function (err, result) {
                    if (err) throw err;
                    result.forEach(async (item)=>{
                        // console.log(item.slug)
                        const options = {
                            method: 'GET',
                            url: `https://api.opensea.io/api/v1/collection/${item.slug}`,
                            headers: {Accept: 'application/json'}
                            };
                                                    
                        axios.request(options).then(function (response) {
                          var name = `${item.name}`;
                          var logo= `${item.logo}`;
                          var slug= `${item.slug}`;
                          var background_image	=`${response.data['collection']['banner_image_url']}`;
                          
                          var contract	=`${response.data['collection']['primary_asset_contracts'][0]['address']}`;
                          var discord_url=`${response.data['collection']['discord_url']}`;
                          var	external_url=`${response.data['collection']['primary_asset_contracts'][0]['external_link']}`;
                          var twitter_username=`${response.data['collection']['twitter_username']}`;
                          var	instagram_username	=`${response.data['collection']['instagram_username']}`;
                          var one_day_volume=`${response.data['collection']['stats']['one_day_volume']}` ;
                          var one_day_change=`${response.data['collection']['stats']['one_day_change']}` ;
                          var one_day_sales= `${response.data['collection']['stats']['one_day_sales']}`;
                          var one_day_average_price=`${response.data['collection']['stats']['one_day_average_price']}`;
                          var seven_day_volume=`${response.data['collection']['stats']['seven_day_volume']}` ;
                          var seven_day_change=`${response.data['collection']['stats']['seven_day_change']}` ;
                          var seven_day_sales=`${response.data['collection']['stats']['seven_day_sales']}` ;
                          var seven_day_average_price=`${response.data['collection']['stats']['seven_day_average_price']}` ;
                          var thirty_day_volume= `${response.data['collection']['stats']['thirty_day_volume']}`;
                          var thirty_day_change= `${response.data['collection']['stats']['thirty_day_change']}`;
                          var thirty_day_sales= `${response.data['collection']['stats']['thirty_day_sales']}`;
                          var thirty_day_average_price= `${response.data['collection']['stats']['thirty_day_average_price']}`;
                          var total_volume= `${response.data['collection']['stats']['total_volume']}`;
                          var total_sales=`${response.data['collection']['stats']['total_sales']}` ;
                          var total_supply= `${response.data['collection']['stats']['total_supply']}`;
                          var count= `${response.data['collection']['stats']['count']}`;
                          var num_owners=`${response.data['collection']['stats']['num_owners']}` ;
                          var average_price= `${response.data['collection']['stats']['average_price']}`;
                          var num_reports= `${response.data['collection']['stats']['num_reports']}`;
                          var market_cap= `${response.data['collection']['stats']['market_cap']}`;
                          var floor_price=`${response.data['collection']['stats']['floor_price']}` ;
                          
                            var sql = `INSERT IGNORE INTO nft_stats (name,logo,slug,background_image,contract,discord_url,external_url,twitter_username,instagram_username	,one_day_volume,one_day_change,one_day_sales,one_day_average_price,seven_day_volume,seven_day_change,seven_day_sales,seven_day_average_price,thirty_day_volume,thirty_day_change,thirty_day_sales,thirty_day_average_price,total_volume,total_sales,total_supply,count,num_owners,average_price,num_reports,market_cap,floor_price) VALUES ('"${name}"',"${logo}","${slug}","${background_image}","${contract}","${discord_url}","${external_url}","${twitter_username}","${instagram_username}","${one_day_volume}","${one_day_change}","${one_day_sales}","${one_day_average_price}","${seven_day_volume}","${seven_day_change}","${seven_day_sales}","${seven_day_average_price}","${thirty_day_volume}","${thirty_day_change}","${thirty_day_sales}","${thirty_day_average_price}","${total_volume}","${total_sales}","${total_supply}","${count}","${num_owners}","${average_price}","${num_reports}","${market_cap}","${floor_price}") ON DUPLICATE KEY UPDATE name="${name}",logo="${logo}",slug="${slug}",one_day_volume="${one_day_volume}",one_day_change="${one_day_change}",one_day_sales="${one_day_sales}",one_day_average_price="${one_day_average_price}",seven_day_volume="${seven_day_volume}",seven_day_change="${seven_day_change}",seven_day_sales="${seven_day_sales}",seven_day_average_price="${seven_day_average_price}",thirty_day_volume="${thirty_day_volume}",thirty_day_change="${thirty_day_change}",thirty_day_sales="${thirty_day_sales}",thirty_day_average_price="${thirty_day_average_price}",total_volume="${total_volume}",total_sales="${total_sales}",total_supply="${total_supply}",count="${count}",num_owners="${num_owners}",average_price="${average_price}",num_reports="${num_reports}",market_cap="${market_cap}",floor_price="${floor_price}"`;
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                // console.log(" Data added.");
                            });
                        }).catch(function (error) {
                            // console.error(error);
                        });
                                                        
                    });
                })
         },65000*v)
        }
        // console.log("Finished.")
        
    }
})


},300000)

app.get("/search", function (req, res, next) {
  var sql = `SELECT name,slug,logo FROM nft_collections WHERE name LIKE "%${req.body.name}%"`;
  con.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.put("/updatestats", async (req, res) => {

  var sql = `UPDATE nft_stats SET  market_cap="${req.body.market_cap}",floor_price="${req.body.floor_price}",num_owners="${req.body.num_owners}",total_volume="${req.body.total_volume}" WHERE slug = "${req.body.slug}"`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(" data updated.");
  });
  res.status(200).send({ success: true, msg:"Data Updated."});
});
  

  app.post("/getstat", function (req, res, next) {
    var sql = `SELECT market_cap,floor_price,num_owners,total_supply,total_volume FROM nft_stats WHERE slug="${req.body.slug}"`;
    con.query(sql, (error, results) => {
      if (error) {
        // console.log(error);
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  });
  app.post("/getactivity/:slug", function (req, res, next) {
    let ms = Date.now();
    const options = {
      method: 'GET',
      url: `https://api.opensea.io/api/v1/events?collection_slug=${req.params.slug}&event_type=transfer&occurred_before=${ms}`,
      headers: {Accept: 'application/json', 'X-API-KEY': '7369ed7fd1c148e29856e23a2de9d997'}
    };
    axios.request(options).then(function (response) {

      res.status(200).send(response.data);
    }).catch(function (error) {
      res.status(400).send(error);
    });
  });
app.post("/gethistory/:address",(req,res)=>{
 console.log(req.params.address)
  options = {
    method: 'GET',
    url: `https://api.covalenthq.com/v1/1/nft_market/collection/${req.params.address}/?key=ckey_70550b60ceb744d1849b73d20f1`,
    headers: {Accept: 'application/json'}
  };
  axios.request(options).then(function (response) {
      
    res.status(200).send(response.data);
  }).catch(function (error) {
    res.status(400).send(error);
  });

})

  app.listen(PORT,()=>{
    // console.log("server is running");
  });


