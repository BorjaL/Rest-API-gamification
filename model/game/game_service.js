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

module.exports.completeAnAction = function(username, game_name, action, callback){

	var action_info = {player: username, action: action.name, points: action.points, date: new Date()}

	game_repository.completeAnAction({name: game_name}, {activity: action_info},function(error, game_info){
		if (error){
			return callback(error);
		}
		 return callback(null, action_info);
	});
};