import Model                from 'ember-data/model';
import {belongsTo, hasMany} from 'ember-data/relationships';
import attr                 from 'ember-data/attr';

export default Model.extend({
	conversation:  			belongsTo('conversation'),
  sender_name: 				attr('string'),
  body: 							attr('string'),
  timestamp: 					attr('number')
});
