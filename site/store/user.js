export const state = () => ({
	auth: false,
	user: {
	  role: 'guest'
  },
	access_token: null,
  refresh_token: null
})

export const mutations = {
	setAuth(state, userData) {
		state.auth = true
		state.user = userData
	},
	logout (state) {
		state.auth = false
    state.user = {
      role: 'guest'
    }
	},
  updateTokens(state, { access_token, refresh_token }) {
	  state.access_token = access_token || null
	  state.refresh_token = refresh_token || null
  },
}

export const actions = {
  async getUser({ commit, dispatch }) {
	  await this.$axios.post('http://localhost:3002/api/v1/users/user')
      .then(({ data }, err) => {
        commit('setAuth', data)
      }).catch((err) => {
        console.log(err)
        dispatch('logout')
      })
	},
  updateTokens({ commit }, tokens) {
	  commit('updateTokens', tokens)
    this.$cookies.set('access_token', tokens.access_token, {
      path: '/',
      maxAge: 60 * 60 * 1000
    });
		this.$cookies.set('refresh_token', tokens.refresh_token, {
		  path: '/',
		  maxAge: 60 * 60 * 1000
    });
  },
	logout({ commit }) {
		commit('logout')
		commit('updateTokens', {})
		this.$cookies.remove('access_token')
		this.$cookies.remove('refresh_token')
	}
};

export const getters = {
  tokens: (state) => {
    return {
      access_token: state.access_token,
      refresh_token: state.refresh_token
    }
  },
  getUser: (state) => {
    return state.user
  },
  isAuth: (state) => {
    return state.auth
  },
  isAdmin: (state) => {
    return state.user.role === 'admin'
  }
}
