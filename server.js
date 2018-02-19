var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonData = require("./public/cleaned-master")
var pooled = require("./public/pooled")
var envelopes = require("./public/envelopes")

var TreeMap2016 = require('./controllers/TreeMap2016')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controllers/LocationCounter2016'));
app.use(require('./controllers/LocationCounter2017'));
app.use(require('./controllers/LocationCounter2018'));


app.use(require('./controllers/TreeMap2016'));
app.use(require('./controllers/TreeMap2017'));
app.use(require('./controllers/TreeMap2018'));

app.get("/", function(req, res){
  res.json({"Hello": "World"})
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
