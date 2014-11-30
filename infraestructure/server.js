exports.startServer = function(){
	var restify = require('restify');
	var server = restify.createServer({name: 'gami-api'});
	var passport = require('./authentication/passport');
	var config = require('../config/enviroments').setUp();
	var player_service = require('../model/player/player_service');
	var game_service = require('../model/game/game_service');

	server
		.use(passport.initialize())
		.use(restify.queryParser())
		.use(restify.bodyParser())
		.use(restify.CORS({
    		origins: ['http://localhost:9000']
		}));

	server.post('/games.json', function (req, res, next) {
		game_service.saveAGame(req.params, function (error, game){
			if (error){
				res.send(error);
			}
			
			res.send(201, game);
		});
	});

	server.get('/games/new.json',
		passport.authenticate('bearer', { session: false }),
		function (req, res, next) {

			game_service.form_fields(function (error, form_fields){
				if (error){
					res.send(error);
				}

				res.send(200,{attributes: form_fields, access_token: req.user});
			});
	});

	server.post('/players.json', function (req, res, next) {
		player_service.saveAPlayer(req.params, function (error, player){
			if (error){
				res.send(error);
			}
			
			res.send(201, player);
		});
	});

	server.get('/players/new.json', function (req, res, next) {

		player_service.form_fields(function (error, form_fields){
			if (error){
				res.send(error);
			}

			res.send(200,{attributes: form_fields});
		});
	});

	server.post('/players/login.json', function (req, res, next) {
		passport.authenticate('local', { session: false },function(error, token, info) {
			if (error) {
		      res.send(error);
		    }
		    if (!token) {
		      return res.send(200, { success : false, message: info });
		    }
		    return res.send(200, { token: token});
		})(req, res, next);
	});

	server.listen(config.server.port, config.server.url,function () {
		console.log('%s listening at %s', server.name, server.url);
	});
};	