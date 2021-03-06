var mongojs = require('mongojs');

var config = require('../config/enviroments').setUp;
var db = mongojs(config.mongodb.url+":"+config.mongodb.port+"/"+config.mongodb.name, ['players','games','actions', 'activity', 'leads']);

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

this.findGameByOwnerAndUrl = function(username, gamename, callback) {
	db.games.findOne({url: username + '/game/' + gamename}, function(error, result){
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

module.exports.findGamesByPlayer = function(username, callback) {
	db.games.find({ players: { $in: [username]}}, function(error, result){
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

module.exports.saveNewGameAction = function(action_data, callback){
	db.actions.save(action_data, function(error, result) {
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.completeAnAction = function(game, action_completed, callback){
	db.games.update(game, {$push: action_completed},function(error, result) {
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.findAndModifyGame = function(game_url, username, callback){
	db.games.findAndModify({
		query: game_url,
		update: {$push: {players: username}}
	}, function(error, result){
		if ( error ){
			return callback(error);
		}

		return callback(null, result);
	});
};

module.exports.saveNewLead = function(lead_data, callback){
	db.leads.save(lead_data, function(error, result){
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

module.exports.db = db;