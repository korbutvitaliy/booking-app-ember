import Model     from 'ember-data/model';
import {hasMany} from 'ember-data/relationships';
import attr      from 'ember-data/attr';

export default Model.extend({
  services: 			hasMany('service'),
  bookedServices: hasMany('booking'),
  name: 					attr('string'),
  phone: 					attr('string'),

  
  role:     			attr('string'),
  email:    			attr('string'),
  messageCounter: attr('number'),
  bookingCounter: attr('number')
});
