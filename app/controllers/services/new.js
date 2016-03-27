import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
     saveService(newService) {
       newService
         .save()
         .then(()   => newService.get('user'))  // See https://www.firebase.com/docs/web/libraries/ember/guide.html#section-relationships
         .then(user => user.save())             // (section "Saving Async Relationship Data")
         .then(()   => this.transitionToRoute('services.index'));
     }
  }
});
