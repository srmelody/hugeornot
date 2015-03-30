import {HttpClient} from 'aurelia-http-client';
var url = "http://localhost:7000/api/features";
var voteUrl = "http://localhost:7000/api/votes";

export class VoteNow {

	static inject() { return [HttpClient]; }
	constructor(http){
		this.hello = 'Welcome to the Aurelia Navigation App!';

        this.features = [];
    	this.feature1 = {};
    	this.feature2 = {};
		this.http = http;
	} 

	activate(){
	  	return this.http.get(url).then(response => {
	     
	        this.features = response.content.features;
	    	this.feature1 = this.features[0];
	    	this.feature2 = this.features[1];
	    });
  	}
  	feature1Clicked() {
  		this.vote(this.feature1, this.feature2);

  	}
	feature2Clicked() {
  		this.vote(this.feature2, this.feature1);
  	}
  	vote(feature1, feature2) {
  		var payload = {
  			user : "sean",
  			biggerFeatureId : feature1.id,
  			smallerFeatureId: feature2.id
  		};
  		this.http.post(voteUrl, payload).then( response => {
  			console.log("Done voting");
  			
  		});
  	}
  	getFeatures () {
	  	return [{
	  		name: "Rebuild the hoover dam",
	  		description: "I think we should rearchitect it."
	  	}, {
	  		name: "Give my cat a bath",
	  		description : "The cat hates water but needs a bath"
	  	}];
  }
}
