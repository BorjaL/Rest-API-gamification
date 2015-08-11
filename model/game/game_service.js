var game_repository = require('../../infraestructure/repository');
Game = require('./game').Game;

module.exports.saveAGame = function(game_data, callback){
	var game = new Game(game_data);

	game.save(function (error, game_saved){
		if ( error ){ 
			return callback(error); 
		}

		return callback(null, game_saved);
	});
};

module.exports.findAGame = function(username, gamename, callback){
	game_repository.findGameByOwnerAndUrl(username, gamename, function (error, game_found){
		if ( error ){ 
			return callback(error); 
		}

		return callback(null, game_found);
	});
};

module.exports.userPlaysInTheGame = function(username, game, callback){
	if (game.players.indexOf(username) !== -1){
		callback(null, true);
	}
	else{
		callback(null, false);
	}
}

module.exports.findAllGamesByPlayer = function(username, callback){
	game_repository.findGamesByPlayer(username, function (error, list_of_games){
		if (error){
			callback(error);
		}
		else{
			callback(null, list_of_games);
		}
	});
}

module.exports.saveAnAction = function(action_data, callback){
	game_repository.findGameById({_id: action_data.game}, function (error, game_found){
		var game = new Game(game_found);
		game.addAnAction(action_data, function(error){
			if (error){ 
				return callback(error); 
			}

			return callback(null);
		});
	});
};

module.exports.findAllActionsOfAGame = function(game_id, callback){
	game_repository.findAllActionsOfAGame(game_id, function (error, actions_found){
		if (error){ 
			return callback(error); 
		}

		return callback(null, actions_found);
	});
};

module.exports.completeAnAction = function(username, game, action, callback){
	game_repository.completeAnAction({name: game}, {activity: {player: username, action: action, date: new Date()}},function(error, game_found){
		if (error){
			return callback(error);
		}
		 return callback(null);
	});
};