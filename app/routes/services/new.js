import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
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
       newService
         .save()
         .then(() => {
           this.transitionTo('services');
         });
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
