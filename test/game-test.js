var GameService = require('../model/game/game_service').GameService

process.env.NODE_ENV = 'test'

describe('Game Service', function(){

		var gameService = new GameService()

		beforeEach(function(done){
			gameService.gameRepository.cleanGames()
			done()
		})



		describe('save a game', function(){
			it('should save the game data in mongo', function(done){
				var game_data = {
					name: "I will be iron man",
					owner: "Tony Stark"
				}
				gameService.saveAGame(game_data, function(error, game_saved){
					if (error) console.log(error)
					if(game_saved.name == 'I will be iron man' && game_saved.owner == 'Tony Stark') done()

				})
			})

			it('should get the game data in mongo', function(done){
				var game_data = {
					name: "I will be iron man",
					owner: "Tony Stark"
				}
				gameService.saveAGame(game_data, function(error, game_saved){
					gameService.findAGame(game_data, function(error, game_found){
						if (error) console.log(error)
						if(game_saved.name == 'I will be iron man' && game_saved.owner == 'Tony Stark') done()
					})
				})
			})

			it('should get an error because the game already exists', function(done){
				var game_data = {
					name: "I will be iron man",
					owner: "Tony Stark"
				}
				gameService.saveAGame(game_data, function(error, game_saved){
					gameService.saveAGame(game_data, function(error, game_saved){
						if (error instanceof DuplicateGameNameError){
							done()
						}
					})
				})
			})
		})
})