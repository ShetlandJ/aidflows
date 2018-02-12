var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonData = require("./public/master")
var treeClass = require('./controllers/index')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controllers'));

// app.use(express.static("client/build"));
// app.use(require("./controllers/index"));

app.get("/", function(req, res){
  // res.send(treeMap.returnHello
  // var newData = treeClass.cleanTree(jsonData)
  // res.json(newData);
});

app.listen(3000, function(){
  console.log("listening on " + this.address().port );
});
