var config = {
	
	"development": {
		"server": {
			"port": 3023
		},
		"mongodb":{
			"url": "mongo",
			"port": 27017,
			"name": "gamisfan"
		},
		"redis":{
			"url": "redis",
			"port": 6379
		}
	},

	"test": {
		"server": {
			"port": 3023
		},
		"mongodb":{
			"url": "mongo",
			"port": 27017,
			"name": "gamisfan"
		},
		"redis":{
			"url": "redis",
			"port": 6379
		}
	},

	"production": {
		"server": {
			"port": 3023
		},
		"mongodb":{
			"url": "mongo",
			"port": 27017,
			"name": "gamisfan"
		},
		"redis":{
			"url": "redis",
			"port": 6379
		}
	}
};

exports.setUp = function(){
	var node_env = process.env.NODE_ENV || 'development';
	return config[node_env];
}();