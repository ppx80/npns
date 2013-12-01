var sqlite = require('sqlite3');

exports.version = "0.1.0";

function Event(event_data){
	this.id = event_data.id;
    this.latitude = event_data.lat;
    this.longitude = event_data.long;
    this.description = event_data.desc;
    this.date = event_data.dt;
}

Event.prototype.id = null;
Event.prototype.latitude = null;
Event.prototype.longitude = null;
Event.prototype.description = null;
Event.prototype.date = null;
Event.prototype.serialize = function(){
	return {
		latitude : this.latitude,
		longitude : this.longitude,
		description: this.description,
		date: this.date,
		id: this.id
	};
};

exports.events = function(req, res){
	// Connect to sqlite database
	var users = [];
	var db = new sqlite.Database('data/datastorage.db',sqlite.OPEN_READWRITE,function(err){

		if (err) {
			console.log('Events.json '+err);
    		var code = (err.code) ? err.code : err.name;
    		res.writeHead(code, { "Content-Type" : "application/json" });
    		res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
		}
	});
	strSql = "select * from events";

	
	db.each(strSql,function(err, row){
		console.log(row);
		var evn = new Event(row);
		users.push(evn.serialize());

		console.log('Riga fetchata');
	});

	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify(users) + "\n");
	

	db.close();
	//return users;
};