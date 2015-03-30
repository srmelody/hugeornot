import {HttpClient} from 'aurelia-http-client';
var url = "http://localhost:7000/api/features";

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
