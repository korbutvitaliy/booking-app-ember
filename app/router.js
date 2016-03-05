import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  this.authenticatedRoute('services');
  this.route('services', function() {
    this.route('new');

    this.route('show', {
      path: ':service_id'
    });
  });
  this.route('bookings');
});


export default Router;
