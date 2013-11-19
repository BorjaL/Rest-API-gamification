function Player(data){
	this.username = data.username
	this.created_at = new Date()

	this.toJson = function(){
		return  {
				username: 	this.username,
				created_at: this.created_at
			}
	}
}

exports.Player = Player