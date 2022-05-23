var mysql = require("mysql");
const axios = require("axios");
let { parse } = require("rss-to-json");
var cors = require("cors");
const express = require("express");
const { end } = require("./database/db_connection");
const app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nftweb",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(cors());
app.use(express.json());
//   var sql = "SELECT COUNT(*) FROM nft_collections";

//   con.query(sql, (error, results) => {
//     if (error) {
//       // console.log(error);

//     }  else {

//         var a=((results[0]['COUNT(*)'])/100).toFixed(0)
//         // console.log(a);
//         for(i=1;i<=a;i++)
//         {
//         const v=i;
//         // console.log('a',v);
//         const b=(v-1)*100;
//         const c=v*100;
//         // console.log(` a ${b}-${c}`)
//         setTimeout(()=>{
//             console.log('b',v);
//             // console.log(` b ${b}-${c}`)
//             var sql1 = `SELECT id,name,slug,logo FROM nft_collections LIMIT ${b},100`;
//                 con.query(sql1, function (err, result) {
//                     if (err) throw err;
//                     result.forEach(async (item)=>{
//                       // console.log(b)
//                         console.log(item.id)
//                         // const options = {
//                         //     method: 'GET',
//                         //     url: `https://api.opensea.io/api/v1/collection/${item.slug}`,
//                         //     headers: {Accept: 'application/json'}
//                         //     };

//                         // axios.request(options).then(function (response) {
//                         //   var name = `${item.name}`;
//                         //   var logo= `${item.logo}`;
//                         //   var slug= `${item.slug}`;
//                         //   var background_image	=`${response.data['collection']['banner_image_url']}`;

//                         //   var contract	=`${response.data['collection']['primary_asset_contracts'][0]['address']}`;
//                         //   var discord_url=`${response.data['collection']['discord_url']}`;
//                         //   var	external_url=`${response.data['collection']['primary_asset_contracts'][0]['external_link']}`;
//                         //   var twitter_username=`${response.data['collection']['twitter_username']}`;
//                         //   var	instagram_username	=`${response.data['collection']['instagram_username']}`;
//                         //   var one_day_volume=`${response.data['collection']['stats']['one_day_volume']}` ;
//                         //   var one_day_change=`${response.data['collection']['stats']['one_day_change']}` ;
//                         //   var one_day_sales= `${response.data['collection']['stats']['one_day_sales']}`;
//                         //   var one_day_average_price=`${response.data['collection']['stats']['one_day_average_price']}`;
//                         //   var seven_day_volume=`${response.data['collection']['stats']['seven_day_volume']}` ;
//                         //   var seven_day_change=`${response.data['collection']['stats']['seven_day_change']}` ;
//                         //   var seven_day_sales=`${response.data['collection']['stats']['seven_day_sales']}` ;
//                         //   var seven_day_average_price=`${response.data['collection']['stats']['seven_day_average_price']}` ;
//                         //   var thirty_day_volume= `${response.data['collection']['stats']['thirty_day_volume']}`;
//                         //   var thirty_day_change= `${response.data['collection']['stats']['thirty_day_change']}`;
//                         //   var thirty_day_sales= `${response.data['collection']['stats']['thirty_day_sales']}`;
//                         //   var thirty_day_average_price= `${response.data['collection']['stats']['thirty_day_average_price']}`;
//                         //   var total_volume= `${response.data['collection']['stats']['total_volume']}`;
//                         //   var total_sales=`${response.data['collection']['stats']['total_sales']}` ;
//                         //   var total_supply= `${response.data['collection']['stats']['total_supply']}`;
//                         //   var count= `${response.data['collection']['stats']['count']}`;
//                         //   var num_owners=`${response.data['collection']['stats']['num_owners']}` ;
//                         //   var average_price= `${response.data['collection']['stats']['average_price']}`;
//                         //   var num_reports= `${response.data['collection']['stats']['num_reports']}`;
//                         //   var market_cap= `${response.data['collection']['stats']['market_cap']}`;
//                         //   var floor_price=`${response.data['collection']['stats']['floor_price']}` ;

