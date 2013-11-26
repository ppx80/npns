//NodeJS Server
var express = require('express')
	, http = require('http')
	, fs = require('fs')
	, io = require('socket.io');

var app = express();
var server = http.createServer(app);

app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.static(__dirname + "/../client"));



server.listen(8080);
io.listen(server);