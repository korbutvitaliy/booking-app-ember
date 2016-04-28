import Ember from 'ember';

export function formatDate2(params) {
	let params1 = params[0];
	let date = Math.floor(params1 / 1000);
	return moment.unix(date).format("ll");

}

export default Ember.Helper.helper(formatDate2);
