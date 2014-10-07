var mongojs = require('mongojs')

Repository = function() {
	var config = require('../config/enviroments').setUp()
	this.db = mongojs(config.mongodb.url+":"+config.mongodb.port+"/"+config.mongodb.name, ['players','games','actions', 'activity'])

	this.savePlayer = function(player, callback) {
		this.db.players.save(player, function(error, result) {
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.findPlayerByUsername = function(player_username, callback) {
		this.db.players.findOne({username: player_username}, function(error, result){
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

	this.findGameById = function(game_id, callback) {
		this.db.games.findOne(game_id, function(error, result){
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.findAllActionsOfAGame = function(game_id, callback) {
		this.db.actions.find(game_id, function(error, result){
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.updateGamePlayers = function(game_name, game_players, callback){
		this.db.games.update(game_name, {$set: game_players}, function(error, result){
			if ( error ) callback(error)
			callback(null)
		})
	}

	this.updatePlayerGames = function(user_id, player_games, callback){
		this.db.games.update(user_id, {$set: player_games}, function(error, result){
			if ( error ) callback(error)
			callback(null)
		})
	}

	this.saveNewGameAction = function(action_data, callback){
		this.db.actions.save(action_data, function(error, result) {
			if ( error ) callback(error)
			callback(null, result)
		})
	}

	this.cleanGames = function() {
		this.db.games.drop(function(error, replay) {})
	}

	this.cleanActions = function() {
		this.db.actions.drop(function(error, replay) {})
	}

	this.saveUserAction = function(checkin_info, callback) {
		this.db.activity.save(action_data, function(error, result) {
			if ( error ) callback(error)
			callback(null, result)
		})
	}
}

exports.Repository = Repository