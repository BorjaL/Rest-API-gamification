var gameRepository = require('../../infraestructure/repository');
DuplicateGameNameError = require('../error/duplicate_game_name_error').DuplicateGameNameError;
var url_slug = require('../util/url_slug');

function Game(data){
	this._id = data._id;
	this.name = data.name;
	this.owner = data.owner;
	this.created_at = new Date();
	this.players = [];
	this.actions = data.actions;
	this.url = url_slug(data.name);



	this.save = function(callback){
		var game = this;
		gameRepository.findGameByName({name: this.name}, function (error, game_found){
			if ( error ){ 
				return callback(error); 
			}
			else if (game_found !== null){ 
				return callback( new DuplicateGameNameError('this game already exists')); 
			}
			else {
				gameRepository.saveGame(game.toJson(), function (error, game_saved){
					if ( error ){ 
						return callback(error); 
					}

					return callback(null, game_saved);
				});
			}
		});
	};

	this.addAnAction = function(action_data, callback){
		gameRepository.saveNewGameAction(action_data, function (error, action_saved){
			if ( error ){ 
				return callback(error); 
			}

			return callback(null, action_saved);
		});
	};

	this.addAPlayer = function(user_name, callback){
		this.players.push(user_name);
		gameRepository.updateGamePlayers({name: this.name}, {players: this.players},function (error){
			if ( error ){ 
				return callback(error); 
			}

			return callback(null);
		});
	};

	this.toJson = function(){
		return  {
				_id: this._id, 
				name: 	this.name,
				actions: this.actions,
				created_at: this.created_at,
				url: this.url
			};
	};

	this.defaultAttributes = function (){
		return  {game:{
			name: '',
			actions: [{text:'', points: 1}, {text:'', points: 1}]
		}};
	};
}

exports.Game = Game;