PlayerRepository = require('../../infraestructure/repository').Repository
Player = require('./player').Player
var suid = require('rand-token').suid;

function PlayerService(){
	this.playerRepository = new PlayerRepository()

	this.form_fields = function(callback){
		var player = new Player({})

		callback(null, player.defaultAttributes())
	}

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

	this.findAPlayerByToken = function(token, callback){
		callback(null, {});
	}

	this.log_in = function(params, callback){
		this.playerRepository.findPlayerByUsername(params.username, function (error, player_found_data){
			if ( error ) callback(error)
			if (player_found_data == null) callback({message: "Wrong credentials"})

			var player_found = new Player(player_found_data);

			player_found.verifyPassword(params.password, function(error, isMatch){
				if (error) callback(error)

				if (isMatch) callback(null, player_found)
				else callback({message: "Wrong credentials"})
			});
			
		});
	}
}

exports.PlayerService = PlayerService