/* jshint ignore:start */

import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend({
	model(params) {
    return this.store.find('service', params.service_id);
  }
});
