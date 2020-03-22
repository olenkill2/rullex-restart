const cookieparser = require('js-cookie');

export const state = () => ({
	auth: false,
	role: 'guest',
	token: null,
})

export const mutations = {
	SET_USER(state, userData) {
		state.auth = true;
		state.token = userData.token;
		state.role = userData.role;
	},
	LOGOUT (state) {
		state.auth = false;
		state.token = null;
		state.role = 'guest';
	}
}

export const actions = {
	auth({ commit }, data) {
		commit('SET_USER', data);
		// cookieparser.set('Authorization', data.token);
	},
	logout({ commit }) {
		commit('LOGOUT');
		// cookieparser.remove('Authorization');
	}
};