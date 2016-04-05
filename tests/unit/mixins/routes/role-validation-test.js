import Ember from 'ember';
import RoutesRoleValidationMixin from 'booking-app-ember/mixins/routes/role-validation';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/role validation');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutesRoleValidationObject = Ember.Object.extend(RoutesRoleValidationMixin);
  let subject = RoutesRoleValidationObject.create();
  assert.ok(subject);
});
