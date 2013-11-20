//NodeJS Server
var express = require('express');
var app = express();

app.get('/',function(req, res){
	res.end('Ciao Mondo');
});

app.listen(8080);