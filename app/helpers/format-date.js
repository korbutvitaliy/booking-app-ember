import Ember from 'ember';

export function formatDate(params) {
	let params1 = params[0];
	let date = Math.floor(params1 / 1000);
	return moment.unix(date).format("lll");

}

export default Ember.Helper.helper(formatDate);
