var db = require('../lib/db');
var voteCollection = db.collection('votes');
var featureCollection = db.collection('features');
var _ = require('lodash');
var async = require('async');
var mongojs = require("mongojs");

module.exports = {
	get: function( user, callback ) {
		featureCollection.find(callback);
	},
	rankFeatures: function( data, cb ) {
		console.log("Ranking features");
		 return async.auto({
		 	features: [function(callback) {
		 		module.exports.get(null, callback);
		 	}],
		 	featureIds: ["features", function( callback, arg) {
		 		var features = arg.features;
		 		var featureIds = _.map(features, function(val) {
		 			return  val.id;
		 		});

		 		callback( null, featureIds) ;
		 	}],
		 	votes: ["featureIds", function( callback, arg) {
		 		var featureIds = arg.featureIds;
		 		var agg = 
		 		[
		 		{	$match: { "biggerFeature.id" : { $in : featureIds}}},
		 		{
		 			$group: { _id : { name: "$biggerFeature.name", id: "$biggerFeature._id"},
		 			count: { $sum: 1}}},
		 		{
		 			$sort: {count:-1}
				}
		 			];
	 			console.log("Aggregating", agg );
		 		voteCollection.aggregate( agg, callback);
		 		// voteCollection.find(callback);
		 	}],
		 	topFeatures: ["features", "votes", function(callback, arg) {
		 		var topFeatures = _.map(arg.votes, function(val) {
		 			console.log("mapping top features", val);
		 			var mappedVal = {
		 				_id : val._id.id,
		 				name: val._id.name,
		 				count: val.count
		 			};
		 			return mappedVal;
		 		});
		 		callback( null, topFeatures);
		 	}]

		 }, function(err, arg) {
		 	console.log("rank features cb", arguments);
		 	cb(err, arg.topFeatures);
		 });
	}



};
