import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
     saveService(newService) {
       newService
       .set('user', this.get('currentUser.content'));
       newService
         .save()
         .then(()   => newService.get('user'))  // See https://www.firebase.com/docs/web/libraries/ember/guide.html#section-relationships
         .then(user => user.save())     
         .then(()   => this.transitionToRoute('services.index'));

     }
  }
});
