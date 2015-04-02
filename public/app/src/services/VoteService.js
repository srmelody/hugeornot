import {HttpClient} from 'aurelia-http-client';
import {Router} from 'aurelia-router';

var featuresUrl = "http://localhost:7000/api/features";

var voteUrl = "http://localhost:7000/api/votes";
var myVotesUrl = "http://localhost:7000/api/votes/me";

export class VoteService {
	static inject() { return [HttpClient, Router]; }

	constructor(http, router){
		this.http = http;
		this.router = router;
  	}


  hi() {
  	console.log("hi");
  }
  vote(biggerFeature, smallerFeature) {
  		var payload = {
  			
  			biggerFeature: biggerFeature,
  			smallerFeature: smallerFeature
  		};
  		this.http.post(voteUrl, payload).then( data => {
  			console.log("Done voting");
  			
  			var id = data.content._id;
  			var name = data.content.name;
  			var path = 'votedone/' + biggerFeature.name;
  			//window.location.hash = path;
  			this.router.navigate( path );
  		});
  	}
  	getFeatures() {
  		return this.http.get(featuresUrl);
  	}
  	getMyVotes() {
  		return this.http.get(myVotesUrl);
  	}
}