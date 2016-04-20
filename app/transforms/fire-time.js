import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized;
  },

  serialize(time) {
  	if (time instanceof Date) {
      return moment(time).format('LT');
    } else {
      return null;
    }
  }
});
