exports.startServer = function(){
	var restify = require('restify');
	var server = restify.createServer({name: 'gami-api'});
	var passport = require('passport');
	BearerStrategy = require('passport-http-bearer').Strategy;
	var config = require('../config/enviroments').setUp();
	var PlayerService = require('../model/player/player_service').PlayerService;
	var GameService = require('../model/game/game_service').GameService;

	var player_service = new PlayerService();
	var game_service = new GameService();

	
	server
		.use(passport.initialize())
		.use(restify.queryParser())
		.use(restify.bodyParser());

	passport.use(new BearerStrategy({realm: "players"},
	  function(token, done) {

	    player_service.findAPlayerByToken(token, function(err, user) {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false); }
	        return done(null, user);
	      });
	  }
	));


	


	server.post('/games.json', function (req, res, next) {
		game_service.saveAGame(req.params, function (error, game){
			if (error){
				res.send(error)
			}
			
			res.send(201, game)
		});
	});

	server.get('/games/new.json',
		passport.authenticate('bearer', { session: false }),
		function (req, res, next) {

			game_service.form_fields(function (error, form_fields){
				if (error){
					res.send(error)
				}

				res.send(200,{attributes: form_fields});
			});
	});

	server.post('/players.json', function (req, res, next) {
		player_service.saveAPlayer(req.params, function (error, player){
			if (error){
				res.send(error)
			}
			
			res.send(201, player)
		});
	});

	server.get('/players/new.json', function (req, res, next) {
		player_service.form_fields(function (error, form_fields){
			if (error){
				res.send(error)
			}

			res.send(200,{attributes: form_fields});
		});
	});

	server.post('/players/login.json', function (req, res, next) {
		player_service.log_in(req.params, function(error, player){
			if (error) res.send(error)
				
			res.send(200,player.toJson());
		});
	});

	server.listen(config.server.port, config.server.url,function () {
		console.log('%s listening at %s', server.name, server.url)
	})
}