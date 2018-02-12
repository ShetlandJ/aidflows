var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var treeMap = require("./public/master")
console.log(treeMap);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("client/build"));
// app.use(require("./controllers/index"));

app.get("/", function(req, res){
  res.json(treeMap);
});

app.listen(3000, function(){
  console.log("listening on " + this.address().port );
});
