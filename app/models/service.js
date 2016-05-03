import Model                from 'ember-data/model';
import {belongsTo, hasMany} from 'ember-data/relationships';
import attr                 from 'ember-data/attr';

export default Model.extend({
  user:        belongsTo('user'),
  bookings:    hasMany('booking'),
  
  name:         attr('string'),
  provider_name:attr('string'),
  description:  attr('string'),
  price:        attr('number'),
  image:        attr('string'),
  booked:       attr('boolean'),
  startAt: 		  attr('number'),
  finishAt: 	  attr('number')
});
