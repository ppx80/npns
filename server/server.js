//NodeJS Server
var express = require('express'),
	fs = require('fs');

var app = express();
app.use(express.static(__dirname + "/../client"));

app.get('/',function(req, res){
	res.end('Ciao Mondo');
});

app.listen(8080);