//                         //     var sql = `INSERT IGNORE INTO nft_stat5 (name,logo,slug,background_image,contract,discord_url,external_url,twitter_username,instagram_username	,one_day_volume,one_day_change,one_day_sales,one_day_average_price,seven_day_volume,seven_day_change,seven_day_sales,seven_day_average_price,thirty_day_volume,thirty_day_change,thirty_day_sales,thirty_day_average_price,total_volume,total_sales,total_supply,count,num_owners,average_price,num_reports,market_cap,floor_price) VALUES ("${name}","${logo}","${slug}","${background_image}","${contract}","${discord_url}","${external_url}","${twitter_username}","${instagram_username}","${one_day_volume}","${one_day_change}","${one_day_sales}","${one_day_average_price}","${seven_day_volume}","${seven_day_change}","${seven_day_sales}","${seven_day_average_price}","${thirty_day_volume}","${thirty_day_change}","${thirty_day_sales}","${thirty_day_average_price}","${total_volume}","${total_sales}","${total_supply}","${count}","${num_owners}","${average_price}","${num_reports}","${market_cap}","${floor_price}") ON DUPLICATE KEY UPDATE name="${name}",logo="${logo}",slug="${slug}",one_day_volume="${one_day_volume}",one_day_change="${one_day_change}",one_day_sales="${one_day_sales}",one_day_average_price="${one_day_average_price}",seven_day_volume="${seven_day_volume}",seven_day_change="${seven_day_change}",seven_day_sales="${seven_day_sales}",seven_day_average_price="${seven_day_average_price}",thirty_day_volume="${thirty_day_volume}",thirty_day_change="${thirty_day_change}",thirty_day_sales="${thirty_day_sales}",thirty_day_average_price="${thirty_day_average_price}",total_volume="${total_volume}",total_sales="${total_sales}",total_supply="${total_supply}",count="${count}",num_owners="${num_owners}",average_price="${average_price}",num_reports="${num_reports}",market_cap="${market_cap}",floor_price="${floor_price}"`;
//                         //     con.query(sql, function (err, result) {
//                         //         if (err) throw err;
//                         //         console.log(" Data added.");
//                         //     });
//                         // }).catch(function (error) {
//                         //     console.error(error);
//                         // });

//                     });
//                 })
//          },6000)
//         }

//     }
// })

// // const axios = require("axios").default;

// app.get("/hello",(req,res)=>{
//   const options = {
//         method: 'GET',
//         url:`https://api.opensea.io/api/v1/assets?collection_slug=azuki&order_direction=desc&limit=20&include_orders=false`,
//         headers: {Accept: 'application/json', 'X-API-KEY': '7369ed7fd1c148e29856e23a2de9d997'}
//       };

//       axios.request(options).then(function (response) {
//         response.data.forEach(a=>{
//          console.log(a)
//   })
//         res.send(response.data);
//       }).catch(function (error) {
//         console.error(error);
//       });
// })
// var sql = "SELECT COUNT(*) FROM nft_collections";

//   con.query(sql, (error, results) => {
//     if (error) {
//       // console.log(error);

//     }  else {

//         var a=((results[0]['COUNT(*)'])/100).toFixed(0)
//         console.log(a);
//         for(i=1;i<=a;i++)
//         {
//         const v=i;
//         console.log('a',v);
//         const b=(v-1)*200;
//         const c=v*100;
//         console.log(` a ${b}-${c}`)
//         setTimeout(()=>{
//             // console.log('b',v);
//             console.log(` b ${b}-${c}`)

//             var sql1 = `SELECT name,slug,logo FROM nft_collections LIMIT ${b},200`;
//                 con.query(sql1, function (err, result) {
//                     if (err) throw err;
//                     result.forEach(async (item)=>{
//                         // console.log(item.slug)
//                         const options = {
//                             method: 'GET',
//                             url: `https://api.opensea.io/api/v1/collection/${item.slug}`,
//                             headers: {Accept: 'application/json'}
//                             };

//                         axios.request(options).then(function (response) {
//                           var name = `${item.name}`;
//                           var logo= `${item.logo}`;
//                           var slug= `${item.slug}`;
//                           var background_image	=`${response.data['collection']['banner_image_url']}`;

