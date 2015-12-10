var express = require("express");
var https = require("https");
var easypost = require("./easypost");
var app = express();
var cors = require("cors");
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client"));

app.post("/api/sender", easypost.create);

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("listening to localhost", host, port);
});