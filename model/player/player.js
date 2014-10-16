playerRepository = require('../../infraestructure/repository')
DuplicateUsernameError = require('../error/duplicate_username_error').DuplicateUsernameError
var bcrypt = require('bcrypt-nodejs');

function Player(data){
	this._id = data._id
	this.username = data.username
	this.password = data.password
	this.email = data.email
	this.created_at = new Date()
	this.games = []
	this.token = ''

	this.save = function(callback){
		var player = this
		playerRepository.findPlayerByUsername(this.username, function (error, player_found){
			if ( error ) callback(error)
			else if (player_found !== null) callback( new DuplicateUsernameError('this username already exists'))
			else {
				player.encryptPassword(player.password, function(error, hash){
					if (error) callback(error)

					player.password = hash;
					playerRepository.savePlayer(player.toJson(), function (error, player_saved){
						if ( error ) callback(error)

						callback(null, player_saved)
					});
				});
			}
		})
	}

	this.joinToAGame = function(game_id, callback){
		this.games.push(game_id)
		playerRepository.updatePlayerGames({_id: this._id}, {games: this.games},function (error){
			if ( error ) callback(error)

			callback(null)
		})
	}

	this.completeAnAction = function(game_info, callback){
		playerRepository.saveUserAction({player_id: this._id, 
							game_id: game_info.game_id,
							action_id: game_info.action_id},function (error, result){
			
			if ( error ) callback(error);

			callback(null, result);
		})
	}

	this.toJson = function(){
		return  {
				username: this.username,
				password: this.password,
				email: this.email, 
				created_at: this.created_at
			}
	}

	this.defaultAttributes = function(){
		return  {player:{
			username: '',
			password: '',
			email: ''
		}}
	}

	this.encryptPassword = function(password, callback){
		bcrypt.genSalt(5, function(err, salt) {
    		if (err) return callback(err);

    		bcrypt.hash(password, salt, null, function(err, hash) {
      			if (err) return callback(err);
      			callback(null, hash);
    		});
  		});
	}

	this.verifyPassword = function(password, callback) {
  		bcrypt.compare(password, this.password, function(err, isMatch) {
    		if (err) return callback(err);
    		callback(null, isMatch);
  	});
};

}

exports.Player = Player