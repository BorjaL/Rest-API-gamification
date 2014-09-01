GameRepository = require('../../infraestructure/repository').Repository
DuplicateGameNameError = require('../error/duplicate_game_name_error').DuplicateGameNameError

function Game(data){
	this._id = data._id
	this.name = data.name
	this.owner = data.owner
	this.created_at = new Date()
	this.players = []
	this.actions = {action: data.action, points: data.points}
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

	this.addAnAction = function(action_data, callback){
		this.gameRepository.saveNewGameAction(action_data, function (error, action_saved){
			if ( error ) callback(error)

			callback(null, action_saved)
		})
	}

	this.addAPlayer = function(user_name, callback){
		this.players.push(user_name)
		this.gameRepository.updateGamePlayers({name: this.name}, {players: this.players},function (error){
			if ( error ) callback(error)

			callback(null)
		})
	}

	this.toJson = function(){
		return  {
				_id: this._id, 
				name: 	this.name,
				owner: this.owner,
				actions: this.actions,
				created_at: this.created_at
			}
	}
}

exports.Game = Game