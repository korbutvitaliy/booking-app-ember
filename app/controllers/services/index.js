import Ember from 'ember';

const {
  computed: { equal },
  Controller
} = Ember;

export default Controller.extend({
	isServiceProvider: equal('model.currentUser.role', 'service provider'),
	isConsumer: equal('model.currentUser.role', 'consumer')
});
