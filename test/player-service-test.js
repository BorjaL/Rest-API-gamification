var player_service = require('../model/player/player_service');
var sinon = require('sinon');
var assert = require('assert');

describe('Player service', function(){

	it('saves new a player', function(done){

		//given:
		var saveSpy = sinon.spy();
        var getPlayerObjectWithFunction = function(){
        	return {save: saveSpy};
        };
        var getPlayerObjectWithStub = sinon.stub(player_service.player_factory, "getPlayerObjectWith", getPlayerObjectWithFunction);

	    //when:
	    player_service.saveAPlayer({}, function(error, player_saved){});

	    //then:
	    assert.equal(getPlayerObjectWithStub.calledOnce, true);
		assert.equal(saveSpy.calledOnce, true);
		assert.equal(getPlayerObjectWithStub.calledBefore(saveSpy), true);

		getPlayerObjectWithStub.restore();
		done();
	});

	it('find a new player', function(done) {

		//given:
		var getPlayerObjectWithFunction = function(){
        	return {save: saveSpy};
        };
        var findPlayerByUsernameStub = sinon.stub(player_service.player_repository, "findPlayerByUsername");

		//when:
		player_service.findAPlayer(function(error, player_found){});

		//then:
		assert.equal(findPlayerByUsernameStub.calledOnce, true);
		findPlayerByUsernameStub.restore();
		done();
	});

	it('a user can log in with a username and a password', function(done){
		//given:
		var verifyPasswordStub = sinon.stub().callsArgWith(1, null, true);
        var getPlayerObjectWithFunction = function(){
        	return {verifyPassword: verifyPasswordStub};
        };
        var getPlayerObjectWithStub = sinon.stub(player_service.player_factory, "getPlayerObjectWith", getPlayerObjectWithFunction);

        //and:
        var findPlayerByUsernameStub = sinon.stub(player_service.player_repository, "findPlayerByUsername").callsArgWith(1, null, {});

        //when:
        player_service.logIn("username", "password",function(arg1, arg2){});


        //then:
        assert.equal(verifyPasswordStub.calledOnce, true);
        findPlayerByUsernameStub.restore();
        done();
	});

});