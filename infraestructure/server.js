exports.startServer = function(){
	var restify = require('restify')
	var server = restify.createServer({name: 'gami-api'})
	var config = require('../config/enviroments').setUp()
	var PlayerService = require('../model/player/player_service').PlayerService
	var GameService = require('../model/game/game_service').GameService
	var player_service = new PlayerService()
	var game_service = new GameService()

	server
	  .use(restify.fullResponse())
	  .use(restify.bodyParser())

	server.listen(config.server.port, config.server.url,function () {
		console.log('%s listening at %s', server.name, server.url)
	})

	server.post('/player', function (req, res, next) {
		player_service.saveAPlayer({username: req.params.username}, function (error, player){
			if (error){
				res.send(error)
			}
			
			res.send(201, player)
		})
	})

	server.get('/player/:username', function (req, res, next) {
		player_service.findAPlayer({username: req.params.username}, function (error, player){
			if (error){
				res.send(error);
			}
			
			res.send(200, player)
		})
	})

	server.post('/game', function (req, res, next) {
		game_service.saveAGame({name: req.params.name, owner: req.params.owner}, function (error, game){
			if (error){
				res.send(error)
			}
			
			res.send(201, game)
		})
	})

	server.get('/game/:name', function (req, res, next) {
		game_service.findAGame({name: req.params.name}, function (error, game){
			if (error){
				res.send(error);
			}
			
			res.send(200, game)
		})
	})
}