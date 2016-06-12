var dbConnector = require('../db/mysql_connector');
var pool = dbConnector.getConnectParams();
module.exports= {

	//check whether username exist
	checkUsername: function(username, callback){
		
		pool.getConnection(function(err,connection){
			if (err) {	        	
				callback({"status" : 10001});			
	        }

	        var query = "select count(id) as user_count from user where username ='" + username + "' limit 1";	        
	        connection.query(query,function(err,count){
	            connection.release();
	            if(err) {	            	
	                callback({"status" : 10001});
	            } else {	
	            	console.log(count);     	
	            	if(count  && count.user_count > 0) {
	            		callback(null, {"status" : 12002});
	            	} else {
	            		callback(null, {"status" : 13002});
	            	}
	            }
	        });

	        connection.on('error', function(err) {      
	              callback({"status" : 10001});	              
	        });
		});
	}

}