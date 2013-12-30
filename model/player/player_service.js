PlayerRepository = require('../../infraestructure/repository').Repository
Player = require('./player').Player

function PlayerService(){
	this.playerRepository = new PlayerRepository()

	this.saveAPlayer = function(player_data, callback){
		var player = new Player(player_data)

		player.save(function (error, player_saved){
			if ( error ) callback(error)

			callback(null, player_saved)
		})
	}

	this.findAPlayer = function(player_username, callback){
		this.playerRepository.findPlayerByUsername(player_username, function (error, player_found){
			if ( error ) callback(error)

			callback(null, player_found)
		})

	}
}

exports.PlayerService = PlayerService