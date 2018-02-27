var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonData = require("./public/cleaned-master")
var pooled = require("./public/pooled")
var envelopes = require("./public/envelopes")
var path = require('path')
var cors = require('cors');

var TreeMap2016 = require('./controllers/TreeMap2016')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./controllers/Locations'));

app.use(require('./controllers/TreeMap2016'));
app.use(require('./controllers/TreeMap2017'));
app.use(require('./controllers/TreeMap2018'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://wb-somalia-ssr.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: 'https://wb-somalia-ssr.herokuapp.com',
  credentials: true
}));

app.get("/routes", function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/pooled", function(req, res){
  res.json(pooled);
});

app.get("/envelopes", function(req, res){
  res.json(envelopes);
});

app.get("/master", function(req, res){
  res.json(jsonData);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on " + this.address().port );
});
