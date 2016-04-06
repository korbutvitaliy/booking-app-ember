/* jshint ignore:start */

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
  	const appModel    = this.modelFor('application');
	  let currentUser = get(appModel, 'currentUser');
	  let currentRole = currentUser.get('role');
	  if (currentRole === 'service provider') {
	  	let currentUserId = currentUser.id;
	  	console.log(currentUserId);
	  	let query2 = {orderBy: 'user',
	  	equalTo: currentUserId};
	  	Ember.merge(query, query2);
	  };
    return RSVP.hash({
      ...this.modelFor('application'),
      services: this.store.query('service', query)
    });
  }
});
