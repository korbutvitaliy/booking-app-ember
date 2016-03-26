import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

const {
  inject: { service }
} = Ember;

export default ToriiFirebaseAdapter.extend({
  firebase: service()
});
