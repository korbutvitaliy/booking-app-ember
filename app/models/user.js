import Model     from 'ember-data/model';
import {hasMany} from 'ember-data/relationships';
import attr      from 'ember-data/attr';

export default Model.extend({
  services: hasMany('service', { inverse: 'user' }),
  bookedServices: hasMany('service', { inverse: 'whoBooked' }),

  
  role:     attr('string'),
  email:    attr('string')
});
