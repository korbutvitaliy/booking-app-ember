import Model     from 'ember-data/model';
import {hasMany} from 'ember-data/relationships';
import attr      from 'ember-data/attr';

export default Model.extend({
  bookings: hasMany('booking'),
  services: hasMany('service'),
  
  role:     attr('string'),
  email:    attr('string')
});
