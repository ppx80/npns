//NodeJS Server
var express = require('express')
	, http = require('http')
	, fs = require('fs')
	, io = require('socket.io')
	, config = require('./config.js')
	,sqlite = require('sqlite3');

var app = express();
var server = http.createServer(app);

//app.use(express.logger('dev'));                             // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.static(__dirname + "/../client"));


// Connect to sqlite database
var db = new sqlite.Database('data/datastorage.db',sqlite.OPEN_READWRITE,function(err){

	if (err) {
		console.log('Error during connection to database'+err);
	};
});


// Start up the server on the port specified in the config
// First parameter is the TCP/IP port
// Second parameter is the HOSTNAME. If the hostname is omitted, the server will accept connections directed to any IPv4 address (INADDR_ANY).
// Third arameter is backlog. Backlog is the maximum length of the queue of pending connections. The default value of this parameter is 511
// Callback function
server.listen(config.server.listenPort, '0.0.0.0', 511, function() {
  // // Once the server is listening we automatically open up a browser
  var open = require('open');
  open('http://localhost:' + config.server.listenPort + '/');
});
console.log('NPNS - listening on port: ' + config.server.listenPort);
io.listen(server);