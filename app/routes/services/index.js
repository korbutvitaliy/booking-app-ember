import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('service');
    // return this.store.findRecord('user', this.get('session.currentUser.id'));
  }
});
