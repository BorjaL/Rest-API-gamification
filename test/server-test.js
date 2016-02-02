var assert = require('assert');
var sinon = require('sinon');
var request = require('request');

var player_service = require('../model/player/player_service');
var passport_mock = require('./passport_mock');


describe('Server', function(){

    require('../infraestructure/server').startServer(passport_mock);

    describe('Login', function (){

        it('testing that the login works with the right params in the request', function(done){

            var login_data = {username: "username", password: "password"};

            request.post({url:'http://localhost:3023/players/login.json', formData: login_data}, function(err, res, body){
                if (err) {
                    return console.error("login action failed", err);
                }
                assert.equal(res.statusCode, 200);
                assert.equal(JSON.parse(body).token, "token");
                assert.equal(JSON.parse(body).username, "username");

                done();
            });
        });

        it('testing that the login does not work without the right params in the request', function(done){

            var wrong_login_data = {username: "wrong_username", password: "wrong_password"};

            request.post({url:'http://localhost:3023/players/login.json', formData: wrong_login_data}, function(err, res, body){
                if (err) {
                    return console.error("login action failed", err);
                }
                assert.equal(res.statusCode, 401);
                done();
            });
        });
    });

    describe('Create player', function (){
        it('testing that we can create a player', function(done){

            var savePlayerStub = sinon.stub(player_service, "saveAPlayer").callsArgWith(1, null, "token", "username");

            request.post({url:'http://localhost:3023/players.json'}, function(err, res, body){

                assert.equal(res.statusCode, 201);
                assert.equal(JSON.parse(body).token, "token");
                assert.equal(JSON.parse(body).username, "username");
                savePlayerStub.restore();
                done();
            });
        });

        it('when the player already exists return 409 status code', function(done){

            var savePlayerStub = sinon.stub(player_service, "saveAPlayer").callsArgWith(1, {duplicate_user:"This user already exists"});

            request.post({url:'http://localhost:3023/players.json'}, function(err, res, body){

                assert.equal(res.statusCode, 409);

                savePlayerStub.restore();
                done();
            });
        });
    });

    describe('Get player', function (){
        it('Tony Stark wants to get the BorjaL player info', function(done){

            var options = {
                url:'http://localhost:3023/players/BorjaL',
                headers: {
                    'authorization': 'Bearer TonyStark'
                }
            }

            var findAPlayerStub = sinon.stub(player_service, "findAPlayer").callsArgWith(1, null, {username: "BorjaL"});

            request.get(options, function(err, res, body){

                assert.equal(res.statusCode, 200);
                assert.equal(JSON.parse(body).player.username, "BorjaL");
                assert.equal(JSON.parse(body).is_owner, false);

                findAPlayerStub.restore();

                done();
            });
        });

        it('BorjaL wants to get his own info', function(done){
            
            var options = {
                url:'http://localhost:3023/players/BorjaL',
                headers: {
                    'authorization': 'Bearer TonyStark'
                }
            }

            var findAPlayerStub = sinon.stub(player_service, "findAPlayer").callsArgWith(1, null, {username: "TonyStark"});

            request.get(options, function(err, res, body){

                assert.equal(res.statusCode, 200);
                assert.equal(JSON.parse(body).player.username, "TonyStark");
                assert.equal(JSON.parse(body).is_owner, true);

                findAPlayerStub.restore();

                done();
            });
        });
    });

    
});