import Ember from 'ember';

const {
  computed: { equal, sort, filter },
  Controller
} = Ember;

export default Controller.extend({
	asc: true,
	fromDay: moment(),
	toDay: moment().add(5, 'y'),
	isServiceProvider: equal('currentUser.role', 'service provider'),
	isConsumer: equal('currentUser.role', 'consumer'),
	filterFutureServices: filter('model.services', function (service) {
		if (moment(service.get('date')).isSameOrAfter()) {
			return service;
		}
	}),
	filterViaUser: filter('filterFutureServices', function(service) {
		if (moment(service.get('date').toISOString()).isBetween(this.get('fromDay'), this.get('toDay'))) {
			return service;
		}
	}).property('fromDay','toDay'),
	sortingAsc: ['date:asc'],
	sortingPrice: ['price:asc'],
	sortedList: sort('filterViaUser','sortingAsc').property('sortingAsc'),
	
	actions: {
		setSort(){
			if (this.get('asc')) {
				this.set('sortingAsc', ['price:asc']);
				this.toggleProperty('asc');
			} else {
				this.set('sortingAsc', ['price:desc']);
				this.toggleProperty('asc');
			}
		},
		filter(){
			if (moment(this.get('date1').toISOString()).isBefore(this.get('date2').toISOString())) {
				this.set('fromDay', moment(this.get('date1')));
				this.set('toDay', moment(this.get('date2')));
			} else {
				this.set('fromDay', moment(this.get('date1')).toISOString());
				this.set('toDay', moment(this.get('date2')).toISOString());
			}
		},
		clear(){
			this.set('fromDay', moment());
			this.set('toDay', moment().add(5, 'y'));
			this.set('date1', null);
			this.set('date2', null);
		}
	}
});
