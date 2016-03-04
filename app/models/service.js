import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr('date'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  duration: DS.attr('number'),
  image: DS.attr('string'),
  booked: DS.attr('boolean')
});
