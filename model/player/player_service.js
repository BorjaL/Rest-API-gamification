PlayerRepository = require('../../infraestructure/repository').Repository
Player = require('./player').Player


function PlayerService(){
	this.playerRepository = new PlayerRepository();

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
		var service = this;
		this.tokenService.findAToken(token, function (error, token_found){

			if ( error ) callback(error)
			else if (!token_found) callback(null, false)

			service.playerRepository.findPlayerByUsername(token_found.player, function (error, player_found){
				if ( error ) callback(error);
				else if (player_found) callback(null, token_found.value);
				else callback(null, false)
				
			})
		})
	}

	this.logIn = function(username, password, callback){
		this.playerRepository.findPlayerByUsername(username, function (error, player_found_data){
			
			if ( error ) callback(error)
			if (player_found_data == null) callback(false)

			var player_found = new Player(player_found_data);

			player_found.verifyPassword(password, function(error, isMatch){
				if (error) callback(error)

				if (isMatch){
					callback(null, player_found.username)
				} 
				else callback(null, false)
			});
			
		});
	}
}

exports.PlayerService = PlayerService