import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		SaveRequest(service) {
			console.log(this.get('currentUser.id'))
			// service.set('whoBooked', this.get('user.id'));
			// service.save()
			// .then(user => user.save());
		}
	}
});
