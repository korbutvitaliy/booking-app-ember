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
	  const currentUser = this.get('currentUser')


	  
	  if (!this.isUserAllowed(currentUser)) {
		  this.transitionTo('services');
		  return true;
	  }
	},

	isUserAllowed (currentUser) {
	  const permittedRoles = this.get('permittedRoles');
	  const currentRole    = this.get('currentUser.role')
			 
		return permittedRoles.contains(currentRole);
	},
});
