PlayerRepository = require('../../infraestructure/repository').Repository
var TokenService = require('../token/token_service').TokenService;
Player = require('./player').Player


function PlayerService(){
	this.playerRepository = new PlayerRepository();
	this.tokenService = new TokenService();

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
			service.playerRepository.findPlayerByUsername(token_found.player, function (error, player_found){
				if ( error ) callback(error);
				else if (player_found) callback(null, player_found.token);
				else callback(null, false)
				
			})
		})
	}

	this.logIn = function(username, password, callback){
		var service = this;
		this.playerRepository.findPlayerByUsername(username, function (error, player_found_data){
			if ( error ) callback(error)
			if (player_found_data == null) callback(false)

			var player_found = new Player(player_found_data);

			player_found.verifyPassword(password, function(error, isMatch){
				if (error) callback(error)

				if (isMatch){
					service.tokenService.createToken({player: player_found.username}, function(error, token_saved){
						callback(null, player_found.toJson())
					})
					
				} 
				else callback(null, false)
			});
			
		});
	}
}

exports.PlayerService = PlayerService