import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  computed: { and, gte, match },
  Controller,
  RSVP
} = Ember;

export default Controller.extend({

  emailValid:    match('email', /^.+@.+\..+$/),
  passwordValid: gte('password.length', 6),
  isValid:       and('emailValid', 'passwordValid'),

  authenticateWithPassword: task(function * () {
    const email    = this.get('email');
    const password = this.get('password');
    const deferred = RSVP.defer();

    this.send('authenticateWithPassword', {email, password, deferred});

    yield deferred
      .promise
      .then(() => {
        this.resetController();
      })
      .catch(() => {
        this.set('errorMessage', 'This email is already registered.');
      });
  }).drop(),

  resetController () {
    this.setProperties({
      email:        null,
      password:     null,
      errorMessage: null
    });
  }
});
