exports.startServer = function(passport){
	var restify = require('restify');
	var server = restify.createServer({name: 'gami-api'});
	var config = require('../config/enviroments').setUp;
	var player_service = require('../model/player/player_service');
	var game_service = require('../model/game/game_service');
	var lead_service = require('../model/lead/lead_service');
	
	var playerController = require('./controllers/playerController')(passport);

	server
		.use(passport.initialize())
		.use(restify.queryParser())
		.use(restify.bodyParser())
		.use(restify.CORS({
			origins: ['http://gamisfan.com']
		}))
		.use(restify.fullResponse());

	server.opts(/\.*/, function (req, res, next) {
		res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
		res.send(204);
	});

	server.post('/games.json', function (req, res, next) {
		passport.authenticate('bearer', { session: false },function(error, token, username) {
			if (error) {
				console.log("Athenticating user for creating game " + error);
				res.send(error);
			}
			else if (!token) {
				res.send(401);
			}
			else{
				req.params.owner = username;
				req.params.players = [username];
				game_service.saveAGame(req.params, function (error, game){
					if (error){
						console.log("Creating a game ", error);
						return res.send(error);
					}
					
					res.send(201, game.url);
				});
			}
		});
	});

	server.get('/games/:username/:gamename', function(req, res, next){
		passport.authenticate('bearer', { session: false },function(error, token, username) {
			if (error) {
				console.log("Athenticating user for getting game info " + error);
				res.send(error);
			}
			else{
				game_service.findAGame(req.params.username, req.params.gamename, function(error, game_info){
					game_service.userPlaysInTheGame(username, game_info, function(error, userIsAPlayer){
						if (error){
							console.log("Finding a game " + error);
							res.send(error);
						}
						else if(game_info === null){
							res.send(404);
						}
						else{
							game_info.userIsAPlayer = userIsAPlayer;
							res.send(200, game_info);
						}
					});
				});
			}
		});
	});

	server.get('/:username/games', function(req, res, next){
		game_service.findAllGamesByPlayer(req.params.username, function(error, list_of_games){
			if (error){
				console.log("Finding all games of " + req.params.username + ": " + error);
				res.send(error);
				next();
			}
			else{
				res.send(200, list_of_games);
			}
		});
	});

	server.post('/games/join', function(req, res, next){
		passport.authenticate('bearer', { session: false },function(error, token, username) {
			if (error) {
				console.log("Athenticating user joining the game " + error);
				return res.send(error);
			}

			if (!token) {
				return res.send(401);
			}

			game_service.joinTheGame(req.params.game_url, username, function(error){
				if (error){
					console.log("Joining the game error", error);
					res.send(error);
				}
				res.send(200);
			});
		})(req, res, next);
	});


	server.get('/permission/createGame', passport.authenticate('bearer', { session: false }),function(req, res, next){
		res.send(204);
	});

	server.post('/players.json', playerController.create);
	server.get('/players/:username', playerController.get);
	server.post('/players/login.json', passport.authenticate('local', { session: false }), playerController.login);

	server.post('/actions', function (req, res, next) {
		passport.authenticate('bearer', { session: false },function(error, token, username) {
			if (error) {
				console.log("Error authenticating for completing an action: " + error);
				return res.send(error);
			}
			if (!token) {
				return res.send(401);
			}
			game_service.completeAnAction(username, req.params.game_name, req.params.action_info, function(error, action_info){
				if (error) {
					console.log("Error during completing an action: " + error);
					return res.send(error);
				}
				res.send(200, action_info);
			});
		})(req, res, next);
	});

	server.post('/leads', function (req, res, next){
		lead_service.saveNewLead(req.params.new_lead_mail, function (error, lead_info){
			if (error) {
				console.log("Error creating new lead", error);
				return res.send(error);
			}
			res.send(200, lead_info);
		});
	});

	server.listen(3023, function () {
		console.log('%s listening at %s', server.name, server.url);
	});
};	