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

try{
    var sql = `SELECT name,slug,count FROM nft_stats  ORDER BY one_day_volume  DESC LIMIT 4,1`;
    con.query(sql, (error, results) => {
   if (error) {
     console.log(error);
     res.status(400).json({ status: "error" });
   } else {
     results.forEach((e) => {
       console.log("collection:", e.name);
    //    console.log("count", e.count);

       var end = Math.ceil(9999 / 50);
    //    console.log("end-loop", end);
       for (i = 0; i < end; i++) {
         page = i;
         offset = page * 10;

         // console.log({"collection":e.name,"page-required":page})
         // console.log("offset-required",offset)
         try{
               try{
                const options = {
                  method: "GET",
                  url: `https://api.aliens.com/nft/collections/${e.slug}/items?sort_by=rarity_score&sort_order=desc&limit=50&offset=${offset}`,
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
                try{
                  axios.request(options).then(function (response) {
                    response.data.data.forEach(item=>{
                      counts=e.count
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
                      try{
                        sql = `INSERT INTO assets3 ( collection_name,collection_image,asset_name,image_url,owner,price,trait_type,trait_value,trait_count,rarity_percentage,rarity_scores,rarity) VALUES ("${
                            e.name
                          }","${item.collection_image_url}",'"${item.name}"',"${
                            item.image_url
                          }","${item.owner_address}","${item.price}","${data.trait_type}","${
                            data.trait_value
                          }","${data.trait_count}","${data.rarity_percentage}","${
                            data.rarity_score
                          }","${sum.toFixed(2)}")`;
                          con.query(sql, function (err, result) {
                            if (error) {
                              } else {
                                console.log("Asset is Inserted ..!");
                              }
  
                          });
                      }catch(error){console.log("query",error)}
  
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
                }catch(err){console.log("in axios","got error")}
  
               }catch(e){console.log(e)}
           
         }catch(error){"api request",console.log(error)}

       }

     });
   }
 });
}catch(error){
    console.log("main",error)
}


// for(i=1;i<=2150;i++){
//   b=i*5;
//   console.log("b",b)
// for(i=1;i<=5;i++){
//   b=(i-1)*5
//   console.log(b)
//   setTimeout(()=>{
//     var sql = `SELECT id,name,slug,count FROM nft_stats LIMIT ${b},5`;
//     con.query(sql, (error, results) => {
//       if (error) {
//         console.log(error);
//         res.status(400).json({ status: "error" });
//       } else {
//         results.forEach((e) => {
//           console.log("b",b)
//           console.log("collection:", e.id);
//         });
//       }
//     });
//   },12000)
// }
 
// }
// var sql = "SELECT COUNT(*) FROM nft_collections";
  
//   con.query(sql, (error, results) => {
//     if (error) {
//       // console.log(error);
      
//     }  else {

// var a=((results[0]['COUNT(*)'])/100).toFixed(0)
// console.log(a);
// for(i=1;i<=a;i++)
// {
// const v=i;
// console.log('a',v);
// const b=(v-1)*100;
// const c=v*100;
// console.log(` a ${b}-${c}`)
// setTimeout(()=>{
//     // console.log('b',v);
//     console.log(` b ${b}-${c}`)
    
//     try{
//       var sql = `SELECT name,slug,count FROM nft_stats  ORDER BY one_day_volume  DESC LIMIT ${b},100`;
//       con.query(sql, (error, results) => {
//      if (error) {
//        console.log(error);
//        res.status(400).json({ status: "error" });
//      } else {
//        results.forEach((e) => {
//          console.log("collection:", e.name);
//       //    console.log("count", e.count);
  
//          var end = Math.ceil(e.count / 50);
//       //    console.log("end-loop", end);
//          for (i = 0; i < end; i++) {
//            page = i;
//            offset = page * 10;
  
//            // console.log({"collection":e.name,"page-required":page})
//            // console.log("offset-required",offset)
//            try{
  
//               const options = {
//                   method: "GET",
//                   url: `https://api.aliens.com/nft/collections/${e.slug}/items?sort_by=rarity_score&sort_order=desc&limit=50&offset=${offset}`,
//                   headers: {
//                     Accept: "application/json"
//                   },
//                 };
//                 var a = {};
  
//                 data = {
//                   trait_type: [],
//                   trait_value: [],
//                   trait_count: [],
//                   rarity_percentage: [],
//                   rarity_score: [],
//                   overall: [],
//                 };
//                 try{
//                   axios.request(options).then(function (response) {
//                     response.data.data.forEach(item=>{
//                       counts=e.count
//                       item.asset_traits.forEach((i) => {
//                         a[item.name] = [];
//                         data.trait_type.push(i.trait_type);
//                         data.trait_value.push(i.value);
//                         data.trait_count.push(i.trait_count);
//                         data.rarity_percentage.push(
//                           Number((i.trait_count / counts).toFixed(2))
//                         );
//                         data.rarity_score.push(
//                           Number((counts / i.trait_count).toFixed(2))
//                         );
//                         a[item.name].push(data);
//                       })
//                       var sum = data.rarity_score.reduce(function (a, b) {
//                         return a + b;
//                       }, 0);
//                       // console.log("sum", sum.toFixed(2));
//                       // console.log(data)
//                       try{
//                         sql = `INSERT INTO assets3 ( collection_name,collection_image,asset_name,image_url,owner,price,trait_type,trait_value,trait_count,rarity_percentage,rarity_scores,rarity) VALUES ("${
//                             e.name
//                           }","${item.collection_image_url}",'"${item.name}"',"${
//                             item.image_url
//                           }","${item.owner_address}","${item.price}","${data.trait_type}","${
//                             data.trait_value
//                           }","${data.trait_count}","${data.rarity_percentage}","${
//                             data.rarity_score
//                           }","${sum.toFixed(2)}")`;
//                           con.query(sql, function (err, result) {
//                             if (error) {
//                               } else {
//                                 console.log("Asset is Inserted ..!");
//                               }
  
//                           });
//                       }catch(error){console.log("query",error)}
  
//                       data = {
//                         trait_type: [],
//                         trait_value: [],
//                         trait_count: [],
//                         rarity_percentage: [],
//                         rarity_score: [],
//                         overall: [],
//                       };
//                       // console.log(item.name)
//                     })
  
//                   });
//                 }catch(err){console.log("in axios","got error")}
  
//            }catch(error){"api request",console.log(error)}
  
//          }
  
//        });
//      }
//    });
//   }catch(error){
//       console.log("main",error)
//   }

//   },6000)
// }
//     }
//   })
app.listen(3000, () => {
  console.log("listening on 3000");
});
