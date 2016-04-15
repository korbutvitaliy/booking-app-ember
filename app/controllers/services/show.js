import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		SaveRequest(service) {
			service.set('whoBooked', this.get('currentUser.content'));
			service.set('bookingState', 'pending');
			service.save()
			.then(()   => service.get('whoBooked'))
			.then(user => user.save())
			.then(()   => this.transitionToRoute('services.index'));
		}
	}
});
