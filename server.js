// Load Express.js
var express=require("express");
var staticSite = __dirname +'/Public';
var app=express();

app.use('/', express.static(staticSite));

app.listen(8080,function(){console.log('listening for request on port 8080');});
