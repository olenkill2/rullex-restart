export const state = () => ({
	items: [],
})

export const mutations = {
	SET_MENUITEMS(state, menu) {
		state.items = menu;
	},
}

export const actions = {
	async getMenu({ commit }) {
		try {
			let res = await this.$axios.get('http://127.0.0.1:3002/api/v1/menu/public');

			commit('SET_MENUITEMS', res.data.data);
		} catch (error) {
			commit('SET_MENUITEMS', [])
		}
	}
};