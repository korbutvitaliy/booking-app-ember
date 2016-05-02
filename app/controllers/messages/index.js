import Ember from 'ember';

const {
  computed: { equal, sort, mapBy },
  Controller
} = Ember;

export default Controller.extend({
	isServiceProvider: 		 equal('currentUser.role', 'service provider'),
	isConsumer: 					 equal('currentUser.role', 'consumer'),
	sortingDesc: ['last_update:desc'],
	sortedList: 					 sort('model','sortingDesc'),
});
