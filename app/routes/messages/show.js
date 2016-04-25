import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  RSVP,
  get
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

	model(params){
		let store = this.store;
		return RSVP.hash({
			messages: 	store.query('message', {
				orderBy: 'conversation',
      	equalTo: params.conversation_id
			}),
			conversation:store.find('conversation',params.conversation_id )
		});
	},
});
