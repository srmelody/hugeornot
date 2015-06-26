var db = require('../lib/db');
var sessionCollection = db.collection('session');
var _ = require('lodash');
module.exports = {
	save: function( data, callback ) {
    console.log("calling save on data", data);
    sessionCollection.save( data, callback );
	},

	find: function( data, callback ) {


	},
	openSessions: function( user, callback) {
		console.log("My votes", user);
    sessionCollection.find( {open: true}, callback );
	}



};
