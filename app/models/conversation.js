import Model                from 'ember-data/model';
import {belongsTo, hasMany} from 'ember-data/relationships';
import attr                 from 'ember-data/attr';

export default Model.extend({
	customer: 			attr('string'),
	serviceProvider:attr('string'),
	customer_name:  attr('string'),
	provider_name:  attr('string'),
	messages:  			hasMany('message'),
	last_message: 	attr('string'),
	last_update: 		attr('number'),
	last_message_name:attr('string')
});
