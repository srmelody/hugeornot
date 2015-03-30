export class VoteNow {
  constructor(){
    this.hello = 'Welcome to the Aurelia Navigation App!';
    this.features = this.getFeatures();
    this.feature1 = this.features[0];
    this.feature2 = this.features[1];
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
