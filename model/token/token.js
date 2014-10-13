TokenRepository = require('../../infraestructure/repository').Repository
var suid = require('rand-token').suid;

function Token(data){
	this.value = suid(16);
	this.player = data.player;
	this.created_at = Date.now();
	this.tokenRepository = new TokenRepository()

	this.save = function(callback){

		var token = this
		this.tokenRepository.findTokenByPlayer({player: this.player}, function (error, token_found){
			if ( error ) callback(error)
			else if (token_found !== null) callback(null, token_found)
			else {
				token.tokenRepository.saveToken(token.toJson(), function (error, token_saved){
					if ( error ) callback(error)

					callback(null, token_saved)
				})
			}
			
		})
	}

	this.toJson = function(){
		return  {
				value: 	this.value,
				player: this.player,
				created_at: this.created_at
			}
	}
}

exports.Token = Token