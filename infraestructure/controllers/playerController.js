var player_service = require('../../model/player/player_service');

var playerController = {
	login: function login(req, res, next){
		res.send(200, {token: req.user, username: req.authInfo});
		next();
	},
	create: function createPlayer(req, res, next){
		player_service.saveAPlayer(req.params, function (error, token, username){
			if (error){
				if (error.duplicate_user){
					console.info("Duplicate username: ", error);
					return res.send(409, error);
				}
				console.error("Error in saveAPlayer: ", error);
				return res.send(error);
			}
			res.send(201, {token: token, username: username});
			next();
		});
	},
};

module.exports = playerController;