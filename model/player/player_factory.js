Player = require('./player').Player

module.exports.getPlayerObjectWith = function(data_player){
	return new Player(data_player);
}