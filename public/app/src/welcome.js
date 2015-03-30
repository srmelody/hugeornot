export class Welcome{
  constructor(){
    this.heading = 'Which of these features is bigger hi?';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.sean = "sean";
    this.feature1 = { name: "Build the Hoover Dam", description: "It is old and we could clearly design it better"};
    // this.feature2 = {name: "Give my cat a bath", description: "My cat hates baths but smells like tuna fish"};
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  welcome(){
    alert(`Welcome, ${this.fullName}!`);
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
