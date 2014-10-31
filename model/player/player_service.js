var player_repository = require('../../infraestructure/repository')
var player_factory = require('./player_factory')


module.exports.form_fields = function(callback){
	var player = player_factory.getPlayerObjectWith({});

	callback(null, player.defaultAttributes())
}

module.exports.saveAPlayer = function(player_data, callback){
	var player = player_factory.getPlayerObjectWith(player_data);

	player.save(function (error, player_saved){
		if ( error ) callback(error)

		callback(null, player_saved)
	})
}

module.exports.findAPlayer = function(player_username, callback){
	player_repository.findPlayerByUsername(player_username, function (error, player_found){
		if ( error ) callback(error)

		callback(null, player_found)
	})
}

module.exports.logIn = function(username, password, callback){
	player_repository.findPlayerByUsername(username, function (error, player_found_data){
		if ( error ) callback(error)
		if (player_found_data == null) callback(false)

		var player_found = player_factory.getPlayerObjectWith(player_found_data);

		player_found.verifyPassword(password, function(error, isMatch){
			if (error) callback(error)
			if (isMatch){
				callback(null, player_found.username)
			} 
			else callback(null, false)
		});
		
	});
}

module.exports.player_factory = player_factory;
module.exports.player_repository = player_repository;