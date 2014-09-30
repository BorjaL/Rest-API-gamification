GameRepository = require('../../infraestructure/repository').Repository
Game = require('./game').Game

function GameService(){
	this.gameRepository = new GameRepository()

	this.form_fields = function(callback){
		var game = new Game({name: ""})

		callback(null, game.defaultAttributes())
	}

	this.saveAGame = function(game_data, callback){
		var game = new Game(game_data)

		game.save(function (error, game_saved){
			if ( error ) callback(error)

			callback(null, game_saved)
		})
	}

	this.findAGame = function(game_name, callback){
		this.gameRepository.findGameByName(game_name, function (error, game_found){
			if ( error ) callback(error)

			callback(null, game_found)
		})
	}

	this.saveAnAction = function(action_data, callback){
		this.gameRepository.findGameById({_id: action_data.game}, function (error, game_found){
			var game = new Game(game_found)
			game.addAnAction(action_data, function(error){
				if (error) callback(error)

				callback(null)
			})
		})
	}

	this.findAllActionsOfAGame = function(game_id, callback){
		this.gameRepository.findAllActionsOfAGame(game_id, function (error, actions_found){
			if (error) callback(error)

			callback(null, actions_found)
		})
	}

	this.joinToTheGame = function(userAndGameInfo, callback){
		var service = this
		service.gameRepository.findPlayerByUsername({username: userAndGameInfo.player}, function(error, player_found){
			service.gameRepository.findGameByName({name: userAndGameInfo.game}, function(error, game_found){
				var game = new Game(game_found)
				var player = new Player(player_found)
				game.addAPlayer(player._id, function(error){
					player.joinToAGame(game._id, function(error){
						if (error) callback(error)

						callback(null)
					})
				})
			})
		})
		
	}
}

exports.GameService = GameService