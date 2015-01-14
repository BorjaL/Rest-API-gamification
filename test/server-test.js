var assert = require('assert');
var sinon = require('sinon');
var client = require('restify').createJsonClient({
    version: '*',
    url: 'http://dev.gamification.com:3001'
});
var game_service = require('../model/game/game_service');
var game_service = require('../model/player/player_service');
DuplicateUsernameError = require('../model/error/duplicate_username_error').DuplicateUsernameError;

process.env.NODE_ENV = 'test';
require('../infraestructure/server').startServer();

describe('Server', function(){

	it('save a new game', function(done){

		//given:
        var data = {game: true};
		var saveAGameStub = sinon.stub(game_service, "saveAGame").callsArgWith(1, null, data);

		//when:
		client.post('/games.json', {},function(err, req, res, data){
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

    it('try to save a new player but already exists', function(){
        //given:
        var saveAGameStub = sinon.stub(player_service, "saveAPlayer").callsArgWith(1, null, {error: new DuplicateUsernameError('')});

        //when:
        client.post('/players.json', {}, function(err, req, res, data){
            //then:
            assert.equal(res.statusCode, 409);
            done();
        });
    }),

    it('find a new player', function(done){
        done();
    });
});