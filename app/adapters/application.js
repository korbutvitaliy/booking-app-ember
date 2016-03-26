import Ember from 'ember';
import FirebaseAdapter from 'emberfire/adapters/firebase';

const {
  inject: { service }
} = Ember;

export default FirebaseAdapter.extend({
  firebase: service(),
});
