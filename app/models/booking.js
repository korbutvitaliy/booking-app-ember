import Model       from 'ember-data/model';
import {belongsTo} from 'ember-data/relationships';
import attr        from 'ember-data/attr';

export default Model.extend({
	serviceProvider:  attr('string'),
  bookedService:   	belongsTo('service'),
  whoBooked:      	belongsTo('user'),

  bookingState: 		attr('string'),
  startAt: 		 			attr('number'),
  finishAt: 	 			attr('number')
});
