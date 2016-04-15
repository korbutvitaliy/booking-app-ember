import Model                from 'ember-data/model';
import {belongsTo, hasMany} from 'ember-data/relationships';
import attr                 from 'ember-data/attr';

export default Model.extend({
  user:        belongsTo('user', { inverse: 'services' }),
  whoBooked:   belongsTo('user', { inverse: 'bookedServices' }),
  
  name:        attr('string'),
  date:        attr('date'),
  description: attr('string'),
  price:       attr('number'),
  duration:    attr('number'),
  image:       attr('string'),
  booked:      attr('boolean'),
  workFrom:    attr('string'),
  workTo:      attr('string'),
  bookingState:attr('string')
});
