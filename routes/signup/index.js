'use strict'


var express = require('express')
	, router = express.Router()
	, _ = require('underscore');

var dbConnector = require('../../db/mysql_connector');

//load helpers
var outputHelper = require('../../helper/output');
var pool = dbConnector.getConnectParams();

router.route('/')
.post(function(req,res,next){	
	var objInsert = {};
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.first_name;
	var lastname = req.body.last_name;
	var country = req.body.country;
	var gender = req.body.gender;
	var facebookId = req.body.facebook_id;
	var email = req.body.email;

	if(facebookId){
		objInsert.facebook_id = facebookId;
		objInsert.is_facebook_user = true; 
	}

	if(email){
		objInsert.email = email;
	}

	if(username){
		objInsert.username = username;
	}

	if(password){
		objInsert.password = password;
	}

	if(firstname){
		objInsert.first_name = firstname;
	}

	if(lastname){
		objInsert.last_name = lastname;
	}

	if(country){
		objInsert.country = country;
	}

	if(gender){
		objInsert.gender = gender;
	}

	if(Object.keys(objInsert).length > 0) {		
		pool.getConnection(function(err,connection){
			if (err) {	        	
				res.json(outputHelper.output(10001, err));
	        }

	        var query = "INSERT INTO user SET ?";	        
	        connection.query(query, objInsert, function(err,result){
	            connection.release();
	            if(err) {
	            	res.json(outputHelper.output(10001, err));	                
	            } else {	
	            	console.log(result);     	
	            	if(result ) {
	            		res.json(outputHelper.output(13003, result));	            		
	            	} else {
	            		res.json(outputHelper.output(10001));	            		
	            	}
	            }
	        });

	        connection.on('error', function(err) {      
	            res.json(outputHelper.output(10001));
	        });
		});
	}


});

module.exports = router;

