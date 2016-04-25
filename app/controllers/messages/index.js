import Ember from 'ember';

const {
  computed: { equal, uniq, filter },
  Controller
} = Ember;

export default Controller.extend({
	isServiceProvider: 		 equal('currentUser.role', 'service provider'),
	isConsumer: 					 equal('currentUser.role', 'consumer')
});
