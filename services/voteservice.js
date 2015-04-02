var db = require('../lib/db');
var voteCollection = db.collection('votes');
var _ = require('lodash');
module.exports = {
	save: function( data, callback ) {
		
	},
	
	vote: function( data, callback ) {
		var document = _.pick(data, ['user', 'biggerFeature', 'smallerFeature']);
		voteCollection.save( document, callback );
	},
	myVotes: function( user, callback) {
		console.log("My votes", user);
		voteCollection.find( {user: user }, callback );
	}



};