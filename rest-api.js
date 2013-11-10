var server = require('./infraestructure/server')
var PlayerService = require('./model/player_service').PlayerService
var playerService = new PlayerService()

server.get('/player/:id', function (req, res, next) {
	console.log('Someone asks for %s', req.params.id)
	res.send()
})

server.post('/player', function (req, res, next) {
	playerService.saveAPlayer({username: req.params.username}, function (error, player){
		if (error)
			res.send(500)
		
		res.send(201, player)
	})
})

server.put('/player/:id', function (req, res, next) {
	console.log('Someone wants to update to %s', req.params.username)
	res.send()
})

server.del('/player/:id', function (req, res, next) {
	console.log('Someone wants to delete %s', req.params.id)
	res.send()
})

server.get('/game/:id', function (req, res, next) {
	console.log('Someone asks for the game %s', req.params.id)
	res.send()
})

server.post('/game', function (req, res, next) {
	console.log('Someone wants to create a new game called %s', req.params.name)
	res.send(201)
})

server.put('/game/:id', function (req, res, next) {
	console.log('Someone wants to update the game %s', req.params.name)
	res.send()
})

server.del('/game/:id', function (req, res, next) {
	console.log('Someone wants to delete the game %s', req.params.id)
	res.send()
})

server.get('/play/:id', function (req, res, next) {
	console.log('Someone asks for the play %s', req.params.id)
	res.send()
})

server.post('/play', function (req, res, next) {
	console.log('Someone wants to create a new play called %s', req.params.name)
	res.send(201)
})
