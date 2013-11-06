var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server

UserRepository = function(host, port) {
  this.db = new Db('gamification', new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {}))
  this.db.open(function(){})
}

UserRepository.prototype.getCollection= function(callback) {
	this.db.collection('players', function(error, players_collection) {
    if( error ) callback(error)
    else callback(null, players_collection)
  });
};

UserRepository.prototype.save = function(players, callback) {
    this.getCollection(function(error, players_collection) {
      if( error ) callback(error)
      else {
        if( typeof(players.length) === "undefined" )
          players = [players];

        for( var i =0;i< players.length;i++ ) {
          player = players[i];
          player.created_at = new Date();
        }

        players_collection.insert(players, function() {
          callback(null, players);
        });
      }
    });
};

exports.UserRepository = UserRepository