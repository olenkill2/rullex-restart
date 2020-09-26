import Vue from 'vue'
import Vuex from 'vuex'
import tactic from './modules/tactic'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tactic
  },

  state: {
    // balance: 0,
    // globalStatus: 'load',
    // router: {
    //   current: 'FirstScreen',
    //   history: []
    // },
    // currentRoulette: null,
    // modes: null,
    // functions: {}
    ...{
      balance:1,
      globalStatus:"ready",
      router:{current:"AutoStop", history:["FirstScreen","tactics", "AutoStop"]},
      currentRoulette:{
        description:"какое-то супер крутое описание",
        color:"#333333",
        minBet:0.01,
        modes:[{
          created_at:"2020-05-02T13:23:43.560Z",
          _id:"5ead745fa71a5216dcd0337a",
          name:"dice",
          fields:[{
            dropDownList:[],
            _id:"5ead745fa71a5216dcd0337b",
            name:"ставка",
            placeholder:"p",
            model:"betSize",
            component:"field"},{
            dropDownList:[{label:"Больше", value:"large"},{label:"Меньше", value:"men"}],
            _id:"5ead745fa71a5216dcd0337c",
            name:"на что ставить",
            placeholder:"больше",
            model:"whoBet",
            component:"dropdown"},{
            dropDownList:[],
            _id:"5ead745fa71a5216dcd0337d",
            name:"Задержка",
            placeholder:"500 ms",
            model:"delay",
            component:"field"}],
          __v:0}],
        _id:"5ead7564a71a5216dcd0337e",
        name:"nvuti",
        host:"http://localhost:8080",
        currency:{symbol:"D", name:"Dubli"},
        functions:{
          authValidationRuleFunction:"() => {return function() { \nconsole.log('validate auth')\nreturn true; \n}}",
          balanceParseFunction:"() => {return function() { \nconsole.log('get balance')\nreturn 1; \n}}",
          referalChangeFunction:"() => {return function() { console.log('ref change') }}"},
        gameFunctionForMode:[{
          _id:"5ead7564a71a5216dcd0337f",
          mode:{
            created_at:"2020-05-02T13:23:43.560Z",
            _id:"5ead745fa71a5216dcd0337a",
            name:"dice",
            fields:[{
              dropDownList:[],
              _id:"5ead745fa71a5216dcd0337b",
              name:"ставка",
              placeholder:"p",
              model:"betSize",
              component:"field"},{
              dropDownList:[{label:"Больше", value:"large"},{label:"Меньше", value:"men"}],
              _id:"5ead745fa71a5216dcd0337c",
              name:"на что ставить",
              placeholder:"больше",
              model:"whoBet",
              component:"dropdown"},{
              dropDownList:[],
              _id:"5ead745fa71a5216dcd0337d",
              name:"Задержка",
              placeholder:"500 ms",
              model:"delay",
              component:"field"}],
            __v:0},
          gameFunc:"() => {return function() { console.log('game functions', args) }}"}],
        referal:{refType:"url", url:"http://localolhost:8000/ref-url", code:""}},
      modes:[{
        created_at:"2020-05-02T13:23:43.560Z",
        _id:"5ead745fa71a5216dcd0337a",
        name:"dice",
        fields:[{
          dropDownList:[],
          _id:"5ead745fa71a5216dcd0337b",
          name:"ставка",
          placeholder:"p",
          model:"betSize",
          component:"field"},{
          dropDownList:[{label:"Больше", value:"large"},{label:"Меньше", value:"men"}],
          _id:"5ead745fa71a5216dcd0337c",
          name:"на что ставить",
          placeholder:"больше",
          model:"whoBet",
          component:"dropdown"},{
          dropDownList:[],
          _id:"5ead745fa71a5216dcd0337d",
          name:"Задержка",
          placeholder:"500 ms",
          model:"delay",
          component:"field"}],
        __v:0}],
      functions:{
        authCheck:{_custom:{type:"function", display:"<span>ƒ</span> ()"}},
        parseBalance:{_custom:{type:"function", display:"<span>ƒ</span> ()"}},
        refChange:{_custom:{type:"function", display:"<span>ƒ</span> ()"}}},
      gameFunctions:{dice:{_custom:{type:"function", display:"<span>ƒ</span> ()"}}}},

    autoStop: null,
    gameStat: null
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
    setGameStat(state, stat) {
      state.gameStat = stat
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
    setAutoStop(state, autoStop) {
      state.autoStop = autoStop
    }
  },
  actions: {
    routerBack ({ state }) {
      const router = JSON.parse(JSON.stringify(state.router))

      const newRouter = {
        current: router.history[router.history.length - 1],
        history: router.history
      }

      // console.log(newRouter.current)
      if (newRouter.current !== 'FirstScreen') {
        console.log(router.history.splice(-1, 1))
        // newRouter.history = router.history.splice(-1, 1)
      }
      console.log(newRouter.history)
      state.router = newRouter
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
    getGameFunctions: state => {
      return state.gameFunctions
    },
    getBalance: state => {
      return state.balance
    },
    getAutoStop: state => {
      return state.autoStop
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
