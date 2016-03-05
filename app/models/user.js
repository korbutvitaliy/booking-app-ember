import DS from 'ember-data';

export default DS.Model.extend({
  role: DS.attr('string'),
  bookings: DS.hasMany('booking'),
  services: DS.hasMany('service')
});
