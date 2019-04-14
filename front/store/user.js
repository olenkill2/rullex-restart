const cookieparser = require('js-cookie');
export const state = () => ({
	auth: false,
	role: 'user',
	token: null,
})

export const mutations = {
	setAuth(state, userData) {
		state.auth = true;
		state.token = userData.token;
		state.role = userData.role;
	},
	logout (state) {
		state.auth = false;
		state.token = null;
		state.role = 'user';
		console.log('this');
		cookieparser.remove('authorization');
	}
}

export const actions = {

};