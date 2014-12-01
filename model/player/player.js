DuplicateUsernameError = require('../error/duplicate_username_error').DuplicateUsernameError;
var bcrypt = require('bcrypt-nodejs');

function Player(data){
	this._id = data._id;
	this.username = data.username;
	this.password = data.password;
	this.email = data.email;
	this.created_at = new Date();
	this.games = [];
	this.token = '';
	this.repository = data.repository;

	this.encryptAndSave = function(password, callback){
		var player = this;
		this.encryptPassword(password, function(error, hash){
			
			if (error){ 
				return callback(error); 
			}
			
			this.password = hash;
			this.repository.savePlayer(this.toJson(), function (error, player_saved){
				if ( error ){ 
					return callback(error); 
				}

				return callback(null, player_saved);
			});
		}.bind(this));
	};

	this.save = function(callback){
		this.repository.findPlayerByUsername(this.username, function (error, player_found){
			
			if ( error ){ 
				return callback(error); 
			}
			else if (player_found !== null){ 
				return callback( new DuplicateUsernameError('this username already exists')); 
			}
			else {
				this.encryptAndSave(this.password, callback);
			}
		}.bind(this));
	};

	this.joinToAGame = function(game_id, callback){
		this.games.push(game_id);
		player_repository.updatePlayerGames({_id: this._id}, {games: this.games},function (error){
			if ( error ){ 
				return callback(error); 
			}

			return callback(null);
		});
	};

	this.completeAnAction = function(game_info, callback){
		player_repository.saveUserAction({player_id: this._id, 
							game_id: game_info.game_id,
							action_id: game_info.action_id},function (error, result){
			
			if ( error ){ 
				return callback(error); 
			}

			return callback(null, result);
		});
	};

	this.toJson = function(){
		return  {
				username: this.username,
				password: this.password,
				email: this.email, 
				created_at: this.created_at
			};
	};

	this.defaultAttributes = function(){
		return  {player:{
			username: '',
			password: '',
			email: ''
		}};
	};

	this.encryptPassword = function(password, callback){
		bcrypt.genSalt(5, function(error, salt) {
    		if ( error ){ callback(error); }

    		bcrypt.hash(password, salt, null, function(error, hash) {
      			if ( error ){ 
      				return callback(error); 
      			}

      			return callback(null, hash);
    		});
  		});
	};

	this.verifyPassword = function(password, callback) {
  		bcrypt.compare(password, this.password, function(error, isMatch) {
    		if ( error ){ 
    			return callback(error); 
    		}

    		return callback(null, isMatch);
  		});
	};

}

exports.Player = Player;