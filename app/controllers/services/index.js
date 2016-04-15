import Ember from 'ember';

const {
  computed: { equal },
  Controller
} = Ember;

export default Controller.extend({
  currentUser: Ember.inject.service('current-user'),
	isServiceProvider: equal('currentUser.role', 'service provider'),
	isConsumer: equal('currentUser.role', 'consumer')
});
