var config = {
	
	"development": {
		"server": {
			"port": 3000
		}
	},

	"test": {
		"server": {
			"port": 3001
		}
	},

	"production": {
		"server": {
			"port" : 3002
		}
	}
}

exports.setUp = function(){
	var node_env = process.env.NODE_ENV || 'development'
	return config[node_env]
}