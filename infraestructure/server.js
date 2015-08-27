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
		res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
		res.send(204);
		next();
	});

	server.post('/games.json', function (req, res, next) {
		passport.authenticate('bearer', { session: false },function(error, token, username) {
			if (error) {
				console.log("Athenticating user for creating game " + error);
				res.send(error);
				next();
		    }
		    if (!token) {
		      res.send(401);
		      next();
		    }
		    req.params.owner = username;
		    req.params.players = [username];
			game_service.saveAGame(req.params, function (error, game){
				if (error){
					console.log("Creating a game ", error);
					res.send(error);
					next();
				}
				
				res.send(201, game.url);
				next();
			});
		})(req, res, next);
	});

	server.get('/games/:username/:gamename', function(req, res, next){
		passport.authenticate('bearer', { session: false },function(error, token, username) {
			if (error) {
				console.log("Athenticating user for getting game info " + error);
				res.send(error);
				next();
		    }

		    game_service.findAGame(req.params.username, req.params.gamename, function(error, game_info){
		    	game_service.userPlaysInTheGame(username, game_info, function(error, userIsAPlayer){
		    		if (error){
			    		console.log("Finding a game " + error);
			    		res.send(error);
			    		next();
			    	}
			    	else if(game_info === null){
			    		res.send(404);
			    		next();
			    	}

			    	game_info.userIsAPlayer = userIsAPlayer;
			    	res.send(200, game_info);
			    	next();
		    	});
		    });
		})(req, res, next);
	});

	server.get('/:username/games', function(req, res, next){
		game_service.findAllGamesByPlayer(req.params.username, function(error, listOfGames){
			if (error){
				console.log("Finding all games of " + req.params.username + ": " + error);
			    res.send(error);
			    next();
			}
			else{
				res.send(200, listOfGames);
				next();
			}
		});
	});


	server.get('/permission/createGame', passport.authenticate('bearer', { session: false }),function(req, res, next){
		res.send(204);
		next();
	});

	server.post('/players.json', function (req, res, next) {
		player_service.saveAPlayer(req.params, function (error, token, username){
			if (error){
				if (error instanceof DuplicateUsernameError){
					console.log("Duplicate username: ", error);
					res.send(409, error);
					next();
				}
				console.log("Error in saveAPlayer: ", error);
				res.send(error);
				next();
			}
			res.send(201, {token: token, username: username});
			next();
		});
	});

	server.get('/players/:username',function (req, res, next) {
		player_service.findAPlayer(req.params.username, function (error, player_found){
			if (error){
				res.send(error);
				next();
			}
			if (player_found){
				passport.authenticate('bearer', { session: false },function(error, token, username) {
					if (token){
						res.send(200, {player: player_found, is_owner: username === player_found.username, is_active: token !== false});
						next();
					}
					else{
						res.send(401);
						next();
					}
				
				})(req, res, next);
			}
			else{
				res.send(404);
				next();
			}
		});
	});

	server.post('/players/login.json', function (req, res, next) {
		passport.authenticate('local', { session: false },function(error, token, username) {
			if (error) {
		      res.send(error);
		    }
		    if (!token) {
		      return res.send(401);
		    }
		    return res.send(200, {token: token, username: username});
		})(req, res, next);
	});

	server.post('/actions', function (req, res, next) {
		passport.authenticate('bearer', { session: false },function(error, token, username) {
			if (error) {
				console.log("Error authenticating for completing an action: " + error);
				res.send(error);
				next();
			}
			if (!token) {
				res.send(401);
				next();
			}
			game_service.completeAnAction(username, req.params.game_name, req.params.action_info, function(error){
				if (error) {
					console.log("Error during completing an action: " + error);
					res.send(error);
					next();
				}
				res.send(200);
			});
		})(req, res, next);
	});

	server.listen(config.server.port, config.server.url,function () {
		console.log('%s listening at %s', server.name, server.url);
	});
};	