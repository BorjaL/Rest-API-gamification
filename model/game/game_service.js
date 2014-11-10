var game_repository = require('../../infraestructure/repository');
Game = require('./game').Game;

module.exports.form_fields = function(callback){
	var game = new Game({name: ""});

	return callback(null, game.defaultAttributes());
};

module.exports.saveAGame = function(game_data, callback){
	var game = new Game(game_data);

	game.save(function (error, game_saved){
		if ( error ){ 
			return callback(error); 
		}

		return callback(null, game_saved);
	});
};

module.exports.findAGame = function(game_name, callback){
	game_repository.findGameByName(game_name, function (error, game_found){
		if ( error ){ 
			return callback(error); 
		}

		return callback(null, game_found);
	});
};

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

module.exports.joinToTheGame = function(userAndGameInfo, callback){
	var service = this;
	game_repository.findPlayerByUsername({username: userAndGameInfo.player}, function(error, player_found){
		game_repository.findGameByName({name: userAndGameInfo.game}, function(error, game_found){
			var game = new Game(game_found);
			var player = new Player(player_found);
			game.addAPlayer(player._id, function(error){
				player.joinToAGame(game._id, function(error){
					if (error){ 
						return callback(error); 
					}

					return callback(null);
				});
			});
		});
	});
};