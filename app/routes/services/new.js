/* jshint ignore:start */

import Ember from 'ember';
import RoleValidation from '../../mixins/routes/role-validation';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend(RoleValidation, {
  permittedRoles: ['service provider'],


  model() {
    const parentModel = this.modelFor('services');
    let user = this.get('currentUser.id');
    return RSVP.hash({
      ...parentModel,
      newService: this.store.createRecord('service')
    });
  },

  actions: {
    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this
        .controller
        .get('model.newService')
        .rollbackAttributes();
    }
  }
});
