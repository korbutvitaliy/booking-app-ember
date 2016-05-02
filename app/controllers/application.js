import Ember from 'ember';

export default Ember.Controller.extend({

	isNewBooking: Ember.computed('model.booking.[]','currentUser.bookingCounter', function(){
		if (this.get('currentUser.role') === 'service provider') {
			if (this.get('model.booking.length') > this.get('currentUser.bookingCounter')) {
	 		return true;		
	 		} else {
	 		return false;
	 		}
		}
  }),
  messagesArrays: Ember.computed.mapBy('model.conversation', 'messages'),
  totalMessages: Ember.computed('messagesArrays.[]', function() {
  	return this
      .get('messagesArrays')
    	.reduce((result, messages) => result.concat(messages.toArray()), []);
  }),
  notMyMessages: Ember.computed.filter('totalMessages', function(message) {
  	return message.get('sender_id') !== this.get('currentUser.id')
  }),
  isNewMessage: Ember.computed('notMyMessages','currentUser.messageCounter', function(){
		if (this.get('notMyMessages.length') > this.get('currentUser.messageCounter')) {
	 		return true;		
	 	} else {
	 		return false;
	 	}
  }),
  
	actions: {
	 	changeBookingCounter(){
	 		let length = this.get('model.booking.length');
	 		let id = this.get('currentUser.id');
	 		this.store.findRecord('user', id).then(function(user) {
	 			user.set('bookingCounter', length);
	 			user.save();
	 		});	
	 	},
	 	changeMessageCounter(){
  		Ember.run.later(this ,function() {		
	 		  let id = this.get('currentUser.id');
	 			let length = this.get('notMyMessages.length');
	 			this.store.findRecord('user', id).then(function(user) {
	 				user.set('messageCounter', length);
	 				user.save();
	 			});
	 		}, 2500);
	 	}
	 	
	}
});
