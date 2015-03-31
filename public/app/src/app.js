import {Router} from 'aurelia-router';
import bootstrap from 'bootstrap';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Aurelia';
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
        { route: 'votenow', moduleId: './VoteNow', nav:true, title:"Vote Now"},
        { route: 'votedone/:name', moduleId: './votedone', nav:false},

        { route: 'myvotes',        moduleId: './MyVotes',    title: "My Votes",   nav: true }
      ]);
    });
  }
}
