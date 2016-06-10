'use strict'


var express = require('express')
	, router = express.Router();

var dbConnector = require('../../db/mysql_connector');

router.route('/')
.post(function(req,res,next){
	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	if(username && password) {
		var pool = dbConnector.getConnectParams();
		pool.getConnection(function(err,connection){
	        if (err) {
	        	console.log("error is here");
				res.json({"code" : 100, "message" : "Error in connection database", "status": false});
				return;
	        }   

	        
	        var query = "select * from user where username ='" + username + "' and password = '"+ password +"' and is_active = true limit 1";
	        
	        connection.query(query,function(err,rows){
	            connection.release();
	            if(err) {
	            	console.log(err);
	                res.json({"code" : 100, "message" : "Error in dfg database", "status": false});
	            } else {
	            	console.log(rows);
	            	if(rows.length > 0) {
	            		res.json({"code" : 200, "message" : "Login success", "status": true, "result": rows[0] });
	            	} else {
	            		res.json({"code" : 100, "message" : "No user present", "status": false});	
	            	}
	            }
	        });

	        connection.on('error', function(err) {      
	              res.json({"code" : 100, "message" : "Error in connec123tion database", "status": false});
	              return;     
	        });
	  	});
	} else {
		res.json({"code" : 100, "message" : "Error in connectiodfgn database", "status": false});
	}

		
})
.get(function(req,res,next){
	res.json({status: 'only post call allowed'});
});

module.exports = router;