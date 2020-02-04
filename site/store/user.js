const cookieparser = require('js-cookie');

export const state = () => ({
	auth: false,
	role: 'guest',
	token: null,
})

export const mutations = {
	setUser(state, userData) {
		state.auth = true;
		state.token = userData.token;
		state.role = userData.role;
	},
	logout (state) {
		state.auth = false;
		state.token = null;
		state.role = 'guest';
	}
}

export const actions = {
	auth({ commit }, data) {
		commit('setUser', data);
		// cookieparser.set('Authorization', data.token);
	},
	logout({ commit }) {
		commit('logout');
		// cookieparser.remove('Authorization');
	}
};