var restify = require('restify')
var server = restify.createServer({name: 'gami-api'})

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url)
})

server.get('/user/:id', function (req, res, next) {
	console.log('Someone asks for %s', req.params.id)
	res.send()
})

server.post('/user', function (req, res, next) {
	console.log('Someone wants to create a new user called %s', req.params.username)
	res.send(201)
})

server.put('/user/:id', function (req, res, next) {
	console.log('Someone wants to update to %s', req.params.username)
	res.send()
})

server.del('/user/:id', function (req, res, next) {
	console.log('Someone wants to delete %s', req.params.id)
	res.send()
})
