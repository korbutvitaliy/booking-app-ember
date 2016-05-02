import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  RSVP,
  get
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

	model() {
    return this.store.query('notification', {
      orderBy: 'toWhom',
	  	equalTo: this.get('currentUser.id')
	  })
  },
  actions: {
    hide(notification) {
      notification.set('hidden', true);
      notification.save();
    },
    hideAll(model) {
      model.setEach('hidden', true);
      model.save();
    }
  }

});
