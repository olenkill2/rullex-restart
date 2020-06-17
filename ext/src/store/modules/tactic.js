export default {
  state: {
    tactic: null,
    userTactics: {},
    tab: 'TacticAdd'
  },

  mutations: {
    setTactic(state, tactic) {
      state.tactic = tactic
    },
    setTactics(state, tactics) {
      state.userTactics = tactics
    },
    setTab(state, tab) {
      state.tab = tab
    }
  },

  actions: {
    setTactic({ commit }, tactic) {
      commit('setTactic', tactic)
    },
    fetchTactics({ commit }) {
      const saveTactics = JSON.parse(localStorage.getItem('saved-tactics')) || {}
      console.log(saveTactics)
      commit('setTactics', saveTactics)
    },
    setTab({ commit }, tab) {
      commit('setTab', tab)
    },
    addTactic({ dispatch, state }, { roulette, mode, tactic }) {
      const userTactics = state.userTactics

      tactic.id = Date.now()

      if (userTactics[roulette]) {
        if (userTactics[roulette][mode]) {
          userTactics[roulette][mode].unshift(tactic)
        } else {
          userTactics[roulette][mode] = [tactic]
        }
      } else {
        userTactics[roulette] = {}
        userTactics[roulette][mode] = [tactic]
      }

      localStorage.setItem('saved-tactics', JSON.stringify(userTactics))

      dispatch('fetchTactics')
    },
    removeTactic({ commit, state }, { mode, roulette, id }) {
      const tactics = state.userTactics

      tactics[roulette.name][mode.label] = tactics[roulette.name][mode.label].filter(item => item.id !== id)

      localStorage.setItem('saved-tactics', JSON.stringify(tactics))
    }
  },

  getters: {
    getTactic: (state) => {
      return state.tactic
    },
    getSavedTactics: (state) => {
      return state.userTactics
    },
    currentTab: (state) => {
      return state.tab
    }
  }
}
