var restify = require('restify')
var server = restify.createServer({name: 'gami-api'})

server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url)
})

server.get('/user/:username', function (req, res, next) {
	console.log('Someone asks for %s', req.params.username)
	res.send()
})

server.post('/user', function (req, res, next) {
	console.log('Someone wants to create a new user called %s', req.params.username)
	res.send()
})
