PlayerRepository = require('../infraestructure/player_repository').PlayerRepository

function Player(data){
	this.username = data.username
	this.created_at = new Date()
	this.playerRepository = new PlayerRepository()

	this.save = function(callback){
		var player = this
		this.playerRepository.find({username: this.username}, function (error, player_found){
			if ( error ) callback(error)
			else if (player_found !== null) callback( new Error('this username already exists'))
			else {
				player.playerRepository.save(player.toJson(), function (error, player_saved){
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