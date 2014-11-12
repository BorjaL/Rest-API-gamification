var config = {
	
	"development": {
		"server": {
			"url": "dev.gamification.com",
			"port": 3023
		},

		"mongodb":{
			"url": "localhost",
			"port": 27017,
			"name": "gamification"
		}
	},

	"test": {
		"server": {
			"url": "dev.gamification.com",
			"port": 3001
		},

		"mongodb":{
			"url": "localhost",
			"port": 27017,
			"name": "gamification_test"
		}
	},

	"production": {
		"server": {
			"url": "",
			"port": 3002
		},

		"mongodb":{
			"url": "",
			"port": 27017,
			"name": "gamification"
		}
	}
};

exports.setUp = function(){
	var node_env = process.env.NODE_ENV || 'development';
	return config[node_env];
};