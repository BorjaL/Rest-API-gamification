var player_service = require('../../model/player/player_service');

var playerController = function (passport_instance){

	return {

		login: function login(req, res, next){
			res.send(200, {token: req.user, username: req.authInfo});
			next();
		},

		create: function createPlayer(req, res, next){
			player_service.saveAPlayer(req.params, function (error, token, username){
				if (error){
					if (error.duplicate_user){
						console.info("Duplicate username: ", error);
						res.send(409, error);
						return next();
					}
					console.error("Error in saveAPlayer: ", error);
					res.send(error);
					return next();
				}
				res.send(201, {token: token, username: username});
				return next();
			});
		},

		get: function getPlayer(req, res, next){
			player_service.findAPlayer(req.params.username, function (error, player_found){
				if (error){
					res.send(500, error);
					return next();
				}
				if (player_found){

					passport_instance.authenticate('bearer', { session: false },function(err, token, username) {
						
						if (err){
							res.send(500, err);
							return next();
						}

						res.send(200, {player: player_found, is_owner: username === player_found.username});
						return next();

					})(req, res);
				}
				else{
					res.send(404);
					return next();
				}
			});
		}
	};
};

module.exports = playerController;