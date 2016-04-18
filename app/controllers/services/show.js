import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		SaveRequest(service) {
			let booking = this.store.createRecord('booking', {
				serviceProvider: service.get('user.id'),
				bookedService: service,
				whoBooked: this.get('currentUser.content'),
				bookingState: 'pending'
			});
			booking.save();
			// service.set('whoBooked', this.get('currentUser.content'));
			// service.set('bookingState', 'pending');
			service.save()
			.then(()   => this.get('currentUser.content'))
			.then(user => user.save())
			.then(()   => this.transitionToRoute('services.index'));
		}
	}
});
