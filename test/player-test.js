var PlayerService = require('../model/player/player_service').PlayerService

process.env.NODE_ENV = 'test'

describe('Player Service', function(){

	var playerService = new PlayerService()

	beforeEach(function(done){
		playerService.playerRepository.cleanPlayers()
		done()
	})

	after(function(done){
		playerService.playerRepository.cleanPlayers()
		done()
	})

	describe('get a player', function(){
		it('should get the player data in mongo', function(done){
			var player_data = {
				username: 'Tony Stark'
			}
			playerService.saveAPlayer(player_data, function(error, player_saved){
				playerService.findAPlayer(player_data, function(error, player_found){
					if (error) console.log(error)
					if(player_found.username == 'Tony Stark') done()
				})
			})
		})

		it('null if there is no result', function(done){
			var player_data = {
				username: 'Tony Stark'
			}
			playerService.findAPlayer(player_data, function(error, player_found){
				if (error) console.log(error)

				if(player_found === null) done()
			})
		})
	})

	describe('save a player', function(){
		it('should save the player data in mongo', function(done){
			var player_data = {
				username: 'Tony Stark'
			}

			playerService.saveAPlayer(player_data, function(error, player_saved){
				if (error) console.log(error)
				if(player_saved.username == 'Tony Stark') done()

			})
		})

		it('should give us an error about username duplicated', function(done){
			var player_data = {
				username: 'Tony Stark'
			}

			playerService.saveAPlayer(player_data, function(error, player_saved){
				playerService.saveAPlayer(player_data, function(error, player_saved){
					if (error instanceof DuplicateUsernameError){
						done()
					} 
				})
			})
		})
	})
})