var redis = require('redis');
var redisClient = redis.createClient();
var suid = require('rand-token').suid;

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});
 
redisClient.on('connect', function () {
    console.log('Redis is ready');
});

function get(access_token, callback){

    redisClient.get(access_token, function(error, player_name) {
    	if (error){
    		return callback (error);
    	} 
	    
	    return callback(null, player_name);
	});
}

function set(player_name){
	var token = suid(16);
	redisClient.set(token, player_name);
	redisClient.expire(token, 600);
	return token;
}

module.exports.get = get;
module.exports.set = set;