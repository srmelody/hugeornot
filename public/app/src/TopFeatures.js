import {VoteService} from './services/VoteService';

export class TopFeatures {
	static inject() { return [VoteService]; }

	constructor(VoteService){
	    this.voteService = VoteService;
	    this.topFeatures = [];
	    this.voteService.topFeatures().then(response => {
	     	
	       this.topFeatures = response.content.features;

	    });
	}
	activate(params) {

	}
}
