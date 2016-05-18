'use strict'


var express = require('express'),
	router = express.Router(),
	passport = require('passport');

router.route('/')
.post(function(req,res,next){
	console.log('login in progress');
	res.json({status: 'Login susccess'});
})
.get(function(req,res,next){
	res.json({status: 'only post call allowed'});
});

module.exports = router;