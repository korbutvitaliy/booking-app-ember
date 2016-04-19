import Ember from 'ember';

const {
  computed: { equal },
  Controller
} = Ember;

export default Controller.extend({
	isServiceProvider: equal('currentUser.role', 'service provider'),
	isConsumer: equal('currentUser.role', 'consumer'),

	actions: {
		accept(booking) {
		  const bookings =
		    this
		      .store
		      .query('booking', {
		        orderBy: 'bookedService',
		        equalTo: booking.get('bookedService.id')
		      })
		      .then(function(bookings) {
		        bookings.setEach('bookingState','rejected');
		        booking.set('bookingState', 'confirmed');        
		        return bookings.save();
		      });

		  const service =
		    this
		      .store
		      .findRecord('service', booking.get('bookedService.id'))
		      .then(function(service) {
		        service.toggleProperty('booked');
		        return service.save();
		     });

		  Ember
		    .RSVP
		    .all([bookings, service])
		    .then(() => {
		      this.get('target.router').refresh();
		    });
		},

		reject(booking) {
			booking.set('bookingState', 'rejected');
			booking.save()
			const service = 
				this
				.store
				.findRecord('service', booking.get('bookedService.id'))
				.then(function(service) {
		 			service.set('booked', false);
		 			return service.save();
		 	});
			this.get('target.router').refresh()
		}
	}
});
