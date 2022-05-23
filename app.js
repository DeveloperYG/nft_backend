const express = require('express');
const dotenv = require('dotenv');
const axios = require("axios");
var cors = require('cors');
const app = express();
var bcrypt=require('bcryptjs');
var jwt = require("jsonwebtoken");
const db = require('./database/db_connection')
const requestIp = require('request-ip');
const PORT=process.env.APP_PORT || 5000;
app.use(requestIp.mw());
//initialize environment values
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('upload'));

// Routes :

const appRouter = require('./routes/Route');
app.use('/nfthi', appRouter);

try{

    setInterval(()=>{
      //   const options = {
      //     method: 'GET',
      //     url: `https://api.nftgo.io/api/v1/ranking/collections?offset=0&limit=1871&by=marketCap&interval=24h&asc=-1&rarity=-1&fields=marketCap,marketCapChange24h,relMarketCap,buyerNum24h,buyerNum24hChange24h,sellerNum24h,sellerNum24hChange24h,liquidity24h,liquidity24hChange24h,saleNum24h,saleNum24hChange24h,volume24h,relVolume24h,traderNum24h,traderNum24hChange24h,holderNum,holderNumChange24h,whaleNum,whaleNumChange24h,orderAvgPriceETH24h,orderAvgPriceETH24hChange24h,orderAvgPrice24h,orderAvgPrice24hChange24h,floorPrice,floorPriceChange24h`
      //   };
        
      //   axios.request(options).then(function (response) {
      //     response.data.data.list.forEach(a=>{
      //       // console.log('name',a.name)
      //       // console.log('slug',a.slug)
      //       // console.log('link',a.link)
      //       // console.log('openseaLink',a.openseaLink)
      //       // console.log('blockchain',a.blockchain)
      //       var slug='';
         
      //       var url=a.openseaLink;
           
      //       if(url === undefined){
      //         const slug2=a.slug;
      //         slug=slug2.replace(/['"]/g, '');
      //       }
      //       else{
      
      //           var arr= url.split("/");
      //           slug=arr[4];
                
      //         }
           
      //         const name1=a.name;
                
                
      //         const name=name1.replace(/['"]/g, '');
             
            
              
      //       var sql = `INSERT IGNORE INTO nft_collections (name,slug,link,openseaLink,logo,blockchain,marketCap) VALUES ('"${name}"',"${slug}","${a.link}","${a.openseaLink}","${a.logo}","${a.blockchain}","${a.marketCap}")`;
      //       db.query(sql, function (err, result) {
      //         if (err) throw err;
      //         // console.log(" Data added.");
      //       });
            
      //     })
          
      //   }).catch(function (error) {
      //     // console.error(error);
      //   });
        
       
      //   const options1 = {
      //     method: 'GET',
      //     url: `https://api.aliens.com/top-nft-collections?since=24h`
      //   };
      //   axios.request(options1).then(function (response) {
          
      //     response.data.top_collections.forEach(a=>{
      //       // console.log(a.collection.name);
      //       // console.log(a.collection.slug);
      //       // console.log(a.collection.image_url);
      //       // console.log(a.opensea_url);
      //       // console.log(a.collection.stats.market_cap);
      //         var url=a.opensea_url;
      //         var arr= url.split("/");
      //         var slug1=arr[4];
              
      //       var sql = `INSERT IGNORE INTO nft_collections (name,slug,link,openseaLink,logo,marketCap) VALUES ("${a.collection.name}","${slug1}","${a.opensea_url}","${a.opensea_url}","${a.collection.image_url}","${a.collection.stats.market_cap}")`;
      //       db.query(sql, function (err, result) {
      //         if (err) throw err;
      //         // console.log(" Data added1.");
      //       });
            
            
      //     });
          
      //   }).catch(function (error) {
      //     // console.error(error);
      //   });
      
      //   var sql = "SELECT COUNT(*) FROM nft_collections";
        
      //   db.query(sql, (error, results) => {
      //     if (error) {
      //       // console.log(error);
            
      //     }  else {
      
      //         var a=((results[0]['COUNT(*)'])/100).toFixed(0)
      //         // console.log(a);
      //         for(i=1;i<=a;i++)
      //         {
      //         const v=i;
      //         console.log('a',v);
      //         const b=(v-1)*100;
      //         const c=v*100;
      //         console.log(` a ${b}-${c}`)
      //         setTimeout(()=>{
      //             console.log('b',v);
      //             console.log(` b ${b}-${c}`)
      //             var sql1 = `SELECT name,slug,logo FROM nft_collections WHERE LIMIT ${b},100`;
      //                 db.query(sql1, function (err, result) {
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
                                
      //                             var sql = `INSERT IGNORE INTO nft_stats (name,logo,slug,background_image,contract,discord_url,external_url,twitter_username,instagram_username	,one_day_volume,one_day_change,one_day_sales,one_day_average_price,seven_day_volume,seven_day_change,seven_day_sales,seven_day_average_price,thirty_day_volume,thirty_day_change,thirty_day_sales,thirty_day_average_price,total_volume,total_sales,total_supply,count,num_owners,average_price,num_reports,market_cap,floor_price) VALUES ('"${name}"',"${logo}","${slug}","${background_image}","${contract}","${discord_url}","${external_url}","${twitter_username}","${instagram_username}","${one_day_volume}","${one_day_change}","${one_day_sales}","${one_day_average_price}","${seven_day_volume}","${seven_day_change}","${seven_day_sales}","${seven_day_average_price}","${thirty_day_volume}","${thirty_day_change}","${thirty_day_sales}","${thirty_day_average_price}","${total_volume}","${total_sales}","${total_supply}","${count}","${num_owners}","${average_price}","${num_reports}","${market_cap}","${floor_price}") ON DUPLICATE KEY UPDATE name="${name}",logo="${logo}",slug="${slug}",one_day_volume="${one_day_volume}",one_day_change="${one_day_change}",one_day_sales="${one_day_sales}",one_day_average_price="${one_day_average_price}",seven_day_volume="${seven_day_volume}",seven_day_change="${seven_day_change}",seven_day_sales="${seven_day_sales}",seven_day_average_price="${seven_day_average_price}",thirty_day_volume="${thirty_day_volume}",thirty_day_change="${thirty_day_change}",thirty_day_sales="${thirty_day_sales}",thirty_day_average_price="${thirty_day_average_price}",total_volume="${total_volume}",total_sales="${total_sales}",total_supply="${total_supply}",count="${count}",num_owners="${num_owners}",average_price="${average_price}",num_reports="${num_reports}",market_cap="${market_cap}",floor_price="${floor_price}"`;
      //                             db.query(sql, function (err, result) {
      //                                 if (err) throw err;
      //                                 console.log(" Data added.");
      //                             });
      //                         }).catch(function (error) {
      //                             console.error(error);
      //                         });
                                                              
      //                     });
      //                 })
      //          },65000*v)
      //         }
      //         // console.log("Finished.")
              
      //     }
      // })
      var sql = "SELECT COUNT(*) FROM nft_collections";
  
  db.query(sql, (error, results) => {
    if (error) {
      // console.log(error);
      
    }  else {

        var a=((results[0]['COUNT(*)'])/100).toFixed(0)
        console.log(a);
        for(i=1;i<=a;i++)
        {
        const v=i;
        console.log('a',v);
        const b=(v-1)*100;
        const c=v*100;
        console.log(` a ${b}-${c}`)
        setTimeout(()=>{
            // console.log('b',v);
            console.log(` b ${b}-${c}`)
            
            var sql1 = `SELECT name,slug,logo FROM nft_collections LIMIT ${b},100`;
                db.query(sql1, function (err, result) {
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
                          
                            var sql = `INSERT IGNORE INTO nft_stats (name,logo,slug,background_image,contract,discord_url,external_url,twitter_username,instagram_username	,one_day_volume,one_day_change,one_day_sales,one_day_average_price,seven_day_volume,seven_day_change,seven_day_sales,seven_day_average_price,thirty_day_volume,thirty_day_change,thirty_day_sales,thirty_day_average_price,total_volume,total_sales,total_supply,count,num_owners,average_price,num_reports,market_cap,floor_price) VALUES ("${name}","${logo}","${slug}","${background_image}","${contract}","${discord_url}","${external_url}","${twitter_username}","${instagram_username}","${one_day_volume}","${one_day_change}","${one_day_sales}","${one_day_average_price}","${seven_day_volume}","${seven_day_change}","${seven_day_sales}","${seven_day_average_price}","${thirty_day_volume}","${thirty_day_change}","${thirty_day_sales}","${thirty_day_average_price}","${total_volume}","${total_sales}","${total_supply}","${count}","${num_owners}","${average_price}","${num_reports}","${market_cap}","${floor_price}") ON DUPLICATE KEY UPDATE name="${name}",logo="${logo}",slug="${slug}",one_day_volume="${one_day_volume}",one_day_change="${one_day_change}",one_day_sales="${one_day_sales}",one_day_average_price="${one_day_average_price}",seven_day_volume="${seven_day_volume}",seven_day_change="${seven_day_change}",seven_day_sales="${seven_day_sales}",seven_day_average_price="${seven_day_average_price}",thirty_day_volume="${thirty_day_volume}",thirty_day_change="${thirty_day_change}",thirty_day_sales="${thirty_day_sales}",thirty_day_average_price="${thirty_day_average_price}",total_volume="${total_volume}",total_sales="${total_sales}",total_supply="${total_supply}",count="${count}",num_owners="${num_owners}",average_price="${average_price}",num_reports="${num_reports}",market_cap="${market_cap}",floor_price="${floor_price}"`;
                            db.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log(" Data added.");
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

      
      },15000000)//300000
      
    

}catch(err){
    console.log(err)
}

app.listen(PORT,()=>{
    console.log("server is running");
  });
