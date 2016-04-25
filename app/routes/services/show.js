/* jshint ignore:start */

import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend({
  model(params) {
  let store = this.store;
    return RSVP.hash({
      service:        store.find('service', params.service_id),
      conversation1:  store.query('conversation', {
        orderBy: 'customer',
        equalTo: this.get('currentUser.id')
      }),
      bookings:       store.query('booking', {
        orderBy: 'bookedService',
        equalTo: params.service_id,
        })
    })
  },
});
