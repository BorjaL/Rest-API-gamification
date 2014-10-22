var gameService = require('../model/game/game_service')

process.env.NODE_ENV = 'test'
/*
describe('Game Service', function(){

		var gameService = new GameService()

		beforeEach(function(done){
			gameService.gameRepository.cleanGames()
			gameService.gameRepository.cleanActions()
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

		describe('find a game', function(){
			it('should get the game data in mongo', function(done){
				var game_data = {
					name: "I will be iron man",
					owner: "Tony Stark"
				}
				gameService.saveAGame(game_data, function(error, game_saved){
					gameService.findAGame({name: "I will be iron man"}, function(error, game_found){
						if (error) console.log(error)
						if(game_saved.name === 'I will be iron man' && game_saved.owner === 'Tony Stark') done()
					})
				})
			})
		})

		describe('save an action', function(){
			it('should save an action in a game collection in mongo', function(done){

				var game_data = {
					name: "I will be iron man",
					owner: "Tony Stark"
				}
				gameService.saveAGame(game_data, function(error, game_saved){
					var action_data = {
						title: "Work in my iron suit",
						game: game_saved._id,
						points: 10
					}
					gameService.saveAnAction(action_data, function(error, action_saved){
						gameService.findAllActionsOfAGame({game: game_saved._id}, function(error, actions_found){
							if (error) console.log(error)
							if (actions_found[0].title === 'Work in my iron suit')
								done()
						})
					})
				})
			})
		})
})*/