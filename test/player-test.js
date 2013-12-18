var PlayerService = require('../model/player_service').PlayerService

process.env.NODE_ENV = 'test'

describe('Player Service', function(){

	var playerService = new PlayerService()
	beforeEach(function(done){
		playerService.playerRepository.clean()
		done()
	})

	describe('get a player', function(){
		it('should get the player data in mongo', function(done){
			var player_data = {
				username: 'blancuch'
			}
			playerService.saveAPlayer(player_data, function(error, player_saved){})

			playerService.findAPlayer(player_data, function(error, player_found){
				if (error) console.log(error)
				if(player_found.username == 'blancuch') done()

			})
		})
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