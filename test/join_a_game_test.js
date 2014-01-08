var GameService = require('../model/game/game_service').GameService
var PlayerService = require('../model/player/player_service').PlayerService

process.env.NODE_ENV = 'test'

describe('user tries to', function(){

	var gameService = new GameService()
	var playerService = new PlayerService()

	beforeEach(function(done){
		gameService.gameRepository.cleanGames()
		gameService.gameRepository.cleanActions()
		playerService.playerRepository.cleanPlayers()
		done()
	})

	it('join a game and everything ok', function(done){
		var game_data = {
			name: "I will be ironman",
			owner: "Tony Stark"
		}
		var player_data = {
			username: 'Thor'
		}
		var info = {
			player: "Thor",
			game: "I will be ironman"
		}
		playerService.saveAPlayer(player_data, function(error, player_saved){
			console.log(error)
			gameService.saveAGame(game_data, function(error, game_saved){
				gameService.joinToTheGame(info, function(error){
					gameService.findAGame({name: game_data.name}, function(error, game_found){
						if (error) console.log(error)
						if(game_found.players[0].equals(player_saved._id)){
							playerService.findAPlayer(player_data, function(error, player_found){
								if (error) console.log(error)
								if(player_found.games[0].equals(game_saved._id)) done()
							})
						} 
					})
				})
			})
		})
	})
})