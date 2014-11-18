var player_repository = require('../../infraestructure/repository');
var player_factory = require('./player_factory');


module.exports.form_fields = function(callback){
	var player = player_factory.getPlayerObjectWith({repository: player_repository});

	return callback(null, player.defaultAttributes());
};

module.exports.saveAPlayer = function(player_data, callback){
	var player = player_factory.getPlayerObjectWith(player_data + {repository: player_repository});

	player.save(function (error, player_saved){
		if ( error ){ 
			return callback(error); 
		}

		return callback(null, player_saved);
	});
};

module.exports.findAPlayer = function(player_username, callback){
	player_repository.findPlayerByUsername(player_username, function (error, player_found){
		if ( error ){ 
			return callback(error); 
		}

		return callback(null, player_found);
	});
};

module.exports.logIn = function(username, password, callback){
	player_repository.findPlayerByUsername(username, function (error, player_found_data){
		if ( error ){ 
			return callback(error); 
		}
		if (player_found_data == null){ 
			return callback(false); 
		}

		player_found_data.repository =  player_repository
		var player_found = player_factory.getPlayerObjectWith(player_found_data);

		player_found.verifyPassword(password, function(error, isMatch){
			if (error){ 
				return callback(error); 
			}
			if (isMatch){
				return callback(null, player_found.username);
			} 
			else{ 
				return callback(null, false); 
			}
		});
		
	});
};

module.exports.player_factory = player_factory;
module.exports.player_repository = player_repository;