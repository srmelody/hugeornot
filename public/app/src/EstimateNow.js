import {VoteService} from './services/VoteService';

export class EstimateNow {
	static inject() { return [VoteService]; }

	constructor(VoteService){
	    this.voteService = VoteService;
	    this.topFeatures = [];
	    this.voteService.getFeatures().then(response => {

	       this.features = response.content.features;

	    });
	}
	activate(params) {

	}
  createSession() {
    console.log(this);
    //${this.fullName}
  }
}
