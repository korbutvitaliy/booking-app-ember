import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Mixin.create({
	permittedRoles: [],

	beforeModel (transition) {
	  return this.attemptTrespasserRedirect() || this._super(transition);
	},

  // Returns true on trespasser detection
	attemptTrespasserRedirect () {
	  const appModel    = this.modelFor('application');
	  const currentUser = get(appModel, 'currentUser');


	  
	  if (!this.isUserAllowed(currentUser)) {
		  this.transitionTo('services');
		  return true;
	  }
	},

	isUserAllowed (currentUser) {
	  const permittedRoles = this.get('permittedRoles');
	  const currentRole    = currentUser.get('role');
			 
		return permittedRoles.contains(currentRole);
	},
});
