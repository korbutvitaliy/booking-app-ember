/* jshint ignore:start */

import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend({
  beforeModel() {
    if (this.get('user.isDealer') === false) {
      this.transitionTo('services');
    }
  },

  model() {
    const parentModel = this.modelFor('services');

    return RSVP.hash({
      ...parentModel,
      newService: this.store.createRecord('service', {
        user: parentModel.currentUser
      })
    });
  },

  actions: {
    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this
        .controller
        .get('model.newService')
        .rollbackAttributes();
    }
  }
});
