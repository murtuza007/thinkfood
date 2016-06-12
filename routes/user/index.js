
var express = require('express')
	, router = express.Router();

var dbConnector = require('../../db/mysql_connector');

//load helpers
var outputHelper = require('../../helper/output');

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