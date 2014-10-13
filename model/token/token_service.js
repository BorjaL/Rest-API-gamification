TokenRepository = require('../../infraestructure/repository').Repository
Token = require('./token').Token

function TokenService(){

	this.tokenRepository = new TokenRepository()

	this.findAToken = function(token, callback){
		this.playerRepository.findToken(token, function (error, token_found){
			if ( error ) callback(error)

			callback(null, token_found)
		})
	}

	this.createToken = function(token_data, callback){
		var token = new Token(token_data);

		token.save(function (error, token_saved){
			if ( error ) callback(error)

			callback(null, token_saved)
		})
	}

}

exports.TokenService = TokenService