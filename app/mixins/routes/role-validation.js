import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Mixin.create({
	permittedRoles: [],

	afterModel: function(model, transition) {
		this._super(model, transition);
		this.redirectTrespassers({model, transition});
	},

	redirectTrespassers: function({model, transition}) {
		if (this.get('permittedRoles').contains(get(model, 'currentUser.role'))) {
			return true;
		}
		
		this.transitionTo('services')
	}
});
