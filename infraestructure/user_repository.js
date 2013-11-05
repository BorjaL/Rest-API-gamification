var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server

UserRepository = function(host, port) {
  this.db = new Db('gamification', new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {}))
  this.db.open(function(){})
}

exports.UserRepository = UserRepository