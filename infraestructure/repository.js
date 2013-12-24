var mongojs = require('mongojs')

Repository = function() {
	var config = require('../config/enviroments').setUp()
	this.db = mongojs(config.mongodb.url+":"+config.mongodb.port+"/"+config.mongodb.name, ['players','games'])

	this.savePlayer = function(player, callback) {
		this.db.players.save(player, function(error, result) {
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.findPlayer = function(player_username, callback) {
		this.db.players.findOne(player_username, function(error, result){
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.cleanPlayers = function() {
		this.db.players.drop(function(error, replay) {})
	}
}

exports.Repository = Repository