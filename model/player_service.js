PlayerRepository = require('../infraestructure/player_repository').PlayerRepository
Player = require('./player').Player

PlayerService = function(){
	this.playerRepository = new PlayerRepository('localhost', 27017)
}

PlayerService.prototype.saveAPlayer = function (player_data, callback){

	var player = new Player(player_data)

	this.playerRepository.save(player.toJson(), function (error, player){
		if ( error ) callback(error)

		callback(null, player)
	})
}

exports.PlayerService = PlayerService