GameRepository = require('../../infraestructure/repository').Repository
DuplicateGameNameError = require('../error/duplicate_game_name_error').DuplicateGameNameError

function Game(data){
	this.name = data.name
	this.owner = data.owner
	this.created_at = new Date()
	this.gameRepository = new GameRepository()

	this.save = function(callback){
		var game = this
		this.gameRepository.findGameByName({name: this.name}, function (error, game_found){
			if ( error ) callback(error)
			else if (game_found !== null) callback( new DuplicateGameNameError('this game already exists'))
			else {
				game.gameRepository.saveGame(game.toJson(), function (error, game_saved){
					if ( error ) callback(error)

					callback(null, game_saved)
				})
			}
			
		})
	}

	this.toJson = function(){
		return  {
				name: 	this.name,
				owner: this.owner,
				created_at: this.created_at
			}
	}
}

exports.Game = Game