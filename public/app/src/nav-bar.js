import {Behavior} from 'aurelia-framework';
import {CookieService} from './services/CookieService';

export class NavBar {
  static metadata(){ return Behavior.withProperty('router'); }
  static inject() { return [CookieService];}
  constructor(cookieService) {
  	this.cookieService = cookieService;
  	var userName = cookieService.get("username");
  	this.username = userName;
  }
}
