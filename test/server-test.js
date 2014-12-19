var assert = require('assert');
var sinon = require('sinon');
var client = require('restify').createJsonClient({
    version: '*',
    url: 'http://dev.gamification.com:3001'
});
var game_service = require('../model/game/game_service');

process.env.NODE_ENV = 'test';
require('../infraestructure/server').startServer();

describe('Server', function(){

	it('save a new game', function(done){

		//given:
        var data = {game: true};
		var saveAStub = sinon.stub(game_service, "saveAGame").callsArgWith(1, null, data);

		//when:
		client.post('/games.json', {},function(err, req, res, data) {
            if (err) {
                throw new Error(err);
            }
            else {
                if (!data.game) {
                    throw new Error('invalid response from /games.json');
                }

                assert.equal(res.statusCode, 201);
                assert.equal(res.body, JSON.stringify(data));
                done();
            }
        });
	});

    it('find a new player', function(done){
        done();
    });
});