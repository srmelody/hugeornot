import {VoteService} from './services/VoteService';


export class votedone {
	static inject() { return [VoteService]; }

  constructor(VoteService){
    this.hello = 'Welcome to the Aurelia Navigation App!';
    this.voteService = VoteService;
  	this.features = [];
	this.feature1 = {};
	this.feature2 = {};
  }
  	activate(params){
  		this.lastFeatureName = params.name;
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
