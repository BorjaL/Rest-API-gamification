var sinon = require('sinon'),
	PlayerService = require('../model/player_service').PlayerService

var http

process.env.NODE_ENV = 'test'

describe('Player Service', function(){

	var playerService = new PlayerService()
	beforeEach(function(done){
		playerService.playerRepository.clean()
		done()
	})
	describe('save a player', function(){
		it('should save the player data in mongo', function(done){
			var player_data = {
				username: 'blancuch'
			}

			playerService.saveAPlayer(player_data, function(error, player_saved){
				if (error) console.log(error)
				if(player_saved.username == 'blancuch') done()

			})
		})
	})
})