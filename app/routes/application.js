import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  beforeModel() {
    return this
      .get('session')
      .fetch()
      .catch((error) => {
        console.log('application route session fetch error: ', error);
      });
  },

  actions: {
    accessDenied() {
      this.transitionTo('/#/sign-in');
    }
  }
});