//                           var contract	=`${response.data['collection']['primary_asset_contracts'][0]['address']}`;
//                           var discord_url=`${response.data['collection']['discord_url']}`;
//                           var	external_url=`${response.data['collection']['primary_asset_contracts'][0]['external_link']}`;
//                           var twitter_username=`${response.data['collection']['twitter_username']}`;
//                           var	instagram_username	=`${response.data['collection']['instagram_username']}`;
//                           var one_day_volume=`${response.data['collection']['stats']['one_day_volume']}` ;
//                           var one_day_change=`${response.data['collection']['stats']['one_day_change']}` ;
//                           var one_day_sales= `${response.data['collection']['stats']['one_day_sales']}`;
//                           var one_day_average_price=`${response.data['collection']['stats']['one_day_average_price']}`;
//                           var seven_day_volume=`${response.data['collection']['stats']['seven_day_volume']}` ;
//                           var seven_day_change=`${response.data['collection']['stats']['seven_day_change']}` ;
//                           var seven_day_sales=`${response.data['collection']['stats']['seven_day_sales']}` ;
//                           var seven_day_average_price=`${response.data['collection']['stats']['seven_day_average_price']}` ;
//                           var thirty_day_volume= `${response.data['collection']['stats']['thirty_day_volume']}`;
//                           var thirty_day_change= `${response.data['collection']['stats']['thirty_day_change']}`;
//                           var thirty_day_sales= `${response.data['collection']['stats']['thirty_day_sales']}`;
//                           var thirty_day_average_price= `${response.data['collection']['stats']['thirty_day_average_price']}`;
//                           var total_volume= `${response.data['collection']['stats']['total_volume']}`;
//                           var total_sales=`${response.data['collection']['stats']['total_sales']}` ;
//                           var total_supply= `${response.data['collection']['stats']['total_supply']}`;
//                           var count= `${response.data['collection']['stats']['count']}`;
//                           var num_owners=`${response.data['collection']['stats']['num_owners']}` ;
//                           var average_price= `${response.data['collection']['stats']['average_price']}`;
//                           var num_reports= `${response.data['collection']['stats']['num_reports']}`;
//                           var market_cap= `${response.data['collection']['stats']['market_cap']}`;
//                           var floor_price=`${response.data['collection']['stats']['floor_price']}` ;

//                             var sql = `INSERT IGNORE INTO nft_stats (name,logo,slug,background_image,contract,discord_url,external_url,twitter_username,instagram_username	,one_day_volume,one_day_change,one_day_sales,one_day_average_price,seven_day_volume,seven_day_change,seven_day_sales,seven_day_average_price,thirty_day_volume,thirty_day_change,thirty_day_sales,thirty_day_average_price,total_volume,total_sales,total_supply,count,num_owners,average_price,num_reports,market_cap,floor_price) VALUES ("${name}","${logo}","${slug}","${background_image}","${contract}","${discord_url}","${external_url}","${twitter_username}","${instagram_username}","${one_day_volume}","${one_day_change}","${one_day_sales}","${one_day_average_price}","${seven_day_volume}","${seven_day_change}","${seven_day_sales}","${seven_day_average_price}","${thirty_day_volume}","${thirty_day_change}","${thirty_day_sales}","${thirty_day_average_price}","${total_volume}","${total_sales}","${total_supply}","${count}","${num_owners}","${average_price}","${num_reports}","${market_cap}","${floor_price}") ON DUPLICATE KEY UPDATE name="${name}",logo="${logo}",slug="${slug}",one_day_volume="${one_day_volume}",one_day_change="${one_day_change}",one_day_sales="${one_day_sales}",one_day_average_price="${one_day_average_price}",seven_day_volume="${seven_day_volume}",seven_day_change="${seven_day_change}",seven_day_sales="${seven_day_sales}",seven_day_average_price="${seven_day_average_price}",thirty_day_volume="${thirty_day_volume}",thirty_day_change="${thirty_day_change}",thirty_day_sales="${thirty_day_sales}",thirty_day_average_price="${thirty_day_average_price}",total_volume="${total_volume}",total_sales="${total_sales}",total_supply="${total_supply}",count="${count}",num_owners="${num_owners}",average_price="${average_price}",num_reports="${num_reports}",market_cap="${market_cap}",floor_price="${floor_price}"`;
//                             con.query(sql, function (err, result) {
//                                 if (err) throw err;
//                                 console.log(" Data added.");
//                             });
//                         }).catch(function (error) {
//                             // console.error(error);
//                         });

//                     });
//                 })
//          },65000*v)
//         }
//         // console.log("Finished.")

//     }
// })

// var sites = [
//     "https://nftplazas.com/feed/",
//     "https://www.nftically.com/blog/feed/",
//     "https://blog.crypto.com/tag/nft/rss/",
//     "https://www.ft.com/stream/72709ae9-1963-4d08-a153-8a5746accb20?format=rss",
//     "https://www.blockchain-council.org/category/nft/feed/",
//     "https://rss2.feedspot.com/https://cointelegraph.com/tags/nft?context=371833323",
//    "https://www.playtoearn.online/feed/",

