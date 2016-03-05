import DS from 'ember-data';

export default DS.Model.extend({
  service: DS.belongsTo('service'),
  user: DS.belongsTo('user'),
  state: DS.attr('string'), // accepted, rejected, pending, rescheduled, paid
  createdAt: DS.attr('date')
});
