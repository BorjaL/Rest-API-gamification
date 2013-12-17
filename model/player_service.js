PlayerRepository = require('../infraestructure/player_repository').PlayerRepository
Player = require('./player').Player

function PlayerService(){
	this.playerRepository = new PlayerRepository()

	this.saveAPlayer = function(player_data, callback){
		var player = new Player(player_data)

		this.playerRepository.save(player.toJson(), function (error, player_saved){
			if ( error ) callback(error)

			callback(null, player_saved)
		})
	}
}

PlayerService.prototype.findAPlayer = function (player_data, callback){

	var player = new Player(player_data)

	this.playerRepository.find(player.toJson(), function (error, player_saved){
		if ( error ) callback(error)

		callback(null, player_saved)
	})
}

exports.PlayerService = PlayerService