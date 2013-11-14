PlayerRepository = require('../infraestructure/player_repository').PlayerRepository
Player = require('./player').Player

PlayerService = function(){
	this.playerRepository = new PlayerRepository()
}

PlayerService.prototype.saveAPlayer = function (player_data, callback){

	var player = new Player(player_data)

	this.playerRepository.save(player.toJson(), function (error, data_player){
		if ( error ) callback(error)

		callback(null, data_player)
	})
}

exports.PlayerService = PlayerService