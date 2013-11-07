Player = function(data){
	this.username = data.username
	this.created_at = new Date()
}

Player.prototype.toJson = function(){
	return  {
				username: 	this.username,
				created_at: this.created_at
			}
}

exports.Player = Player