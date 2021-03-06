import {Router} from 'aurelia-router';
import bootstrap from 'bootstrap';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Huge or Not?';
      config.map([
        { route: ['', 'votenow'], moduleId: './VoteNow', nav:true, title:"Vote Now"},
        { route: 'votedone/:name/:id', moduleId: './votedone', nav:false},
        { route: 'estimatenow',        moduleId: './EstimateNow',    title: "estimate now",   nav: true },
        { route: 'topfeatures',        moduleId: './TopFeatures',    title: "Top Features",   nav: true },
        { route: 'myvotes',        moduleId: './MyVotes',    title: "My Votes",   nav: true }
      ]);
    });
  }
}

class AuthorizeStep {
  static inject() { return []; }
  constructor() {
  }

  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      var isLoggedIn = /* insert magic here */false;
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }

      return next();
    } else {
      return next();
    }
  }
}
