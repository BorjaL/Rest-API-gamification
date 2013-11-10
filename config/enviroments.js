var config = {
	
	"development": {
		"server": {
			"url": "dev.gamification.com",
			"port": 3000
		}
	},

	"test": {
		"server": {
			"url": "dev.gamification.com",
			"port": 3001
		}
	},

	"production": {
		"server": {
			"url": "",
			"port": 3002
		}
	}
}

exports.setUp = function(){
	var node_env = process.env.NODE_ENV || 'development'
	return config[node_env]
}