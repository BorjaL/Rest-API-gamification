var http = require('restify').createJsonClient({
    version: '*',
    url: 'http://dev.gamification.com:3001'
});

process.env.NODE_ENV = 'test'

describe('Player', function(){
	before(function(done){
		var server = require ('../infraestructure/server')
		server.startServer()
		done()
	})
	describe('create', function(){
		it('should save player blancuch in database', function(done){
			var player_data = {
				username: 'blancuch'
			}
			http.post('/player', player_data, function(err, req, res, data) {
				
				if (data.username === 'blancuch') done()

				
			})
		})
	})
})