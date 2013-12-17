var mongojs = require('mongojs')

PlayerRepository = function() {
	var config = require('../config/enviroments').setUp()
	this.db = mongojs(config.mongodb.url+":"+config.mongodb.port+"/"+config.mongodb.name, ['players'])
}

PlayerRepository.prototype.save = function(player, callback) {
	this.db.players.save(player, function(error, result) {
		if ( error ) callback(error)
		callback(null, result)
	})
}

PlayerRepository.prototype.clean = function() {
	
	this.db.players.drop(function(error, replay) {})
}

exports.PlayerRepository = PlayerRepository