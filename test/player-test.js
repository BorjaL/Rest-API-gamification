var sinon = require('sinon');
var should = require('should');
var repository = require('../infraestructure/repository');

describe('Player', function(){

	it('gets default attributes', function(done){
		//given:
		var player = new Player({});

		//when:
		var attributes = player.defaultAttributes()

		//then:
		should(attributes.player).have.property('username', '');
		should(attributes.player).have.property('password', '');
		should(attributes.player).have.property('email', '');
		done();
	});

	it('can save itself', function(done){
		//given:
		var player = new Player({repository: repository});
		//and:
		var findPlayerByUsernameStub = sinon.stub(repository, "findPlayerByUsername").callsArgWith(1, null, null);
		var savePlayerStub = sinon.stub(repository, "savePlayer").callsArgWith(1, null, {player: true});

		//when:
		player.save(function(error, player_saved){
			//then:
			should.not.exist(error);
			should.exist(player_saved);

			findPlayerByUsernameStub.restore();
			savePlayerStub.restore();
			done();
		});
	});

	it('can verify its own password', function(done){
		//given:
		var player = new Player({password: 'SecR3T'});

		//and:
		player.encryptPassword(player.password, function(error, pass_salt){
			player.password = pass_salt;

			//when:
			player.verifyPassword('SecR3T', function(error, isMatch){
				//then:
				should.not.exist(error);
				isMatch.should.be.true;
				done();
			});
		});



		
	})
});