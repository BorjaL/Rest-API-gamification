var mongojs = require('mongojs')

var config = require('../config/enviroments').setUp()
this.db = mongojs(config.mongodb.url+":"+config.mongodb.port+"/"+config.mongodb.name, ['players','games','actions', 'activity', 'tokens'])

module.exports.savePlayer = function(player, callback) {
	this.db.players.save(player, function(error, result) {
		if ( error ) callback(error)
		callback(null, result)
	})
}

module.exports.findPlayerByUsername = function(player_username, callback) {
	this.db.players.findOne({username: player_username}, function(error, result){
		if ( error ) callback(error)
		callback(null, result)
	})
}

module.exports.cleanPlayers = function() {
	this.db.players.drop(function(error, replay) {})
}

module.exports.saveGame = function(game, callback) {
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

module.exports.findGameById = function(game_id, callback) {
	this.db.games.findOne(game_id, function(error, result){
		if ( error ) callback(error)
		callback(null, result)
	})
}

module.exports.findAllActionsOfAGame = function(game_id, callback) {
	this.db.actions.find(game_id, function(error, result){
		if ( error ) callback(error)
		callback(null, result)
	})
}

module.exports.updateGamePlayers = function(game_name, game_players, callback){
	this.db.games.update(game_name, {$set: game_players}, function(error, result){
		if ( error ) callback(error)
		callback(null)
	})
}

module.exports.updatePlayerGames = function(user_id, player_games, callback){
	this.db.games.update(user_id, {$set: player_games}, function(error, result){
		if ( error ) callback(error)
		callback(null)
	})
}

module.exports.saveNewGameAction = function(action_data, callback){
	this.db.actions.save(action_data, function(error, result) {
		if ( error ) callback(error)
		callback(null, result)
	})
}

module.exports.cleanGames = function() {
	this.db.games.drop(function(error, replay) {})
}

module.exports.cleanActions = function() {
	this.db.actions.drop(function(error, replay) {})
}

module.exports.saveUserAction = function(checkin_info, callback) {
	this.db.activity.save(action_data, function(error, result) {
		if ( error ) callback(error)
		callback(null, result)
	})
}