//    "https://nftcalendar.io/feed",

//    "https://nftevening.com/feed/",
//    "https://nftnow.com/feed/",
//    "https://editorial.superrare.com/feed/",
//    "https://medium.com/feed/@rarible",
//    "https://editorial.mintable.app/category/blog/feed/",
//    "https://news.artnet.com/market/nfts/feed",
//    "https://blog.veefriends.com/feed",
//    "https://metaversal.banklesshq.com/feed",
//    "https://blogs.airdropalert.com/category/news/nft/feed/",
//    "https://thedefiant.io/feed/",
//    "https://www.startwithnfts.com/rss.xml",
//    "https://blog.nftx.io/rss/",
//    "https://www.nextnftdrop.com/category/uncategorized/nft/feed/",
//    "https://www.nftsstreet.com/feed/",
//    "https://blog.switchere.com/nft/feed/",
//    "https://www.nftgators.com/feed/",
//    "https://nftnewstoday.com/feed/",
//    "https://eneftygallery.com/feed/",
//    "https://nftdesire.io/feed/",
//    "https://www.bitscrunch.com/feed",
//    "https://generativenfts.io/blog?format=feed&type=atom",
//    "https://socialnft.market/feed/",
//    "https://danky.art/blog/feed",
//    "https://tokenizedhq.com/feed/",
//    "https://tonipaynenft.com/feed/",
//    "https://everydaynft.co/feed/",
//    "https://cryptoartnfts.com/feed/",
//    "https://www.keemogallery.com/nftposts?format=rss",

//     ];
//   sites.map(async (l) => {
//     var rss =await parse(l);
//     var feed_title = rss.title;
//     var feed_link = rss.link;
//     var feed_description = rss.description;
//     var feed_image_url = rss.image;
//     // res.send({"Title":feed_title,"Link":feed_link,"Discription":feed_description,"Image":feed_image_url});
//     //

//     // console.log("Discription:", feed_description);
//     // console.log("Image:", feed_image_url);
//     var feedadd = `INSERT IGNORE INTO origin (feed_title,feed_link,rss_link,feed_description,feed_image_url) VALUES ("${feed_title}","${feed_link}","${l}","${feed_description}","${feed_image_url}")`;
//     con.query(feedadd, function (err, result) {
//       if (err) throw err;
//       // console.log("Datas are inserted Successfully");
//       console.log(l)
//       console.log("Title:", feed_title);
//       console.log("Link:", feed_link);
//     });
//   });

// setInterval(()=>{
//   var sql1 = ` SELECT * FROM origin`;
//   con.query(sql1, function (err, result) {
//      if (err) throw err;
//      result.forEach(async (a)=>{
//           //  console.log(a)
//            var link=a.rss_link;
//            var rss =await parse(link);
//            var feed_title=rss.title;
//            var feed_link=rss.link;
//            var feed_description=rss.description;
//            var feed_image_url=rss.image;

//            rss.items.forEach((item) => {

//                    var item_title=item.title;
//                    var item_link=item.link;
//                    var item_categories=item.category;
//                    var item_published=item.published;
//                    var date = new Date(item_published);
//                    console.log(item.image)
//                    var datetimev= `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
//                    var item_description=item.description;

//                        var sql2 =`INSERT IGNORE INTO blog (feed_title,feed_link,feed_image_url,item_title,item_categories,item_link,item_published,item_image_url) VALUES ("'${feed_title}'",'${feed_link}','${feed_image_url}',"'${item_title}'","'${item_categories}'",'${item_link}','${datetimev}',NULL)`;
//                        con.query(sql2, function (err, result) {
//                            if (err) throw err;
//                            console.log("Datas are inserted Successfully");
//                        });

//                    });

//    });

// });

// },5000)

// app.get("/blogs",(req,res)=>{
//   try {
//     var sql = "SELECT * FROM blog ORDER BY item_published DESC";
//     con.query(sql, (error, results) => {
//       if (error) {
//         console.log(error);
//         res.status(400).json({ status: "error" });
//       } else {
//         res.status(200).send(results);
//       }
//     });
// } catch (error) {
//     res.status(400).send(error)
// }

// })
// app.get("/addblog",(req,res)=>{
//   try {

