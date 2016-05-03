import Ember  from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  this.route('services', function() {
    this.route('new');
    this.route('show', { path: ':service_id' });
  });
  this.route('bookings');
  this.route('notifications');
  this.route('contacts');
  this.route('messages', function() {
    this.route('show', { path: ':conversation_id' });
  });
  this.route('about', { path: '/' });
});


export default Router;
