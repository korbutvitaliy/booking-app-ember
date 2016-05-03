import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
     saveService(newService) {
      let date2 = moment(newService.get('date1')).startOf('day');
      let startAt2 = moment(newService.get('startAt1')).diff(moment(newService.get('startAt1')).startOf('day'));
      let finishAt2 = moment(newService.get('finishAt1')).diff(moment(newService.get('finishAt1')).startOf('day'));
      newService
       .setProperties({
        user: this.get('currentUser.content'),
        provider_name: this.get('currentUser.name'),
        startAt: date2+startAt2,
        finishAt: date2+ finishAt2
      });
       newService
         .save()
         .then(()   => newService.get('user'))  // See https://www.firebase.com/docs/web/libraries/ember/guide.html#section-relationships
         .then(user => user.save())     
         .then(()   => this.transitionToRoute('services.index'));
     },
     cancel() {
      this.transitionToRoute('services');
     }
  }
});
