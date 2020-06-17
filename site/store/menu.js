export const state = () => ({
	menu: [],
})

export const mutations = {
	setMenu(state, menu) {
		state.menu = menu;
	},
}

export const actions = {
  async fetchMenu({ commit }) {
    await this.$axios.$get('/api/menu/public')
      .then(({ data }) => {
        commit('setMenu', data)
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  }
}

export const getters = {
  getMenu: (state) => {
    return state.menu
  }
}
