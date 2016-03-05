import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('user.isDealer') === false) {
      this.transitionTo('services');
    }
  },
  model() {
    return this.store.createRecord('service');
  },

  actions: {

    saveService(newService) {
      newService.save().then(() => this.transitionTo('services'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
