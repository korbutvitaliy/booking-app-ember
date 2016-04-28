import Ember from 'ember';

const {
  computed: { equal, sort },
  Controller
} = Ember;

export default Controller.extend({
	asc: true,
	isServiceProvider: equal('currentUser.role', 'service provider'),
	isConsumer: equal('currentUser.role', 'consumer'),
	sortingAsc: ['date:asc'],
	sortingPrice: ['price:asc'],
	sortedList: sort('model.services','sortingAsc').property('sortingAsc'),
	
	actions: {
		setSort(){
			if (this.get('asc')) {
				this.set('sortingAsc', ['price:asc']);
				this.toggleProperty('asc');
			} else {
				this.set('sortingAsc', ['price:desc']);
				this.toggleProperty('asc');
			}
			
		}
	}
});
