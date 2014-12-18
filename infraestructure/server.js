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
		}))
		.use(restify.fullResponse());

	server.opts(/\.*/, function (req, res, next) {
		res.send(200);
		next();
	});

	server.post('/games.json', function (req, res, next) {
		game_service.saveAGame(req.params, function (error, game){
			if (error){
				res.send(error);
			}
			
			res.send(201, game);
		});
	});

	server.post('/players.json', function (req, res, next) {
		player_service.saveAPlayer(req.params, function (error, token){
			if (error){
				console.log("Error in saveAPlayer: ", error);
				res.send(error);
				next();
			}
			res.send(201, {token: token});
			next();
		});
	});

	server.get('/players/:username', passport.authenticate('bearer', { session: false }),function (req, res, next) {
		player_service.findAPlayer(req.params.username, function (error, player_found){
			if (error){
				res.send(error);
				next();
			}
			res.send(200, player_found);
			next();
		});
	});

	server.post('/players/login.json', function (req, res, next) {
		passport.authenticate('local', { session: false },function(error, token, username) {
			if (error) {
		      res.send(error);
		    }
		    if (!token) {
		      return res.send(403);
		    }
		    return res.send(200, {token: token, username: username});
		})(req, res, next);
	});

	server.listen(config.server.port, config.server.url,function () {
		console.log('%s listening at %s', server.name, server.url);
	});
};	