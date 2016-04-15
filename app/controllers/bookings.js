import Ember from 'ember';

const {
  computed: { equal },
  Controller
} = Ember;

export default Controller.extend({
	isServiceProvider: equal('currentUser.role', 'service provider'),
	isConsumer: equal('currentUser.role', 'consumer'),

	actions: {
		accept(service) {
			service.set('bookingState', 'confirmed');
			service.save()
			this.get('target.router').refresh()
			// this.get('bookings').refresh()
		},

		reject(service) {
			// let id = service.get('id');
			// let user = service.get('whoBooked');
			// let ololo = user.get('bookedServices');
			// ololo.set(id, false);
			// user.save();

			service.set('bookingState', '');
			service.set('whoBooked', '');
			service.save()
			// .then(user => this.toggleProperty('user.bookedServices.id')
			// 	.save()),
			this.get('target.router').refresh()
		}
	}
});
