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


	db.all(strSql,function(err,rows){

		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(rows) + "\n");

	});

	db.close();
	//return users;
};

exports.create = function(req, res){
	var db = new sqlite.Database('data/datastorage.db',sqlite.OPEN_READWRITE,function(err){

		if (err) {
			console.log('Events.json '+err);
    		var code = (err.code) ? err.code : err.name;
    		res.writeHead(code, { "Content-Type" : "application/json" });
    		res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
		}
	});

	db.run("insert into events (lat,long,desc,dt) values (?,?,?,datetime('now'))",
		[req.body.lat,req.body.long,req.body.desc],
		function(err){
			if (err !== null) {console.log(err)};
			
		});

	res.writeHead(201, {"Content-Type": "application/json"});
	res.end();

	db.close();
};