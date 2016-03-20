// Load Express.js
var express=require("express");
var staticSite = __dirname +'/Public';
var app=express();

app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://192.168.0.226:8080', 'http://labmgmt.testlab.local:8080', 'http://create.testlab.local:8080'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020', );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, content-type');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});


app.use('/', express.static(staticSite));

app.listen(8080,function(){console.log('listening for request on port 8080');});
