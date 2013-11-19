var sinon = require('sinon'),
	PlayerService = require('../model/player_service').PlayerService

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
		it('should call to the service', function(done){
			var player_data = {
				username: 'blancuch'
			}

			var spy = sinon.stub(PlayerService.prototype, 'saveAPlayer', function(error, player){
				res.send(201, player)
			})
			http.post('/player', player_data, function(err, req, res, data) {
				
				sinon.assert.calledOnce(spy);
				done()

			})
		})
	})
	describe('update', function(){
		it('should save player blancuch with new name borjal in database', function(done){
			var player_data = {
				username: 'blancuch'
			}
			

			

				done()
				
				
		})
	})
})