import Ember from 'ember';

export default Ember.Controller.extend({
  isAlreadySent: Ember.computed.filter('model.bookings', function(booking) { 
  	return booking.get('whoBooked.id') === this.get('currentUser.id')
  	}
  ),

	
	actions: {
		SaveRequest(service) {
				let booking = 
				this
					.store
					.createRecord('booking', {
						serviceProvider: service.get('user.id'),
						bookedService: service,
						whoBooked: this.get('currentUser.content'),
						bookingState: 'pending',
						date: service.get('date'),
						startAt: service.get('startAt')
					});
					console.log(this.get('service.date'));
					console.log(this.get('service.startAt'));

				booking.save();

			service.save()
			.then(()   => this.get('currentUser.content'))
			.then(user => user.save());
			let notification =
			this
				.store
				.createRecord('notification', {
					toWhom: service.get('user'),
					subject: "New request for ",
					service: service.get('name'),
				});
			notification.save()
			.then(() => this.notifications.success('Request has been sent', {
				autoClear: true
			}));
		}
	}
});
