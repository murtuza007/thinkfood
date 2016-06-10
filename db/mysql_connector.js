var mysql = require('mysql');

//load  config
var config = require('../config/config');

module.exports = {

	getConnectParams: function(){
		return mysql.createPool({
			connectionLimit : 5, 
			host: config.db_host,
			user: config.db_user,
			password: config.db_password,
			database: config.database,
			debug: false
		});
	},

	getConnection: function(){
		return new Promise(function(resolve, reject){
			this.getConnectParams().connect(function(err){
				if(err) {
					console.log
					reject()	
				}
				
			})
		});
	}
}