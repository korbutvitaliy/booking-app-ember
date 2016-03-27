/* jshint ignore:start */

import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend({

  model (params) {
    return RSVP.hash({
      ...this.modelFor('services'),
      currentService: this.store.findRecord('service', params.service_id)
    });
  }
});
