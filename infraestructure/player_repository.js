var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server
var config = require('../config/enviroments').setUp()

PlayerRepository = function(host, port) {
	this.db = new Db(config.mongodb.name, new Server(config.mongodb.url, config.mongodb.port, {safe: true}, {auto_reconnect: true}, {}))
	this.db.open(function(){})
}

PlayerRepository.prototype.getCollection = function(callback) {
	this.db.collection('players', function(error, players_collection) {
		if( error ) callback(error)

		callback(null, players_collection)
	})
}

PlayerRepository.prototype.save = function(player, callback) {
    this.getCollection(function(error, players_collection) {
    	if ( error ) callback(error)

    	players_collection.insert(player, function(error) {
    		if ( error ) callback(error)
    			
    		callback(null, player)
    	})
	})
}

exports.PlayerRepository = PlayerRepository