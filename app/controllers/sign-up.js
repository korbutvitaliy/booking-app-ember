import Ember from 'ember';
import { task } from 'ember-concurrency';

Ember.TextField.reopen({
  triggerEvents: function () {
    Ember.run.next(this, function () {
      this.$().trigger("change");
    });
  }.on("didInsertElement")
});

const {
  computed: { and, gte, match },
  Controller,
  RSVP
} = Ember;

export default Controller.extend({

  commonUserRoles: ["consumer", "service provider"],
  role:            "consumer",

  emailValid:      match('email', /^.+@.+\..+$/),
  passwordValid:   gte('password.length', 6),
  phoneValidation1:match('phone', /^[+]+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+([- ]?)+[0-9]+$/),
  phoneValidation2:gte('phone.length', 11),
  phoneValid:      and('phoneValidation1','phoneValidation2'),
  isValid:         and('emailValid', 'passwordValid', 'phoneValid'),

  emailSignup: task(function * () {
    const name     = this.get('name')
    const email    = this.get('email');
    const password = this.get('password');
    const phone    = this.get('phone')
    const role     = this.get('role');
    const deferred = RSVP.defer();

    this.send('emailSignUp', {name, email, password, phone, role, deferred});

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
      name:         null,
      email:        null,
      password:     null,
      phone:        null,
      role:         null,
      errorMessage: null
    });
  },

});
