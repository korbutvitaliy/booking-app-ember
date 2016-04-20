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
  beforeModel() {
    if (this.session.isAuthenticated) {
      return this._populateCurrentUser();
    }
  },
  model () {
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

  obtainUser({name, email, phone, role}) {
    const id    = this.get('session.data.authenticated.uid');
    const store = this.get('store');


    return store
      .findRecord('user', id)
      .catch(() => {
        return store
          .createRecord('user', {id, name, email, phone, role})
          .save();
      })
      .then(user => {
        this.refresh();
        return user;
      });
  },

  actions: {
    authenticateWithPassword ({name, email, password, phone, role, deferred}) {
      this
        .authenticateWithPassword({email, password})
        .then(() => this.obtainUser({name, email, phone, role}))
        .then(deferred.resolve)
        .catch(error => {
          console.log('application route authenticateWithPassword error:', error);
          deferred.reject();
        });
    },

    invalidateSession () {
      this.get('session').invalidate();
    },

    emailSignUp ({name, email, password, phone, role, deferred}) {
      this
        .get('firebase')
        .createUser({ email, password },
        (error) => {
          if (error) {
            console.log('application route emailSignUp error:', error);
            deferred.reject(error);
            return;
          }

          this.send('authenticateWithPassword', {name, email, password, phone, role, deferred});
        });
    },
    sessionAuthenticationSucceeded() {
      this._populateCurrentUser().then(user => this.transitionTo('services'));
      },
    },

  _populateCurrentUser() {
    const id    = this.get('session.data.authenticated.uid');
    return id && this.store.findRecord('user', id)
      .then(user => this.get('currentUser').set('content', user) && user);
  }
});
