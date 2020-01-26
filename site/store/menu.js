export const state = () => ({
	items: [],
})

export const mutations = {
	setMenu(state, menu) {
		state.items = menu;
	},
}

export const actions = {
	async getMenu({ commit }) {
		try {
			let res = await this.$axios.get('http://127.0.0.1:3002/api/v1/menu/public');

			commit('setMenu', res.data.data);
		} catch (error) {
			console.log(error);
		}
	}
};