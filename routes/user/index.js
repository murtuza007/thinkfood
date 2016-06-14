
var express = require('express')
	, router = express.Router();

var dbConnector = require('../../db/mysql_connector');
var pool = dbConnector.getConnectParams();

//load helpers
var outputHelper = require('../../helper/output');


router.route('/:user_id')
//get the user profile
.get(function(req,res,next){
	var userId = req.query.user_id
	console.log(userId);
	if (userId) {
		pool.getConnection(function(err,connection){
	        if (err) {	        	
				res.json(outputHelper.output(10001));			
	        }

	        var query = "SELECT	u.* ,
	        				sum(case when uf.user_id = u.id then 1 else 0 end) as ifollow,
	        				sum(case when uf.follower_id = u.id then 1 else 0 end) as myfollow
        				FROM 	
        					user u
        				left join 
        					user_follower uf 
        					on 
        						(uf.follower_id = u.id OR uf.user_id  = u.id)
    						where
    							u.id = ?;
						";	        
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
  		res.json(outputHelper.output(11003));
  	}


	res.json(outputHelper.output(11002));
});

router.route('/checkUserName')
.post(function(req, res, next) {	
	var userHelper = require('../../helper/user_general');
	var username = req.body.username;	
	if (username) {		
		userHelper.checkUsername(username, function(err, data){
			if(err){
				res.json(outputHelper.output(err.status));
			} else {
				res.json(outputHelper.output(data.status))
			}
		})	
	} else {
		res.json(outputHelper.output(11002));
	}
	
});


module.exports= router;