/**
* Push Event Point Server
* Node Push to client a point of new event
*/

var socketio = require('socket.io');
var io;
var guestNumber = 1;

exports.listen = function(server){
	io = socketio.listen(server);
	io.set('log level',1);

	io.sockets.on('connection', funtion(socket){

		console.log('Client connected');

		//Implement a handler for event point emit notification 
		//Refere to page 33 of book
	});
}