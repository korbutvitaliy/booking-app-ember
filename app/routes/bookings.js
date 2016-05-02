import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  RSVP,
  get
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  

	model() {
  	const query = {};
	  if (this.get('currentUser.role') === 'service provider') {
	  	let query2 = {
        orderBy: 'serviceProvider',
	  	  equalTo: this.get('currentUser.id'),
	  	};
	  	Ember.merge(query, query2);
	  } else {
      let query2 = {
            orderBy: 'whoBooked',
            equalTo: this.get('currentUser.content.id'),
          };
      Ember.merge(query, query2);
    }
    return this.store.query('booking', query)
    
  },
  afterModel(model,transition) {
    this.controllerFor('application').send('changeBookingCounter');
  },

  setupController(controller, model) {
  	controller.setProperties({
  		model:    model,
  		pending:  model.filterBy('bookingState', 'pending'),
  		accepted: model.filterBy('bookingState', 'confirmed'),
      rejected: model.filterBy('bookingState', 'rejected')
  	})
  },
  actions: {
    changeIsNewBooking() {
      return true;
    },
  }
});
