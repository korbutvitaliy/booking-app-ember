import Model       from 'ember-data/model';
import {belongsTo} from 'ember-data/relationships';
import attr        from 'ember-data/attr';

export default Model.extend({
  service:   belongsTo('service'),
  user:      belongsTo('user'),
  
  state:     attr('string'), // accepted, rejected, pending, rescheduled, paid
  createdAt: attr('date')
});
