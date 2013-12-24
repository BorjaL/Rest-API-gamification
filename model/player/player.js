PlayerRepository = require('../../infraestructure/repository').Repository
DuplicateUsernameError = require('../error/duplicate_username_error').DuplicateUsernameError

function Player(data){
	this.username = data.username
	this.created_at = new Date()
	this.playerRepository = new PlayerRepository()

	this.save = function(callback){
		var player = this
		this.playerRepository.findPlayer({username: this.username}, function (error, player_found){
			if ( error ) callback(error)
			else if (player_found !== null) callback( new DuplicateUsernameError('this username already exists'))
			else {
				player.playerRepository.savePlayer(player.toJson(), function (error, player_saved){
					if ( error ) callback(error)

					callback(null, player_saved)
				})
			}
		})
	}

	this.toJson = function(){
		return  {
				username: 	this.username,
				created_at: this.created_at
			}
	}
}

exports.Player = Player