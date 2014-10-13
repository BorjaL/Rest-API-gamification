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

	this.logIn = function(username, password, callback){
		this.playerRepository.findPlayerByUsername(username, function (error, player_found_data){
			if ( error ) callback(error)
			if (player_found_data == null) callback(false)

			var player_found = new Player(player_found_data);

			player_found.verifyPassword(password, function(error, isMatch){
				if (error) callback(error)

				if (isMatch) callback(null, player_found.toJson())
				else callback(null, false)
			});
			
		});
	}
}

exports.PlayerService = PlayerService