'use strict'


var express = require('express')
	, router = express.Router();

var dbConnector = require('../../db/mysql_connector');

//load helpers
var outputHelper = require('../../helper/output');
var pool = dbConnector.getConnectParams();

router.route('/')
.post(function(req,res,next){	
	var username = req.body.username;
	var password = req.body.password;
	if(username && password) {		
		pool.getConnection(function(err,connection){
	        if (err) {	        	
				res.json(outputHelper.output(10001));			
	        }

	        var query = "select * from user where username ='" + username + "' and password = '"+ password +"' and is_active = true limit 1";	        
	        connection.query(query,function(err,rows){
	            connection.release();
	            if(err) {	            	
	                res.json(outputHelper.output(10001));
	            } else {	            	
	            	if(rows.length > 0) {
	            		res.json(outputHelper.output(13001), rows[0]);
	            	} else {
	            		res.json(outputHelper.output(12001));
	            	}
	            }
	        });

	        connection.on('error', function(err) {      
				res.json(outputHelper.output(10001));	              
	        });
	  	});
	} else {
		res.json(outputHelper.output(11001));
	}		
})
.get(function(req,res,next){
	res.json({status: 'only post call allowed'});
});

module.exports = router;