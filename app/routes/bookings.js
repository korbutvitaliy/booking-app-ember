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
	  	let currentUserId = this.get('currentUser.id');
	  	let query2 = {orderBy: 'user',
	  	equalTo: this.get('currentUser.id'),
	  	};
	  	Ember.merge(query, query2);
	  	// let query3 = {orderBy: 'user',
	  	// equalTo: this.get('currentUser.id'),
	  	// };
	  };
    return this.store.query('service', query)
    
  },

  setupController(controller, model) {
  	controller.setProperties({
  		model: model,
  		pending: model.filterBy('bookingState', 'pending'),
  		accepted: model.filterBy('bookingState', 'confirmed')
  	})
  }
});
