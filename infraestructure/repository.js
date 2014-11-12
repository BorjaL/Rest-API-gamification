var mongojs = require('mongojs');

var config = require('../config/enviroments').setUp();
var db = mongojs(config.mongodb.url+":"+config.mongodb.port+"/"+config.mongodb.name, ['players','games','actions', 'activity', 'tokens']);

module.exports.savePlayer = function(player, callback) {
	db.players.save(player, function(error, result) {
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.findPlayerByUsername = function(player_username, callback) {
	db.players.findOne({username: player_username}, function(error, result){
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.cleanPlayers = function() {
	db.players.drop(function(error, replay) {});
};

module.exports.saveGame = function(game, callback) {
	db.games.save(game, function(error, result) {
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

this.findGameByName = function(game_name, callback) {
	db.games.findOne(game_name, function(error, result){
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.findGameById = function(game_id, callback) {
	db.games.findOne(game_id, function(error, result){
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.findAllActionsOfAGame = function(game_id, callback) {
	db.actions.find(game_id, function(error, result){
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.updateGamePlayers = function(game_name, game_players, callback){
	db.games.update(game_name, {$set: game_players}, function(error, result){
		if ( error ){
			return callback(error);
		}

		return callback(null);
	});
};

module.exports.updatePlayerGames = function(user_id, player_games, callback){
	db.games.update(user_id, {$set: player_games}, function(error, result){
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.saveNewGameAction = function(action_data, callback){
	db.actions.save(action_data, function(error, result) {
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.cleanGames = function() {
	db.games.drop(function(error, replay) {});
};

module.exports.cleanActions = function() {
	db.actions.drop(function(error, replay) {});
};

module.exports.saveUserAction = function(checkin_info, callback) {
	db.activity.save(action_data, function(error, result) {
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.db = db;