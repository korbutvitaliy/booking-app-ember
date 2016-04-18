import Model     from 'ember-data/model';
import {hasMany} from 'ember-data/relationships';
import attr      from 'ember-data/attr';

export default Model.extend({
  services: hasMany('service'),
  bookedServices: hasMany('booking'),

  
  role:     attr('string'),
  email:    attr('string')
});
