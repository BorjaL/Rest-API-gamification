var sinon = require('sinon');
var should = require('should');
var repository = require('../infraestructure/repository');

describe('Repository', function(){
	it('can save a player', function(done){
		//given:
		var dbPlayerSaveStub = sinon.stub(repository.db.players, "save").callsArgWith(1, null, {player: true});
		
		//when:
		repository.savePlayer({}, function(error, result){
			//then:
			result.player.should.be.true;
			dbPlayerSaveStub.calledOnce.should.be.true;

			dbPlayerSaveStub.restore();
			done();
		});
	});

	it('can find a player by username', function(done){
		//given:
		var dbPlayerFindByUsernameStub = sinon.stub(repository.db.players, "findOne").callsArgWith(1, null, {player: true});
		
		//when:
		repository.findPlayerByUsername("BorjaL", function(error, result){
			//then:
			result.player.should.be.true;
			dbPlayerFindByUsernameStub.calledOnce.should.be.true;

			dbPlayerFindByUsernameStub.restore();
			done();
		});
	});
});