import {Behavior} from 'aurelia-framework';

export class FeatureCardCustomElement {
  static metadata(){
    return Behavior.withProperty('feature');
  }

  speak(){
    alert('Hello ${this.feature}!');
  }
}