export const state = () => ({
  roulettes: [],
  freebies: [],
  modes: [],
  seoItems: [],
  menu: [],
  posts: []
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
  },
  setSeoItems(state, seoItems) {
    state.seoItems = seoItems
  },
  setMenu(state, menu) {
    state.menu = menu
  },
  setPosts(state, posts) {
    state.posts = posts
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
  },
  async fetchSeoItems({ commit }) {
    await this.$axios.$get('/api/seo')
      .then(({ data }) => {
        commit('setSeoItems', data)
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  },
  async fetchFullMenu({ commit }) {
    await this.$axios.$get('/api/menu')
      .then(({ data }) => {
        commit('setMenu', data)
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  },
  async fetchPosts({ commit }) {
    await this.$axios.$get('/api/post')
      .then(({ data }) => {
        commit('setPosts', data)
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  }
}

export const getters = {
  getRoulettes: (state) => {
    return state.roulettes
  },
  getFreebies: (state) => {
    return state.freebies
  },
  getModes: (state) => {
    return state.modes
  },
  getSeoItems: (state) => {
    return state.seoItems
  },
  getMenu: (state) => {
    return state.menu
  },
  getPosts: (state) => {
    return state.posts
  }
}
