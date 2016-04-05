import Ember from 'ember';

export default Ember.Mixin.create({
	permittedRoles: [],

	beforeModel: function(transition) {
		this._super(transition);
		this.checkTransition(transition);
	},

	checkTransition: function(transition) {
		if (this.get('permittedRoles').contains(this.get('currentUser.role'))) {
			return true;
		} else {
			transition.abort();
			this.transitionTo('services')
		}
	}
});