// console.log("API Called")
// var sql1 = ` SELECT * FROM cryptorigin`;
//   con.query(sql1, function (err, result) {
//      if (err) throw err;
//      result.forEach(async (a)=>{
//           //  console.log(a)
//            var link=a.rss_link;
//            var rss =await parse(link);
//            var feed_title=rss.title;
//            var feed_link=rss.link;
//            var feed_description=rss.description;
//            var feed_image_url=rss.image;

//            rss.items.forEach((item) => {

//                    var item_title=item.title;
//                    var item_link=item.link;
//                    var item_categories=item.category;
//                    var item_published=item.published;
//                    var date = new Date(item_published);

//                    var datetimev= `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
//                    var item_description=item.description;

//                        var sql2 =`INSERT IGNORE INTO cryptoblog (feed_title,feed_link,feed_image_url,item_title,item_categories,item_link,item_published,item_image_url) VALUES ("'${feed_title}'",'${feed_link}','${feed_image_url}',"'${item_title}'","'${item_categories}'",'${item_link}','${datetimev}',NULL)`;
//                        con.query(sql2, function (err, result) {
//                            if (err) throw err;
//                            console.log("Datas are inserted Successfully");

//                        });

//                    });

//    });

// });
// res.json({msg:"Added"})
// } catch (error) {
//     res.status(400).send(error)
// }

// })

// var sites = [
//   "https://cointelegraph.com/rss",
//   "https://www.newsbtc.com/feed/",
//   "https://www.cryptoninjas.net/feed/",
//   "https://news.bitcoin.com/feed/",
//   "https://blog.coinbase.com/feed",
//   "https://www.financemagnates.com/cryptocurrency/feed/",
//   "https://blog.kraken.com/feed/",
//   "https://themarketscompass.substack.com/feed",
//   "http://www.bitcoin-rss.com/rss/latest-posts",
//   "https://medium.com/feed/buyucoin-talks",
//   "https://wazirx.com/blog/feed/",
//   "https://coinstats.app/blog/feed/",
//   "https://cryptopotato.com/feed",
//   "https://cryptoslate.com/feed/",
//   "https://www.bitdegree.org/crypto/news/rss",
//   "https://bitcoinmagazine.com/.rss/full/",
//   "https://coinpedia.org/feed/",
//   "https://zebpay.com/feed/",

//   "https://coinquora.com/news/feed/",
//   "https://www.crypto-news-flash.com/feed/",
//   "https://www.bitcoinmarketjournal.com/feed/",
//   "https://nulltx.com/feed/",
//   "https://cryptonews.com.au/feed/"
//       ];
//     sites.map(async (l) => {
//       var rss =await parse(l);
//       var feed_title = rss.title;
//       var feed_link = rss.link;
//       var feed_description = rss.description;
//       var feed_image_url = rss.image;
//       // res.send({"Title":feed_title,"Link":feed_link,"Discription":feed_description,"Image":feed_image_url});
//       //

