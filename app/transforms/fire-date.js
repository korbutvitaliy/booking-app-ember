import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized;
  },

  serialize(date) {
  	if (date instanceof Date) {
      return moment(date).format('l');
    } else {
      return null;
    }
  }
});
