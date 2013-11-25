//NodeJS Server
var express = require('express')
	, fs = require('fs')
	, io = require('socket.io');

var app = express();
var srv = express.createServer();

app.use(express.static(__dirname + "/../client"));

/*app.get('/',function(req, res){
	res.end('Ciao Mondo');
});*/

//app.get('/v1/events')

app.listen(8080);