/**
* Push Event Point Server
* Node Push to client a point of new event
*/

var socketio = require('socket.io'),
	io,
	connectionArray = [];


exports.listen = function(server){
	io = socketio.listen(server);
	//io.set('log level',1);

	io.sockets.on('connection', function (socket){
		
		_guestManager(connectionArray,true,socket);

		//Implement a handler for event point emit notification 
		//Refere to page 33 of book


		socket.on('disconnect', function () {
			console.log('Client disconnect from web socket');
	        _guestManager(connectionArray,false, socket);
	    });
	});
};


function _guestManager(connectionArray,conn, socket){

	var connectionNumber = connectionArray.length;
	console.log(connectionNumber);
	var messages = "New client connected";
	if (conn) {

		connectionArray.push(socket);
		connectionNumber++;
	}
	else
	{
		var socketIndex = connectionArray.indexOf(socket);
		if (socketIndex >= 0) {
			connectionArray.splice( socketIndex, 1 );
		};
		connectionNumber--;
		messages = "Client disconnected";
	}

	connectionArray.forEach(function ( tmpSocket ){
		console.log('appconn notification from socket: '+tmpSocket.id);
		tmpSocket.volatile.emit('appconn',{ connections: connectionNumber, msg: messages });
	});
	
};