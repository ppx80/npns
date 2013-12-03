//NodeJS Server
var express = require('express')
	, http = require('http')
	, fs = require('fs')
	, io = require('socket.io')
	, config = require('./config.js')
	,eventsHandler = require('./handlers/events.js')
	,connectionsArray = [];

var app = express();
var server = http.createServer(app);

app.use(express.logger('dev'));                             // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.static(__dirname + "/../client"));


app.get('/v1/events.json',eventsHandler.events);
app.post('/v1/event',eventsHandler.create);
// Start up the server on the port specified in the config
// First parameter is the TCP/IP port
// Second parameter is the HOSTNAME. If the hostname is omitted, the server will accept connections directed to any IPv4 address (INADDR_ANY)
// Third arameter is backlog. Backlog is the maximum length of the queue of pending connections. The default value of this parameter is 511
// Callback function
server.listen(config.server.listenPort, '0.0.0.0', 511, function() {
  // // Once the server is listening we automatically open up a browser
  var open = require('open');
  open('http://localhost:' + config.server.listenPort + '/');
});

console.log('NPNS - listening on port: ' + config.server.listenPort);
var npns = io.listen(server);

npns.sockets.on( 'connection', function ( socket ) {
    
    console.log('Number of connections:' + connectionsArray.length);
    // start the polling loop only if at least there is one user connected
    //if (!connectionsArray.length) {
    //    pollingLoop();
    //}
    
    socket.on('disconnect', function () {
        var socketIndex = connectionsArray.indexOf( socket );
        console.log('socket = ' + socketIndex + ' disconnected');
        if (socketIndex >= 0) {
            connectionsArray.splice( socketIndex, 1 );
        }
    });

    console.log( 'A new socket is connected!' );
    connectionsArray.push( socket );
    
});