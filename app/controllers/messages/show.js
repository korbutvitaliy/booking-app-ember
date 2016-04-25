import Ember from 'ember';

export default Ember.Controller.extend({
  isAlreadySent: Ember.computed.filter('model.bookings', function(booking) { 
  	return booking.get('whoBooked.id') === this.get('currentUser.id')
  	}
  ),
	
	actions: {
		sendMessage(model){
			if (Ember.isEmpty(model.newMessage)) {

			} else {
				
				let message =
				this
					.store
					.createRecord('message',{
  					sender_name: 		 this.get('currentUser.name'),
						body: 					 model.newMessage,
						timestamp: new Date().getTime()
					});

					let conversation = model.conversation;
					conversation.setProperties({
						last_message: message.get('body'),
						last_update:  message.get('timestamp'),
						last_message_name: this.get('currentUser.name')
					});
					conversation.get('messages').addObject(message);
				message.save()
				.then(() => conversation.save())
				.then(() => this.set('model.newMessage', ''));
			}
		}
	}
});
