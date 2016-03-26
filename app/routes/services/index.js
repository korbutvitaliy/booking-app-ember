import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('service');
    // return this.store.findRecord('user', this.get('session.currentUser.id'));
  }
});
