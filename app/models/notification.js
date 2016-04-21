import Model       from 'ember-data/model';
import {belongsTo} from 'ember-data/relationships';
import attr        from 'ember-data/attr';

export default Model.extend({
  toWhom:      	belongsTo('user'),
  subject: 			attr('string'),
  service:  		attr('string'),
  hidden:       attr('boolean')

});
