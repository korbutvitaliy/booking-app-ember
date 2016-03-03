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
					this.get('session').open('firebase', {
						provider: 'password',
						email: this.get('email') || '',
						password: this.get('password') || '',
					}).then(() => {
					controller.set('email', null);
					controller.set('password', null);
					controller.set('errorMessage', null);
					controller.transitionToRoute('home');
					});
				}
			});
		},
		signUpWith(provider) {
      		this.get("session").open("firebase", { provider: provider}).then(function(data) {
        		console.log(data.currentUser);
     		}).then(() => {
     		this.transitionToRoute('home');
     		});
    	},
		
	}
});