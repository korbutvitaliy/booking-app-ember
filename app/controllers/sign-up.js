import Ember from 'ember';

const {
  computed: { and, gte, match, not },
  Controller,
  inject: { service }
} = Ember;

export default Controller.extend({


  firebase: service(),

  commonUserRoles: ["consumer", "service provider"],

  emailValid:      match('email', /^.+@.+\..+$/),
  passwordValid:   gte('password.length', 6),
  isValid:         and('emailValid', 'passwordValid'),
  isDisabled:      not('isValid'),

  googleSignup () {
    this
      .get("session")
      .open("firebase", {provider: 'google'})
      .then(data => {
        console.log('google auth successful, user:', data.currentUser);
        this.transitionToRoute('services');
      });
  },

  emailSignup (provider) {
    this
      .get('firebase')
      .createUser({
        email:    this.get('email'),
        password: this.get('password')
      },
      (error, userData) => {
        if (error) {
          this.handleEmailSignupError(error);
          return;
        }

        this.handleEmailSignupSuccess(provider, userData);
      });
  },

  handleEmailSignupError (error) {
    this.set('errorMessage', 'This email is already registred.');
    console.log('email signup error:', error);
  },

  handleEmailSignupSuccess (provider, userData) {
    this
      .get('session')
      .open('firebase', {
        provider,
        email:    this.get('email')    || '',
        password: this.get('password') || '',
      })
      .then(() => this.createUser(userData.uid))
      .then(() => {
        this.resetController();
        this.transitionToRoute('services');
      });
  },

  createUser (id) {
    return this
      .store
      .createRecord('user', {
        id,
        role: this.get('role')
      })
      .save();
  },

  resetController () {
    this.setProperties({
      email:        null,
      password:     null,
      role:         null,
      errorMessage: null
    });
  },

  actions: {
    signUp(provider) {
      if (provider === 'google') {
        this.googleSignup();
        return;
      }

      this.emailSignup(provider);
    }
  }
});
