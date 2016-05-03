import Ember from 'ember';

export default Ember.Controller.extend({
  isAlreadySent: 		 Ember.computed.filter('model.bookings', function(booking) { 
  	return booking.get('bookedService.id') === this.get('model.service.id')
  	}
  ),
  confirmedBookings: Ember.computed.filter('model.bookings', function(booking){
  	return booking.get('bookingState') === 'confirmed' || booking.get('bookingState') === 'pending'
  }),
  bookedForThisTime: Ember.computed.filter('confirmedBookings.[]',function(booking){
  	if (moment(this.get('model.service.startAt')).isBetween(booking.get('startAt'), booking.get('finishAt'))) {
  		return booking
  	}
  }),
  filteredConv: 		 Ember.computed.filter('model.conversation1', function(conversation) { 
  	return conversation.get('serviceProvider') === this.get('model.service.user.id')
  	}
  ),
	
	actions: {
		sendMessage(model){
			if (Ember.isEmpty(model.newMessage)) {

			} else {

				if (Ember.isEmpty(this.get('filteredConv'))) {
				let message =
				this
					.store
					.createRecord('message',{
  					sender_name: 		 this.get('currentUser.name'),
  					sender_id: 		   this.get('currentUser.id'),
						body: 					 model.newMessage,
						timestamp: new Date().getTime()
					});

					let conversation =
				this
					.store
					.createRecord('conversation', {
						customer: 				 this.get('currentUser.id'),
						serviceProvider: 	 model.service.get('user.id'),
						customer_name:   	 this.get('currentUser.name'),
						provider_name:   	 model.service.get('user.name'),
						last_message: 		 model.newMessage,
						last_update: 			 message.get('timestamp'),
						last_message_name: this.get('currentUser.name')
					});
					conversation.get('messages').addObject(message);
				message.save()
				.then(() => conversation.save())
				.then(() => this.set('model.newMessage', ''));
				} else {
						let message =
				this
					.store
					.createRecord('message',{
  					sender_name: 		 this.get('currentUser.name'),
						body: 					 model.newMessage,
						timestamp: new Date().getTime()
					});
					let filteredConv = this.get('filteredConv');
					let conversation = filteredConv.get('firstObject');
					conversation.setProperties({
						last_message: model.newMessage,
						last_update:  message.get('timestamp'),
						last_message_name: this.get('currentUser.name')
					});
					conversation.get('messages').addObject(message);
				message.save()
				.then(() => conversation.save())
				.then(() => this.set('model.newMessage', ''));
				}
			}
		},
		SaveRequest(model) {
				let booking = 
				this
					.store
					.createRecord('booking', {
						serviceProvider: model.service.get('user.id'),
						bookedService: model.service,
						whoBooked: this.get('currentUser.content'),
						bookingState: 'pending',
						startAt: model.service.get('startAt'),
						finishAt: model.service.get('finishAt')
					});


				booking.save();

			model.service.save()
			.then(()   => this.get('currentUser.content'))
			.then(user => user.save());
			let notification =
			this
				.store
				.createRecord('notification', {
					toWhom: model.service.get('user'),
					subject: "New request for ",
					service: model.service.get('name'),
				});
			notification.save()
			.then(() => this.notifications.success('Request has been sent', {
				autoClear: true
			}));
			this.send('sendMessage',model);
		}
	}
});
