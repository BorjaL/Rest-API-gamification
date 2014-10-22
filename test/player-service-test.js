var rewire = require('rewire')
var player_service = require('../model/player/player_service');
var sinon = require('sinon');
var assert = require('assert');
process.env.NODE_ENV = 'test'

describe('Player service', function(){

	it('gets new player fields', function(done){
		//given:
		var defaultAttributesSpy = sinon.spy();
        var getPlayerObjectWithFunction = function(){
        	return {defaultAttributes: defaultAttributesSpy}
        }
        var getPlayerObjectWithStub = sinon.stub(player_service.player_factory, "getPlayerObjectWith", getPlayerObjectWithFunction);

	    //when:
		player_service.form_fields(function (error, fields){});

		//then:
		assert.equal(getPlayerObjectWithStub.calledOnce, true);
		assert.equal(defaultAttributesSpy.calledOnce, true);
		assert.equal(getPlayerObjectWithStub.calledBefore(defaultAttributesSpy), true);

		getPlayerObjectWithStub.restore();
		done();
		
	});

	it('saves new a player', function(done){

		//given:
		var saveSpy = sinon.spy();
        var getPlayerObjectWithFunction = function(){
        	return {save: saveSpy}
        }
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
        	return {save: saveSpy}
        }
        var findPlayerByUsernameStub = sinon.stub(player_service.player_repository, "findPlayerByUsername");

		//when:
		player_service.findAPlayer(function(error, player_found){});

		//then:
		assert.equal(findPlayerByUsernameStub.calledOnce, true);
		done();
	});

})