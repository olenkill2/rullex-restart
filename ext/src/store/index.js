import Vue from 'vue'
import Vuex from 'vuex'
import tactic from './modules/tactic'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tactic
  },

  state: {
    balance: 0,
    globalStatus: 'load',
    router: {
      current: 'FirstScreen',
      history: []
    },
    currentRoulette: null,
    modes: null,
    functions: {},
    userTactics: []
  },

  mutations: {
    setRoute(state, { route, params }) {
      state.router.history.push(state.router.current);
      state.router.current = route

      if (typeof params != 'undefined')
        state.router.params = params
      else
        delete state.router.params
    },
    selectRoulette(state, { roulette, baseFunctions, gameFunctions }) {
      state.currentRoulette = roulette
      state.modes = roulette.modes
      state.functions = baseFunctions
      state.gameFunctions = gameFunctions
    },
    setGlobalStatus(state, status) {
      state.globalStatus = status
    },
    setBalance(state, balance) {
      state.balance = balance
    },
    setUserTactics(state, tactics) {
      state.userTactics = tactics
    }
  },
  actions: {
    routerBack ({ state }) {
      state.router.current = state.router.history[state.router.history.length - 1]
      state.router.history.splice(-1, 1)
    },

    setRoulette({ commit }, roulette) {
      const baseFunctions = {
        authCheck: eval(roulette.functions.authValidationRuleFunction)(),
        parseBalance: eval(roulette.functions.balanceParseFunction)(),
        refChange: eval(roulette.functions.referalChangeFunction)()
      }

      const gameFunctions = {}
      roulette.gameFunctionForMode.map(mode => gameFunctions[mode.mode.name] = eval(mode.gameFunc))

      commit('selectRoulette', {
        roulette,
        baseFunctions,
        gameFunctions
      })
    }
  },
  getters: {
    getRoulette: state => {
      return state.currentRoulette
    },
    getRouletteName: state => {
      return state.currentRoulette.name
    },
    getModes: state => {
      return state.modes
    },
    getGlobalStatus: state => {
      return state.globalStatus
    },
    getBaseFunctions: state => {
      return state.functions
    },
    getBalance: state => {
      return state.balance
    },
    getCurrency: state => {
      return state.currentRoulette.currency
    },
    getUserTactics: state => {
      return state.userTactics
    },
    getModesList: state => {
      return state.currentRoulette.modes
    },
    getModeById: state => (modeId) => {
      return state.modes.find(mode => mode._id === modeId)
    }
  }
})
