import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  
  googleAuth () {
    this
      .get("session")
      .open("firebase", {provider: 'google'})
      .then(data => {
        console.log('google auth successful, user: ', data.currentUser);
        this.transitionToRoute('services');
      });
  },
  
  emailAuth (provider) {
    this
      .get('session')
      .open('firebase', {
        provider,
        email:    this.get('email')    || '',
        password: this.get('password') || '',
      })
      .then(() => {
        this.resetController();
        this.transitionToRoute('services');
      })
      .catch(error => {
        this.set('errorMessage', 'Invalid email and password combination :(');
        console.log('email auth error:', error);
      });
  },
  
  resetController () {
    this.set('email',    null);
    this.set('password', null);
  },
  
  actions: {
    signIn(provider) {
      
      if (provider === 'google') {
        this.googleAuth();
        return;
      }

      this.emailAuth(provider);
    }
  }
});
