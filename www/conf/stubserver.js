var express = require('express');
var fs = require('fs');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send("hello world");
});

app.get('/risks-around', function(req, res){
  fs.readFile('www/stubs/places.json', function(error, data) {
    if(!error) {
      res.send(JSON.parse(data));
    } else {
      res.end();
    }
  });
});

app.listen(3000, function () {});
