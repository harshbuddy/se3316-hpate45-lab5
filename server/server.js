
var express = require('express');
var mongoose = require("mongoose");

var port = 8081;
const app = express();

app.get('/', function (req, res) {
  res.send("<h1>hello world</h1>");
});

app.listen(port, function(){
    console.log("app listening on port 8081...");
});