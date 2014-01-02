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
			var action_data = {
				title: "Work in my iron suit",
				game: "I will be iron man",
				points: 10
			}
			var game_data = {
				name: "I will be iron man",
				owner: "Tony Stark"
			}

			it('should save an action in a game collection in mongo', function(done){
				gameService.saveAGame(game_data, function(error, game_saved){
					gameService.saveAnAction(action_data, function(error, action_saved){
						gameService.findAGame({name: game_data.name}, function(error, game_found){
							if (error) console.log(error)
							if(game_found.actions[0].title === 'Work in my iron suit' && game_found.actions[0].points === 10) done()
						})
					})
				})
			})
		})

		describe('user interact', function(){
			it('join a game', function(done){
				var game_data = {
					name: "I will be iron man",
					owner: "Tony Stark"
				}
				var info = {
					player: "Thor",
					game: "I will be iron man"
				}
				gameService.saveAGame(game_data, function(error, game_saved){
					gameService.joinToTheGame(info, function(error){
						gameService.findAGame({name: game_data.name}, function(error, game_found){
							if (error) console.log(error)
							if(game_found.players.indexOf('Thor') !== -1) done()
						})
					})
				})
			})
		})
})