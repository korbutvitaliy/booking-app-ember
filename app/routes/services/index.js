import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('service');
    return this.store.query('user', {
      orderBy: 'id',
      equalTo:  this.get('session.currentUser.id'),
        });
  }
});
