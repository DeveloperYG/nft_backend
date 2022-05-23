const express = require('express');
var cors = require('cors');
const {v4: uuid } = require("uuid");
const app = express();
var bcrypt=require('bcryptjs');
var jwt = require("jsonwebtoken");
const axios = require("axios");
const db = require('../database/db_connection');
app.use(cors());
app.use(express.json());
module.exports = {
    addnews: async (req , res) => {
        try {
            var sql = `INSERT INTO adminnews (item_title,item_description,item_image_url,item_published) VALUES ("${req.body.item_title}","${req.body.item_description}","${req.body.item_image_url}","${req.body.item_published}")`;
            db.query(sql, function (err, result) {
              if (err) throw err;
              console.log(" News added.");
              res.send("News Added.");
            });
            
        } catch (error) {
            res.status(400).send(error)
        }
    },    

    news: async (req , res) => {
        try {
            var sql = "SELECT * FROM adminnews ";
            db.query(sql, (error, results) => {
              if (error) {
                console.log(error);
                res.status(400).json({ status: "error" });
              } else {
                res.status(200).send(results);
              }
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    deletenews: async (req , res) => {
        try {
var sql = `DELETE FROM adminnews WHERE id=${req.params.id}; `;
db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).send("News Deleted");
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    updatenews: async (req , res) => {
        try {
            var sql = `UPDATE adminnews SET item_title = " ${req.body.item_title}",item_description="${req.body.item_description}",item_image_url="${req.body.item_image_url}",item_published="${req.body.item_published}" WHERE id = ${req.params.id}`;
            db.query(sql, function (err, result) {
              if (err) throw err;
              console.log(" News updated.");
              res.send("News Updated.");
            });
           
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    addevent: async (req , res) => {
        try {

            var image;
     
      if(req.files.cover_image==undefined){
        image='';
      }else{
        image=req.files.cover_image[0].filename;
      }

 const url = req.body.twitterurl;
    let twit_followers;

    const arr = url.split("/");
    axios
      .get(
        `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${arr[3]}`
      )
      .then((response) => {
        twit_followers = response.data[0].followers_count;
        // console.log(req.files.cover_image[0].filename);
        const detail = req.body.content;
        const details = detail.replace(/[']/g, "`");
        let event_id = uuid();
        const sql = `INSERT INTO eventdetails (event_id,event_title,project_name,contact_person,content,cover_image,event_date,blockchain,marketplace,categories,email,event_website,source,marketplaceurl,twitterurl,twitter_followers,discordUrl,tag, mint_price, collection_count,trait_count,verified) VALUES ("${event_id}","${req.body.event_title}","${req.body.project_name}","${req.body.contact_person}",'"${details}"',"${image}","${req.body.event_date}","${req.body.blockchain}","${req.body.marketplace}","${req.body.categories}","${req.body.email}","${req.body.event_website}","${req.body.source}","${req.body.marketplaceurl}","${req.body.twitterurl}","${twit_followers}","${req.body.discordUrl}","${req.body.tag}","${req.body.mint_price}","${req.body.collection_count}","${req.body.trait_count}",0)`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log(" event added.");
        });
        
        res.send("Event Added.");
      })
      .catch((error) => {
        twit_followers = 0;
        const detail = req.body.content;
        const details = detail.replace(/[']/g, "`");
        let event_id = uuid();
        const sql = `INSERT INTO eventdetails (event_id,event_title,project_name,contact_person,content,cover_image,event_date,blockchain,marketplace,categories,email,event_website,source,marketplaceurl,twitterurl,twitter_followers,discordUrl,tag, mint_price, collection_count,trait_count,verified) VALUES ("${event_id}","${req.body.event_title}","${req.body.project_name}","${req.body.contact_person}",'"${details}"',"${image}","${req.body.event_date}","${req.body.blockchain}","${req.body.marketplace}","${req.body.categories}","${req.body.email}","${req.body.event_website}","${req.body.source}","${req.body.marketplaceurl}","${req.body.twitterurl}","${twit_followers}","${req.body.discordUrl}","${req.body.tag}","${req.body.mint_price}","${req.body.collection_count}","${req.body.trait_count}",0)`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log(" event added.");
          
          res.send("Event Added.");
        });
        
      });
    // const arr= url.split("/");
    // const response = await fetch(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${arr[3]}`);
    // const body = await response.json();
    // const followers=body[0].fllofowers_count;

    // res.send(req.file.filename);
        } catch (error) {
            res.status(400).send(error)
        }
    },  

    updatestatus: async (req , res) => {
        try {
      var sql = `UPDATE eventdetails SET verified = 1 WHERE event_title = ${req.params.event_title}`;
      db.query(sql, function (err, result) {
       if (err) throw err;
       console.log(" event updated.");
        res.send("Event Updated.");
     });
  
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    updateevent: async (req , res) => {
        try {
            if (req.body.img_status == "0") {
                var sql = `UPDATE eventdetails SET event_title="${req.body.event_title}",project_name="${req.body.project_name}",contact_person="${req.body.contact_person}",cover_image="${req.files.cover_image[0].filename}",content='"${req.body.content}"',event_date="${req.body.event_date}",blockchain="${req.body.blockchain}",marketplace="${req.body.marketplace}",categories="${req.body.categories}",email="${req.body.email}",event_website="${req.body.event_website}",source="${req.body.source}",marketplaceurl="${req.body.marketplaceurl}",twitterurl="${req.body.twitterurl}",twitter_followers="${req.body.twitter_followers}",discordUrl="${req.body.discordUrl}",tag="${req.body.tag}", mint_price="${req.body.mint_price}", collection_count="${req.body.collection_count}",trait_count="${req.body.trait_count}" WHERE event_title = "${req.body.event_title}"`;
                db.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log(" event updated.");
                });
              } else {
                var sql = `UPDATE eventdetails SET event_title="${req.body.event_title}",project_name="${req.body.project_name}",contact_person="${req.body.contact_person}",content='"${req.body.content}"',event_date="${req.body.event_date}",blockchain="${req.body.blockchain}",marketplace="${req.body.marketplace}",categories="${req.body.categories}",email="${req.body.email}",event_website="${req.body.event_website}",source="${req.body.source}",marketplaceurl="${req.body.marketplaceurl}",twitterurl="${req.body.twitterurl}",twitter_followers="${req.body.twitter_followers}",discordUrl="${req.body.discordUrl}",tag="${req.body.tag}", mint_price="${req.body.mint_price}", collection_count="${req.body.collection_count}",trait_count="${req.body.trait_count}" WHERE event_title = "${req.body.event_title}"`;
                db.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log(" event updated.");
                  res.status(200).send({ success: true, msg: "Event Updated." });
                });
              }
              
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    events: async (req , res) => {
        try {
            var sql = "SELECT * FROM eventdetails LIMIT 20";
            db.query(sql, (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).json({ status: "error" });
              } else {
                res.status(200).send(results);
              }
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    today: async (req , res) => {
        try {
var sql = "SELECT * FROM eventdetails WHERE event_date = CURDATE() ORDER BY event_date DESC LIMIT 12";
db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).send(results);
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    upcoming: async (req , res) => {
        try {
  var sql ="SELECT * FROM eventdetails WHERE event_date > CURDATE() ORDER BY event_date DESC LIMIT 12";
  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).send(results);
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    }, 

    past: async (req , res) => {
        try {
 var sql ="SELECT * FROM eventdetails WHERE event_date < CURDATE() ORDER BY event_date DESC LIMIT 12";
 db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).send(results);
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    deleteevent: async (req , res) => {
        try {
  var sql = `DELETE FROM eventdetails WHERE id=${req.params.event_title}; `;
  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).send("Event Deleted");
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },  

    event: async (req , res) => {
        try {

var event_title = req.body.event_title;
var sql = `SELECT EXISTS(SELECT * FROM eventdetails WHERE  event_title="${event_title}" )`;

        db.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          res.status(400).json({ status:error });
        } else {

          if(results[0][`EXISTS(SELECT * FROM eventdetails WHERE  event_title="${event_title}" )`] ==1){
            var sql = `SELECT * FROM eventdetails WHERE event_title="${event_title}"`;

            db.query(sql, (error, results) => {
              if (error) {
                // console.log(error);
          
                res.status(400).send(error);
              } else {
                res.status(200).send(results);
              }
            });
            
          }
          else{
            res.status(400).send("Sorry ! Event is not Available.")
          }
        }
      })

        } catch (error) {
            res.status(400).send(error)
        }
    }, 

    livenews: async (req , res) => {
        try {
var sql = "SELECT item_title, item_published   FROM blogs WHERE item_published>Date_SUB(CURDATE(),INTERVAL  7 DAY) ";

db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).send(results);
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    }, 

    tfhrankings: async (req , res) => {
        try {
const limit = 100;
  const page = req.body.page;
  const offset = (page - 1) * limit;

  var sql = `SELECT * FROM nft_stats ORDER BY one_day_volume DESC LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      var jsonResult = {
        page_count: results.length,
        page_number: page,
        stats: results,
      };
      res.status(200).send(jsonResult);
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    sdrankings: async (req , res) => {
        try {
  const limit = 100;
  const page = req.body.page;
  const offset = (page - 1) * limit;
  var sql = `SELECT * FROM nft_stats ORDER BY seven_day_volume DESC LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      var jsonResult = {
        page_count: results.length,
        page_number: page,
        stats: results,
      };
      res.status(200).send(jsonResult);
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    thdrankings: async (req , res) => {
        try {
  const limit = 100;
  const page = req.body.page;
  const offset = (page - 1) * limit;
  var sql = `SELECT * FROM nft_stats ORDER BY thirty_day_volume DESC LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    } else {
      var jsonResult = {
        page_count: results.length,
        page_number: page,
        stats: results,
      };
      res.status(200).send(jsonResult);
    }
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },   
    
    rating: async (req , res) => {
        try {
            const event_id = req.body.event_id;
            const user_IP = req.clientIp;
            // const ip = req.clientIp;
            const action = req.body.action;
            sql1 = ` SELECT EXISTS(SELECT * FROM rating_info WHERE event_id = "${event_id}" AND user_IP ="${user_IP}" AND action="${action}")`;
            db.query(sql1, function (err, result) {
              if (err) {
                console.log(err);
                res.status(500).json({ status: "error" });
              } else {
                // console.log(result)
                // console.log(result[0][`EXISTS(SELECT * FROM rating_info WHERE event_id = "${event_id}" AND user_IP ="${user_IP}" AND action="${action}")`])
                if (
                  result[0][
                    `EXISTS(SELECT * FROM rating_info WHERE event_id = "${event_id}" AND user_IP ="${user_IP}" AND action="${action}")`
                  ] == 1
                ) {
                  res.status(404).send("You have already Liked.");
                } else {
                  switch (action) {
                    case "01":
                      sql = `INSERT INTO rating_info ( event_id,user_IP, action) VALUES ("${event_id}", "${user_IP}", '01') ON DUPLICATE KEY UPDATE action='01'`;
                      db.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("sucess");
                        res.send("sucess");
                      });
          
                      break;
                    case "10":
                      sql = `DELETE FROM rating_info WHERE user_IP="${user_IP}" AND event_id="${event_id}" AND action="01"`;
                      db.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("sucess");
                        res.send("sucess");
                      });
                      break;
                    case "02":
                      sql = `INSERT INTO rating_info ( event_id,user_IP, action) VALUES ("${event_id}", "${user_IP}", '02') ON DUPLICATE KEY UPDATE action='02'`;
                      db.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("sucess");
                        res.send("sucess");
                      });
          
                      break;
                    case "20":
                      sql = `DELETE FROM rating_info WHERE user_IP="${user_IP}" AND event_id="${event_id}" AND action="02"`;
                      db.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("sucess");
                        res.send("sucess");
                      });
                      break;
                    case "03":
                      sql = `INSERT INTO rating_info ( event_id,user_IP, action) VALUES ("${event_id}", "${user_IP}", '03') ON DUPLICATE KEY UPDATE action='03'`;
                      db.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" heasucessrted");
                        res.send("sucess");
                      });
          
                      break;
                    case "30":
                      sql = `DELETE FROM rating_info WHERE user_IP="${user_IP}" AND event_id="${event_id}" AND action="03"`;
                      db.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("sucess");
                        res.send("sucess");
                      });
                      break;
                    default:
                      break;
                  }
                }
              }
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    getratings: async (req , res) => {
        try {
 event_id = req.body.event_id;
  const user_IP = req.clientIp;
  sql2 = `SELECT * FROM rating_info `;
  db.query(sql2, (err, response) => {
    if (err) throw err;
  });
  // query = `SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='01';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='02';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='03';SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="01");SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="02");SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="03")`;
  query = `SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='01';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='02';SELECT COUNT(*) FROM rating_info WHERE event_id = "${event_id}" AND action='03';SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="01" AND event_id = "${event_id}");SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="02" AND event_id = "${event_id}" );SELECT EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="03" AND event_id = "${event_id}")`;

  db.query(query, (err, result) => {
    var jsonResult = {
      heart_count: result[0][0]["COUNT(*)"],
      fire_count: result[1][0]["COUNT(*)"],
      diamond_count: result[2][0]["COUNT(*)"],
      user_heart:
        result[3][0][
          `EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="01" AND event_id = "${event_id}")`
        ],
      user_fire:
        result[4][0][
          `EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="02" AND event_id = "${event_id}" )`
        ],
      user_diamond:
        result[5][0][
          `EXISTS(SELECT * FROM rating_info WHERE user_IP="${user_IP}" AND action="03" AND event_id = "${event_id}")`
        ],
    };

    res.status(200).send(jsonResult);
  });
        } catch (error) {
            res.status(400).send(error)
        }
    },  

    displaytraits: async (req , res) => {
        try {
 const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/collection/${req.body.slug}`,
    headers: {
      Accept: "application/json",
      "X-API-KEY": "7369ed7fd1c148e29856e23a2de9d997",
    },
  };

  axios.request(options).then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
        } catch (error) {
            res.status(400).send(error)
        }
    },  

    collectioninfo: async (req , res) => {
        try {
          const slug = req.params.slug;
          var sql = `SELECT EXISTS(SELECT * FROM nft_stats WHERE  slug="${slug}" )`;
        db.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          res.status(400).json({ status:error });
        } else {
          
          if(results[0][`EXISTS(SELECT * FROM nft_stats WHERE  slug="${slug}" )`] ==1){
            var sql = `SELECT * from nft_stats WHERE slug="${slug}"`;

            db.query(sql, (error, results) => {
              if (error) {
                // console.log(error);
          
                res.status(400).json({ status: "error" });
              } else {
                res.status(200).send(results);
              }
            });
          }else{
            res.status(400).send("Sorry ! Collection is not Available.")
          }
        }
      })
            

        } catch (error) {
            res.status(400).send(error)
        }
    }, 

    assets: async (req , res) => {
        try {
  const slug = req.body.slug;
  var sql = `SELECT EXISTS(SELECT * FROM nft_stats WHERE  slug="${slug}" )`;
db.query(sql, (error, results) => {
if (error) {
  console.log(error);
  res.status(400).json({ status:error });
} else {
  
  if(results[0][`EXISTS(SELECT * FROM nft_stats WHERE  slug="${slug}" )`] ==1){
    const limit = req.params.limit;
  
    const page = req.body.page;
    const offset = page * limit;
    const options = {
      method: "GET",
      url: `https://api.opensea.io/api/v1/assets?collection_slug=${slug}&order_by=pk&order_direction=desc&limit=${limit}&offset=${offset}&include_orders=true`,
      headers: {
        Accept: "application/json",
        "X-API-KEY": "7369ed7fd1c148e29856e23a2de9d997",
      },
    };
  
    axios.request(options).then(function (response) {
        var jsonResult = {
          page_count: response.data.assets.length,
          page_number: page,
          asset_name: response.data,
        };
        res.send(jsonResult);
      })
      .catch(function (error) {
        console.error(error);
      });

}else{
  res.status(400).send("Sorry ! Collection is not Available.")
}
}
})
  
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    search: async (req , res) => {
        try {
            var sql = `SELECT name,slug,logo,contract FROM nft_stats`;

            db.query(sql, (error, results) => {
              if (error) {
                // console.log(error);
          
                res.status(400).send(error);
              } else {
                res.status(200).send(results);
              }
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    updatestats: async (req , res) => {
        try {
            var sql = `UPDATE nft_stats SET  market_cap="${req.body.market_cap}",floor_price="${req.body.floor_price}",num_owners="${req.body.num_owners}",total_volume="${req.body.total_volume}" WHERE slug = "${req.body.slug}"`;

            db.query(sql, function (err, result) {
              if (err) throw err;
          
              // console.log(" data updated.");
              res.status(200).send({ success: true, msg: "Data Updated." });
            });
          
           
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    getstat: async (req , res) => {
        try {
            var sql = `SELECT market_cap,floor_price,num_owners,total_supply,total_volume FROM nft_stats WHERE slug="${req.body.slug}"`;

            db.query(sql, (error, results) => {
              if (error) {
                // console.log(error);
          
                res.status(400).send(error);
              } else {
                res.status(200).send(results);
              }
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    addblog: async (req , res) => {
        try {
            let blog_id = uuid();

            console.log(req.body.title);
          
            var sql = `INSERT INTO adminblogs (blog_id,blog_title,blog_content,blog_image,blog_link) VALUES ("${blog_id}","${req.body.title}",'"${req.body.content}"',"${req.body.image}","${req.body.link}")`;
          
            db.query(sql, function (err, result) {
              if (err) throw err;
          
              res.status(200).send({ success: true, msg: "blog added successfully." });
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    blogs: async (req , res) => {
        try {
            var sql = "SELECT * FROM adminblogs ";

            db.query(sql, (error, results) => {
              if (error) {
                // console.log(error);
          
                res.status(400).send(error);
              } else {
                res.status(200).send(results);
              }
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },  

    deleteblog: async (req , res) => {
        try {
            var sql = `DELETE FROM adminblogs WHERE blog_id="${req.params.id}"; `;

            db.query(sql, (error, results) => {
              if (error) {
                // console.log(error);
          
                res.status(400).send(error);
              } else {
                res.status(200).send({ success: true, msg: "Blog Deleted successfully" });
              }
            }); 

        } catch (error) {
            res.status(400).send(error)
        }
    },   

    updateblog: async (req , res) => {
        try {
 var sql = `UPDATE adminblogs SET blog_title="${req.body.title}",blog_content='"${req.body.content}"',blog_image="${req.body.image}",blog_link="${req.body.link}" WHERE blog_id = "${req.params.id}"`;

 db.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send({ success: true, msg: result });
  });
        } catch (error) {
            res.status(400).send(error)
        }
    }, 
    getactivity: async (req , res) => {
        try {
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
        } catch (error) {
            res.status(400).send(error)
        }
    },
    
    gethistory: async (req , res) => {
        try {
            
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
          
        } catch (error) {
            res.status(400).send(error)
        }
    }, 
    adminlogin: async (req , res) => {
      try {
        let token;
        var email = req.body.email;
        var sql='SELECT * FROM admin WHERE email =?';
        db.query(sql, [email], (err, data)=> {
           
            if(err) throw err
            if (!data[0]){
             
                res.status(400).send({msg: "email does not exist"})
            } 
            
              //utils.comparePassword(req.body.password, data[0].password)
            else if (!bcrypt.compareSync(req.body.password,data[0].password)){
               
                res.status(400).send({msg:" Invalid password "})
            }   
            else{
               
                // console.log(data.id)
                token = jwt.sign({ email: data[0].email,id:data[0].id }, 'ijrg][09djhf89f%&v]', {
                    expiresIn: '2h' 
                  });
                  var sql = `UPDATE admin SET token="${token}" WHERE email = "${email}"`;
                  db.query(sql, function (err, result) {
                    if (err) throw err;
                    res.status(200).send({msg:"LogIn Successfull",accessToken: token})
                  });

                  
            }
                
        })
        
      } catch (error) {
          res.status(400).send(error)
      }
  }, 
// al: async (req , res) => {
//   // try{
//     user_name="baps@1234";
//     email="baps1234@gmail.com";
//     hashed_password=bcrypt.hashSync("baps@1234",8);
//     res.send(hashed_password)
//   // }catch(error){

//   // }
  
// }
    
}