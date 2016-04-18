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
			let bookings = this.store.query('booking', {orderBy: 'bookedService',
	  	equalTo: booking.get('bookedService.id')
	  	}).then(function(bookings) {
	  		bookings.setEach('bookingState','rejected');
				booking.set('bookingState', 'confirmed');		
				bookings.save();
	  	});
	  	this.get('target.router').refresh();
		 	let service = this.store.findRecord('service', booking.get('bookedService.id')).then(function(service) {
		 		service.toggleProperty('booked');
		 		service.save();
		 	});
		 	
	  	
			
			// need to reject other requests
		},

		reject(booking) {
			booking.set('bookingState', 'rejected');
			booking.save()
			let service = this.store.findRecord('service', booking.get('bookedService.id')).then(function(service) {
		 		service.set('booked', false);
		 		service.save();
		 	});
			this.get('target.router').refresh()
		}
	}
});
