import Ember from 'ember';

export default Ember.Controller.extend({
	emailValid: Ember.computed.match('email', /^.+@.+\..+$/),
	passwordValid: Ember.computed.gte('password.length', 6),
	isValid: Ember.computed.and('emailValid', 'passwordValid'),
	isDisabled: Ember.computed.not('isValid'),
	firebase: Ember.inject.service(),
	actions: {
		signUp() {
			
			let controller = this;
			this.get('firebase').createUser({
				email: this.get('email'),
				password: this.get('password'),
			},
			
			(error, data) => {
				if (error) {
					this.set('errorMessage', 'This email is already registred.');
					console.log(error);
				} else {
					// this.store.createRecord('user', {
					// 	firstName: this.get('firstName'),
					// 	lastName: this.get('lastName'),
					// 	email: this.get('email'),
					// 	uid: this.get('auth.uid'),
					// }).save();
					controller.set('email', null);
					controller.set('password', null);
					// controller.set('firstName', null);
					// controller.set('lastName', null);
					controller.set('errorMessage', null);
					controller.transitionToRoute('sign-in');
				}
			});
		}
	}
});