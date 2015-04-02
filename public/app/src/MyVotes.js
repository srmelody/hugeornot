import {VoteService} from './services/VoteService';

export class MyVotes {
	static inject() { return [VoteService]; }

	constructor(VoteService){
	    this.voteService = VoteService;
	    this.votes = [];
	    this.voteService.getMyVotes().then(response => {
	     	
	       this.votes = response.content.votes;

	    }).catch( err => {
	    	console.log("Error", err );
	    	if (err.statusCode) {
	    		location.href = '/oauth/login';
	    	}
	    });
	}
	activate(params) {

	}
}
