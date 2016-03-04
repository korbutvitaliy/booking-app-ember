import Ember from 'ember';

export default Ember.Controller.extend({
	
	actions: {
		signIn: function(provider) {
			let controller = this;
			this.get('session').open('firebase', {
				provider: provider,
				email: this.get('email') || '',
				password: this.get('password') || '',
			}).then(() => {
				controller.set('email', null);
				controller.set('password', null);
				controller.transitionToRoute('services');
			}, (error) => {
				this.set('errorMessage', 'Invalid email and password combination :(');
			});
		},
		signUpWith(provider) {
      		this.get("session").open("firebase", { provider: provider}).then(function(data) {
        		console.log(data.currentUser);
     		}).then(() => {
     		this.transitionToRoute('services');
     		});
    	},
	}
});