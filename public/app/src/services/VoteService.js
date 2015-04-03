import {HttpClient} from 'aurelia-http-client';
import {Router} from 'aurelia-router';

var featuresUrl = "/api/features";
var topFeaturesUrl = "/api/features/top";

var voteUrl = "/api/votes";
var myVotesUrl = "/api/votes/me";

export class VoteService {
	static inject() { return [HttpClient, Router]; }

	constructor(http, router){
		this.http = http;
		this.router = router;
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
  			var path = 'votedone/' + biggerFeature.name + "/" + id;
  			this.router.navigate( path, {trigger: true} );
  		});
  	}
    errorHandler( err ) {
        console.log("Error", err );
        if (err.statusCode == 401) {
          location.href = '/oauth/login';
        }
    } 
  	getFeatures() {
  		return this.http.get(featuresUrl).catch( this.errorHandler );
  	}
    topFeatures() {
      return this.http.get(topFeaturesUrl).catch( this.errorHandler );

    }
  	getMyVotes() {
  		return this.http.get(myVotesUrl).catch( this.errorHandler );
  	}
}