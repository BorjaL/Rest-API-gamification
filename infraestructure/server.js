exports.startServer = function(){
	var restify = require('restify')
	var server = restify.createServer({name: 'gami-api'})
	var config = require('../config/enviroments').setUp()
	var PlayerService = require('../model/player_service').PlayerService
	var playerService = new PlayerService()

	server
	  .use(restify.fullResponse())
	  .use(restify.bodyParser())

	server.listen(config.server.port, config.server.url,function () {
		console.log('%s listening at %s', server.name, server.url)
	})

	server.post('/player', function (req, res, next) {
		playerService.saveAPlayer({username: req.params.username}, function (error, player){
			if (error){
				res.send(error)
			}
			
			res.send(201, player)
		})
	})

	server.put('/player/:id', function (req, res, next) {
		playerService.updateAPlayer({id: req.params.id, username: req.params.username}, function (error, player){
			if (error){
				res.send(error);
			}
			
			res.send(201, player)
		})
	})
}