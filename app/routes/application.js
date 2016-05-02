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
  model() {
    const query = {};
    if (this.get('currentUser.role') === 'service provider') {
      let query2 = {
        orderBy: 'serviceProvider',
        equalTo: this.get('currentUser.id'),
      };
      Ember.merge(query, query2);
    } else {
      let query2 = {
            orderBy: 'customer',
            equalTo: this.get('currentUser.id'),
          };
      Ember.merge(query, query2);
    }
    return RSVP.hash({
    booking: this.store.query('booking', query),
    conversation: this.store.query('conversation', query)
    })
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
