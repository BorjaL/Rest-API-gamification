var restify = require('restify')
var server = restify.createServer({name: 'gami-api'})
var config = require('../config/enviroments').setUp()

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

server.listen(config.server.port, config.server.url,function () {
	console.log('%s listening at %s', server.name, server.url)
})

exports = module.exports = server