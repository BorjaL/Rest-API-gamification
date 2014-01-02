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

	this.findPlayerByUsername = function(player_username, callback) {
		this.db.players.findOne(player_username, function(error, result){
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.cleanPlayers = function() {
		this.db.players.drop(function(error, replay) {})
	}

	this.saveGame = function(game, callback) {
		this.db.games.save(game, function(error, result) {
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.findGameByName = function(game_name, callback) {
		this.db.games.findOne(game_name, function(error, result){
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.updateGameActions = function(game_name, game_actions, callback){
		this.db.games.update(game_name, {$set: game_actions}, function(error, result){
			if ( error ) callback(error)
			callback(null)
		})
	}

	this.updateGamePlayers = function(game_name, game_players, callback){
		this.db.games.update(game_name, {$set: game_players}, function(error, result){
			if ( error ) callback(error)
			callback(null)
		})
	}

	this.cleanGames = function() {
		this.db.games.drop(function(error, replay) {})
	}
}

exports.Repository = Repository