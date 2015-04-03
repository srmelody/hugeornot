import {HttpClient} from 'aurelia-http-client';
import {VoteService} from './services/VoteService';



export class VoteNow {

	static inject() { return [HttpClient, VoteService]; }
	constructor(http, VoteService){
		this.hello = 'Welcome to the Aurelia Navigation App!';

        this.features = [];
    	this.feature1 = {};
    	this.feature2 = {};
		this.http = http;
		this.voteService = VoteService;
	
	} 

	activate(path){
	  	return this.voteService.getFeatures().then(response => {
	     
	        this.features = response.content.features;
	    	this.feature1 = this.features[0];
	    	this.feature2 = this.features[1];
	    });
  	}
  	feature1Clicked() {
  		this.voteService.vote(this.feature1, this.feature2);

  	}
	feature2Clicked() {
  		this.voteService.vote(this.feature2, this.feature1);
  	}
  	
  	
}
