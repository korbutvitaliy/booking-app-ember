import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	emailValid: Ember.computed.match('email', /^.+@.+\..+$/),
	passwordValid: Ember.computed.gte('password.length', 6),
	isValid: Ember.computed.and('emailValid', 'passwordValid'),
	isDisabled: Ember.computed.not('isValid'),
	firebase: Ember.inject.service(),
	actions: {
		signUp(provider) {
			if (provider === 'google') {
					this.get("session").open("firebase", { provider: provider}).then(function(data) {
        			console.log(data.currentUser);
     			}).then(() => {
     			this.transitionToRoute('services');
     		});
			} else {
			let controller = this;
			this.get('firebase').createUser({
				email: this.get('email'),
				password: this.get('password'),
			}, 
			(error, userData) => {
				if (error) {
					this.set('errorMessage', 'This email is already registred.');
					console.log(error);
				} else {
					this.get('session').open('firebase', {
						provider: provider,
						email: this.get('email') || '',
						password: this.get('password') || '',
					}).then(() => {
						var user = this.store.createRecord('user', {
							id: userData.uid,
							isDealer: this.get('isDealer'),
						});
						user.save()
						.then(() =>{
							controller.set('email', null);
							controller.set('password', null);
							controller.set('errorMessage', null);
							controller.transitionToRoute('services');
							});
						});
					}
				});
			}
		},
	}
});