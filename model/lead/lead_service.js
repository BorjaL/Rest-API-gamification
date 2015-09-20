var lead_repository = require('../../infraestructure/repository');

module.exports.saveNewLead = function(lead_email, callback){

	lead_repository.saveNewLead({email: lead_email, created_at: new Date()}, function (error, lead_info){
		if (error){
			callback(error);
		}
		else{
			callback(null, lead_info);
		}
	});
};