import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject: { service },
  Route,
  RSVP,
} = Ember;

export default Route.extend(ApplicationRouteMixin, {

  store:    service(),
  session:  service(),
  firebase: service(),

  model () {
    const id = this.get('session.data.authenticated.uid');

    return RSVP.hash({
      currentUser: id && this.store.findRecord('user', id)
    });
  },

  authenticateWithPassword ({email, password}) {
    return this
      .get('session')
      .authenticate(
        'authenticator:firebase-simple-auth',
        'firebase-simple-auth',
        {provider: 'password', email, password}
      );
  },

  obtainUser({email, role}) {
    const id    = this.get('session.data.authenticated.uid');
    const store = this.get('store');


    return store
      .findRecord('user', id)
      .catch(() => {
        return store
          .createRecord('user', {id, email, role})
          .save();
      })
      .then(user => {
        this.refresh();
        return user;
      });
  },

  actions: {
    authenticateWithPassword ({email, password, role, deferred}) {
      this
        .authenticateWithPassword({email, password})
        .then(() => this.obtainUser({email, role}))
        .then(deferred.resolve)
        .catch(error => {
          console.log('application route authenticateWithPassword error:', error);
          deferred.reject();
        });
    },

    invalidateSession () {
      this.get('session').invalidate();
    },

    emailSignUp ({email, password, role, deferred}) {
      this
        .get('firebase')
        .createUser({ email, password },
        (error) => {
          if (error) {
            console.log('application route emailSignUp error:', error);
            deferred.reject(error);
            return;
          }

          this.send('authenticateWithPassword', {email, password, role, deferred});
        });
    }
  }
});