//       // console.log("Discription:", feed_description);
//       // console.log("Image:", feed_image_url);
//       var feedadd = `INSERT IGNORE INTO cryptorigin (feed_title,feed_link,rss_link,feed_description,feed_image_url) VALUES ("${feed_title}","${feed_link}","${l}","${feed_description}","${feed_image_url}")`;
//       con.query(feedadd, function (err, result) {
//         if (err) throw err;
//         // console.log("Datas are inserted Successfully");
//         console.log(l)
//         console.log("Title:", feed_title);
//         console.log("Link:", feed_link);
//       });
//     });
app.post("/test", (req, res) => {
  const limit = 50;

  const page = req.body.page;
  const offset = page * limit;
  const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/assets?collection_slug=${req.body.slug}&order_by=pk&order_direction=desc&limit=${limit}&offset=${offset}&include_orders=true`,
    headers: {
      Accept: "application/json",
      "X-API-KEY": "7369ed7fd1c148e29856e23a2de9d997",
    },
  };
  var a = {};

  data = {
    trait_type: [],
    trait_value: [],
    trait_count: [],
    rarity_percentage: [],
    rarity_score: [],
    overall: [],
  };
  axios
    .request(options)
    .then(function (response) {
      response.data.assets.forEach((item) => {
        // console.log("y",item.asset_contract.name)
        var sql = `SELECT count FROM nft_stats WHERE name="${item.asset_contract.name}"`;
        con.query(sql, (error, results) => {
          if (error) {
            console.log(error);
            res.status(400).json({ status: "error" });
          } else {
            // console.log(results)
            var counts = results[0].count;
            console.log("A", counts);
            item.traits.forEach((i) => {
              a[item.name] = [];
              data.trait_type.push(i.trait_type);
              data.trait_value.push(i.value);
              data.trait_count.push(i.trait_count);
              data.rarity_percentage.push(
                Number((i.trait_count / counts).toFixed(2))
              );
              data.rarity_score.push(
                Number((counts / i.trait_count).toFixed(2))
              );
              a[item.name].push(data);
            });
            var sum = data.rarity_score.reduce(function (a, b) {
              return a + b;
            }, 0);
            console.log("sum", sum.toFixed(2));
            //  console.log(item)
            var a1 = "";
            if (item.last_sale) {
              a1 = item.last_sale.total_price;
            }
            sql = `INSERT INTO assets ( collection_name,collection_image,asset_name,image_url,image_preview_url,image_thumbnail_url,image_original_url,owner,price,trait_type,trait_value,trait_count,rarity_percentage,rarity_scores,rarity) VALUES ("${
              item.asset_contract.name
            }","${item.asset_contract.image_url}","${item.name}","${
              item.image_url
            }","${item.image_preview_url}","${item.image_thumbnail_url}","${
              item.image_original_url
            }","${item.owner.address}","${a1}","${data.trait_type}","${
              data.trait_value
            }","${data.trait_count}","${data.rarity_percentage}","${
              data.rarity_score
            }","${sum.toFixed(2)}")`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("entered");
            });
            //  console.log(data.trait_type)
            data = {
              trait_type: [],
              trait_value: [],
              trait_count: [],
              rarity_percentage: [],
              rarity_score: [],
              overall: [],
            };

            //  console.log(a)
            //  res.send(a)
          }
        });
        // console.log(item.traits);
        // item.traits.forEach((i) => {
        //   a[item.name]=[]
        //   // console.log(i.trait_type)
        //   data.trait_type.push(i.trait_type)
        //   data.trait_value.push(i.value)
        //   data.trait_count.push(i.trait_count)
        //   data.rarity_percentage.push(i.trait_count/10000)
        //   data.rarity_score.push(10000/i.trait_count)
        //   a[item.name].push(data);

        //   // console.log(a);

        // });
        // data={
        //   trait_type:[],trait_value:[],trait_count:[],rarity_percentage:[],rarity_score:[]
        // }
        // console.log(a)
      });
      res.send("Adding to database");
    })
    .catch(function (error) {
      console.error(error);
    });
});
app.get("/traits", (req, res) => {
  var sql = `SELECT * FROM assets `;
  con.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(400).json({ status: "error" });
    } else {
      var a = {};
      data = { rarity: "" };
      results.forEach((i) => {
        a[i.asset_name] = [];
        console.log(i.rarity);
        data.rarity = i.rarity;
        a[i.asset_name].push(data);
        console.log(a);
      });

      data = { rarity: "" };
      res.send(a);
    }
  });
});
// app.get("/assets",(req,res)=>{
// var sql = `SELECT name,slug,count FROM nft_stats LIMIT 10 `;
// con.query(sql, (error, results) => {
  // if (error) {
  //   console.log(error);
  //   res.status(400).json({ status: "error" });
  // } 
  // else {
    // results.forEach((e) => {
      // console.log("collection:", e.name);
      // console.log("count", e.count);
      count=1
      0000
     var end1 = Math.ceil(count / 50);
      console.log("end-loop", end1);
      for (i = 0; i < end1; i++) {
        page = i;
        offset = page * 50;
     
        // console.log({"collection":e.name,"page-required":page})
        // console.log("offset-required",offset)
        const options = {
          method: "GET",
          url: `https://api.aliens.com/nft/collections/boredapeyachtclub/items?sort_by=rarity_score&sort_order=desc&limit=50&offset=${offset}`,
          headers: {
            Accept: "application/json"
          },
        };
        var a = {};

        data = {
          trait_type: [],
          trait_value: [],
          trait_count: [],
          rarity_percentage: [],
          rarity_score: [],
          overall: [],
        };
        axios.request(options).then(function (response) {
          response.data.data.forEach(item=>{
            counts=count
            item.asset_traits.forEach((i) => {
              a[item.name] = [];
              data.trait_type.push(i.trait_type);
              data.trait_value.push(i.value);
              data.trait_count.push(i.trait_count);
              data.rarity_percentage.push(
                Number((i.trait_count / counts).toFixed(2))
              );
              data.rarity_score.push(
                Number((counts / i.trait_count).toFixed(2))
              );
              a[item.name].push(data);
            })
            var sum = data.rarity_score.reduce(function (a, b) {
              return a + b;
            }, 0);
            // console.log("sum", sum.toFixed(2));
            // console.log(data)
            sql = `INSERT INTO assets1 ( collection_name,collection_image,asset_name,image_url,image_preview_url,image_thumbnail_url,image_original_url,owner,price,trait_type,trait_value,trait_count,rarity_percentage,rarity_scores,rarity) VALUES ("${
              item.collection_name
            }","${item.collection_image_url}","${item.name}","${
              item.image_url
            }","${item.image_url}","${item.image_url}","${
              item.image_url
            }","${item.owner_address}","${item.price}","${data.trait_type}","${
              data.trait_value
            }","${data.trait_count}","${data.rarity_percentage}","${
              data.rarity_score
            }","${sum.toFixed(2)}")`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("entered");
            });
            data = {
              trait_type: [],
              trait_value: [],
              trait_count: [],
              rarity_percentage: [],
              rarity_score: [],
              overall: [],
            };
            // console.log(item.name)
          })

          
        });
    
      }
    
    // });
  // }
