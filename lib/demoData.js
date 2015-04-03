var db = require('./db');

module.exports = {
	load: function() {
		var featuresData = [{
			id: 1,
	  		name: "Rebuild the hoover dam",
	  		description: "I think we should rearchitect it.  Old stuff cannot be as awesome as new stuff"
	  	}, {
	  		id: 2,
	  		name: "Give my cat a bath",
	  		description : "The cat hates water but needs a bath"
  		},
		 {
	  		id: 3,
	  		name: "Manned mission to mars",
	  		description : "There were two total recall movies.  We should build a rocketship to mars."
  		},
  		 {
	  		id: 4,
	  		name: "Make Barry's Tea",
	  		description : "It is clearly the worlds greatest tea, sorry Lyons.  And PG Tips, no one invited you to this party."
  		},
  		 {
	  		id: 5,
	  		name: "Sort library by awesomeness",
	  		description : "Clearly the Uncle Bob books go on the left."
  		},
  		 {
	  		id: 6,
	  		name: "Sort the recycling",
	  		description : "Whoops, we need to put green, brown, and clear glass in seperate buckets.  I think we can put blue glass in the green bucket."
  		},
  		 {
	  		id: 7,
	  		name: "Build a snowman",
	  		description : "Yes, I do want to build a snowman.  You bring the magical snow queen, I will bring the coal and carrot."
  		}, {
	  		id: 8,
	  		name: "Replace Buick badge on the trunk",
	  		description : "Fun fact, it is the Buick family coat of arms."
  		}

  		];
  		var features = db.collection('features');
  		features.remove( function( err, data) {
  			features.insert(featuresData);
  		});
	}
};