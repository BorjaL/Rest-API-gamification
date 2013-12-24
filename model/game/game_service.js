GameRepository = require('../../infraestructure/repository').Repository
Player = require('./player').Player

function GameService(){
	this.gameRepository = new GameRepository()

	this.saveAGame = function(game_data, callback){
		var game = new Game(player_data)

		game.save(function (error, game_saved){
			if ( error ) callback(error)

			callback(null, game_saved)
		})
	}
}

exports.GameService = GameService