// });

// })

app.listen(3000, () => {
  console.log("listening on 3000");
});







// var sql = `SELECT name,slug,count FROM nft_stats LIMIT 10 `;
// con.query(sql, (error, results) => {
//   if (error) {
//     console.log(error);
//     res.status(400).json({ status: "error" });
//   } else {
//     results.forEach((e) => {
//       console.log("collection:", e.name);
//       console.log("count", e.count);

//       var end = Math.ceil(e.count / 50);
//       console.log("end-loop", end);
//       for (i = 0; i < end; i++) {
//         page = i;
//         offset = page * 50;
     
//         // console.log({"collection":e.name,"page-required":page})
//         // console.log("offset-required",offset)
//         const options = {
//           method: "GET",
//           url: `https://api.aliens.com/nft/collections/${e.slug}/items?sort_by=rarity_score&sort_order=desc&limit=50&offset=${offset}`,
//           headers: {
//             Accept: "application/json"
//           },
//         };
//         var a = {};

//         data = {
//           trait_type: [],
//           trait_value: [],
//           trait_count: [],
//           rarity_percentage: [],
//           rarity_score: [],
//           overall: [],
//         };
//         axios.request(options).then(function (response) {
//           response.data.data.forEach(item=>{
//             counts=e.count
//             item.asset_traits.forEach((i) => {
//               a[item.name] = [];
//               data.trait_type.push(i.trait_type);
//               data.trait_value.push(i.value);
//               data.trait_count.push(i.trait_count);
//               data.rarity_percentage.push(
//                 Number((i.trait_count / counts).toFixed(2))
//               );
//               data.rarity_score.push(
//                 Number((counts / i.trait_count).toFixed(2))
//               );
//               a[item.name].push(data);
//             })
//             var sum = data.rarity_score.reduce(function (a, b) {
//               return a + b;
//             }, 0);
//             // console.log("sum", sum.toFixed(2));
//             // console.log(data)
//             sql = `INSERT INTO assets1 ( collection_name,collection_image,asset_name,image_url,image_preview_url,image_thumbnail_url,image_original_url,owner,price,trait_type,trait_value,trait_count,rarity_percentage,rarity_scores,rarity) VALUES ("${
//               item.collection_name
//             }","${item.collection_image_url}","${item.name}","${
//               item.image_url
//             }","${item.image_url}","${item.image_url}","${
//               item.image_url
//             }","${item.owner_address}","${item.price}","${data.trait_type}","${
//               data.trait_value
//             }","${data.trait_count}","${data.rarity_percentage}","${
//               data.rarity_score
//             }","${sum.toFixed(2)}")`;
//             con.query(sql, function (err, result) {
//               if (err) throw err;
//               console.log("entered");
//             });
//             data = {
//               trait_type: [],
//               trait_value: [],
//               trait_count: [],
//               rarity_percentage: [],
//               rarity_score: [],
//               overall: [],
//             };
//             // console.log(item.name)
//           })

          
//         });
    
//       }
    
//     });
//   }
// });