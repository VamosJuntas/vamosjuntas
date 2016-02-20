var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
  res.send("hello world");
});

app.get('/places', function(req, res){
  fs.readFile('www/stubs/places.json', function(error, data) {
    if(!error) {
      res.send(JSON.parse(data));
    } else {
      res.end();
    }
  });
});

app.listen(3000, function () {});
