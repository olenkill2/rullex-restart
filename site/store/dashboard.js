export const state = () => ({
  roulettes: [],
  freebies: [],
  modes: []
})

export const mutations = {
  setRoulettes(state, roulettes) {
    state.roulettes = roulettes
  },
  setFreebies(state, freebies) {
    state.freebies = freebies
  },
  setModes(state, modes) {
    state.modes = modes
  }
}
export const actions = {
  async fetchRoulettes({ commit }) {
    await this.$axios.$get('/api/roulettes')
      .then(({ data }) => {
        commit('setRoulettes', data)
      })
      .catch((e) => {
        console.log(e)
      })
  },
  async fetchFreebies({ commit }) {
    await this.$axios.$get('/api/freebies')
      .then(({ data }) => {
        commit('setFreebies', data)
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  },
  async fetchModes({ commit }) {
    await this.$axios.$get('/api/modes')
      .then(({ data }) => {
        commit('setModes', data)
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  }
};

export const getters = {
  getRoulettes: (state) => {
    return state.roulettes
  },
  getFreebies: (state) => {
    return state.freebies
  },
  getModes: (state) => {
    return state.modes
  }
}
