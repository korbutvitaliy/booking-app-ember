/* jshint ignore:start */

import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend({
  model(params){
    return this.store.find('service', params.service_id);
  }

  // model(params) {
		// return RSVP.hash({
  //     // service:this.store.find('service', params.service_id),
  //     filteredBookings:this.store.query('booking', {
  //       orderBy: 'bookedService',
  //       equalTo: params.service_id
  //     })
  //   });
  // },
  // setupController(controller, model) {
  // 	controller.setProperties({
  // 		model:    model,
  // 		filteredBookings:  model.bookings.filterBy('whoBooked',  this.get('currentUser.id')),
  // 	})
  // }
});
