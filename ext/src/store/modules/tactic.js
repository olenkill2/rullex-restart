export default {
  state: {
    // tactic: null,
    // userTactics: [],
    // editTactic: null,
    // tab: 'TacticAdd'

    ...JSON.parse('{"tactic":{"name":"we4","mode":{"label":"dice","value":"5ead745fa71a5216dcd0337a"},"roulette":{"name":"nvuti","_id":"5ead7564a71a5216dcd0337e"},"stages":[{"betSize":{"name":"ставка","type":"field","value":""},"whoBet":{"name":"на что ставить","type":"dropdown","value":{"label":"Больше","value":"large"}},"delay":{"name":"Задержка","type":"field","value":""}}],"id":1593113321054},"userTactics":[{"name":"23","mode":{"label":"dice","value":"5ead745fa71a5216dcd0337a"},"roulette":{"name":"nvuti","_id":"5ead7564a71a5216dcd0337e"},"stages":[{"betSize":{"name":"ставка","type":"field","value":"23"},"whoBet":{"name":"на что ставить","type":"dropdown","value":{"label":"Больше","value":"large"}},"delay":{"name":"Задержка","type":"field","value":"23"}}],"id":1593115228462},{"name":"232342","mode":{"label":"dice","value":"5ead745fa71a5216dcd0337a"},"roulette":{"name":"nvuti","_id":"5ead7564a71a5216dcd0337e"},"stages":[{"betSize":{"name":"ставка","type":"field","value":"23"},"whoBet":{"name":"на что ставить","type":"dropdown","value":{"label":"Больше","value":"large"}},"delay":{"name":"Задержка","type":"field","value":"23"}},{"betSize":{"name":"ставка","type":"field","value":"2"},"whoBet":{"name":"на что ставить","type":"dropdown","value":{"label":"Больше","value":"large"}},"delay":{"name":"Задержка","type":"field","value":"2"}}],"id":1593110813598},{"name":"44","mode":{"label":"dice","value":"5ead745fa71a5216dcd0337a"},"roulette":{"name":"nvuti","_id":"5ead7564a71a5216dcd0337e"},"stages":[{"betSize":{"name":"ставка","type":"field","value":"43"},"whoBet":{"name":"на что ставить","type":"dropdown","value":{"label":"Больше","value":"large"}},"delay":{"name":"Задержка","type":"field","value":"43"}},{"betSize":{"name":"ставка","type":"field","value":"32"},"whoBet":{"name":"на что ставить","type":"dropdown","value":{"label":"Больше","value":"large"}},"delay":{"name":"Задержка","type":"field","value":"2323"}}],"id":1592938731871},{"name":"we4","mode":{"label":"dice","value":"5ead745fa71a5216dcd0337a"},"roulette":{"name":"nvuti","_id":"5ead7564a71a5216dcd0337e"},"stages":[{"betSize":{"name":"ставка","type":"field","value":""},"whoBet":{"name":"на что ставить","type":"dropdown","value":{"label":"Больше","value":"large"}},"delay":{"name":"Задержка","type":"field","value":""}}],"id":1593113321054}],"editTactic":null,"tab":"TacticSaved"}')
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
    },
    setEditTactic(state, tactic) {
      state.editTactic = tactic
    }
  },

  actions: {
    setTactic({ commit }, tactic) {
      commit('setTactic', tactic)
    },
    fetchTactics({ commit }) {
      const saveTactics = JSON.parse(localStorage.getItem('saved-tactics')) || []

      commit('setTactics', saveTactics)
    },
    setTab({ commit }, tab) {
      commit('setTab', tab)
    },
    addTactic({ commit, state }, tactic) {
      const tactics = state.userTactics
      tactic.id = Date.now()

      tactics.push(tactic)

      localStorage.setItem('saved-tactics', JSON.stringify(tactics))

      commit('setTactics', tactics)
    },
    removeTactic({ commit, state }, { id }) {
      let tactics = JSON.parse(JSON.stringify(state.userTactics))

      tactics = tactics.filter(item => item.id !== id)

      localStorage.setItem('saved-tactics', JSON.stringify(tactics))

      commit('setTactics', tactics)
    },
    updateTactic({ commit, state }, tactic) {
      let tactics = JSON.parse(JSON.stringify(state.userTactics))

      const index = tactics.findIndex((item) => {
        return item.id === tactic.id
      })

      tactics[index] = tactic

      localStorage.setItem('saved-tactics', JSON.stringify(tactics))

      commit('setEditTactic', null)
      commit('setTactics', tactics)
    },
    editTactic({ commit, state }, tactic) {
      commit('setEditTactic', tactic)
    },
    cancelEditTactic({ commit }) {
      commit('setEditTactic', null)
    }
  },

  getters: {
    getTactic: (state) => {
      return state.tactic
    },
    getEditTactic: (state) => {
      return state.editTactic
    },
    getSavedTactics: (state) => {
      return state.userTactics
    },
    currentTab: (state) => {
      return state.tab
    }
  }
}
