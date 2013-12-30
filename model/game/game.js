GameRepository = require('../../infraestructure/repository').Repository

function Game(data){
	this.name = data.name
	this.owner = data.owner
	this.created_at = new Date()
	this.gameRepository = new GameRepository()

	this.save = function(callback){

		this.gameRepository.saveGame(this.toJson(), function (error, game_saved){
			if ( error ) callback(error)

			callback(null, game_saved)
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