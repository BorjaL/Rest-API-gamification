var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var mongodb = require('mongodb')
var config = require('../config/enviroments').setUp()

PlayerRepository = function() {}

PlayerRepository.prototype.getCollection = function(callback) {
	this.db = new Db(config.mongodb.name, new mongodb.Server(config.mongodb.url, config.mongodb.port, {auto_reconnect: true}, {}), {safe: true})
	this.db.open(function(error, client){
		if (error) callback(error)

		var collection = new mongodb.Collection(client, 'players')
		callback(null, collection)
	})
}

PlayerRepository.prototype.save = function(player, callback) {
	
	this.getCollection(function(error, collection){
		collection.insert(player, function(error) {
			if ( error ) callback(error)
			callback(null, player)
		})
	})
}

exports.PlayerRepository = PlayerRepository