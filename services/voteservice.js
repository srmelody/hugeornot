var db = require('../lib/db');
var voteCollection = db.collection('votes');
var featureCollection = db.collection('features');
var _ = require('lodash');
module.exports = {
	save: function( data, callback ) {
		
	},
	get: function( user, callback ) {
		featureCollection.find(callback);
	},
	vote: function( data, callback ) {
		var document = _.pick(data, ['user', 'biggerFeatureId', 'smallerFeatureId']);
		voteCollection.save( document, callback );
	}



};