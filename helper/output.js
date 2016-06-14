'use strict'



module.exports = {
	apiCode: function(statusCode){
		var code = {
			//Error code
			'10001' : 'Database connection error',

			//Validation code 11000
			'11001': 'Please provide a valid username and password',
			'11002': 'Please provide a valid username',
			'11003': 'Please provide a valid user id',
			


			//failure code 12000
			'12001': 'No user present',
			'12002': 'Username already exists',

			//Success code 13000
			'13001': 'User login succes',
			'13002': 'Username not present',
			'13003': 'User registered successfuly'

		};
		return code[statusCode];
	},
	output: function(statusCode, data){		
		var objReturn = {
			status: statusCode,
			message: this.apiCode(statusCode)			
		}
		if(typeof data != 'undefined') {
			objReturn.result = data
		} 
		return objReturn;
	}
}