var sinon = require('sinon'),
	PlayerService = require('../model/player_service').PlayerService

var http = require('restify').createJsonClient({
    version: '*',
    url: 'http://dev.gamification.com:3001'
});

process.env.NODE_ENV = 'test'

describe('Player server side', function(){
	before(function(done){
		var server = require ('../infraestructure/server')
		server.startServer()
		done()
	})
	describe('create', function(){
		it('should call to the method saveAPlayer in the player service', function(done){
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
		it('should call to the method findAPlayer in the player service', function(done){
			var spy = sinon.stub(PlayerService.prototype, 'findAPlayer', function(error, player){
				res.send(200, player)
			})
			
			http.get('/player/blancuch', function(err, req, res, data) {
				
				sinon.assert.calledOnce(spy);
				done()

			})		
		})
	})
})