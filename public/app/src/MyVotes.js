import {VoteService} from './services/VoteService';

export class MyVotes {
	static inject() { return [VoteService]; }

	constructor(VoteService){
	    this.voteService = VoteService;
	    this.votes = [];
	    this.voteService.getMyVotes().then(response => {
	     	
	       this.votes = response.content.votes;

	    });
	}
	activate(params) {

	}
}
