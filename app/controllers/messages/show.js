import Ember from 'ember';

export default Ember.Controller.extend({
	message_params: 0,
  lastMessages: Ember.computed(function() { 
  	let params = this.get('message_params');
  	let arr = this.get('model.messages').toArray();
  	return arr.slice(Math.max(arr.length - 10 - params, 0))
  }).property('model.messages.[]','message_params'),
	
	actions: {
		sendMessage(model){
			if (Ember.isEmpty(model.newMessage)) {

			} else {
				
				let message =
				this
					.store
					.createRecord('message',{
  					sender_name: 		 this.get('currentUser.name'),
  					sender_id: 		   this.get('currentUser.id'),
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
		},
		showMore() {
			this.incrementProperty('message_params', 5);
		}
	}
});
