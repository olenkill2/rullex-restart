import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loaded: false,
		loadStatus: 'Подожди. Сейчас идет загрузка',
		expand: false,
		router: {
			current: 'FirstScreen',
			history: []
		},
		currentRoulette: {}
	},

	mutations: {
		updateExpand (state, expanded) {
			state.expand = expanded
		},
		setRoute(state, {route, params}) {
			state.router.history.push(state.router.current);
			state.router.current = route

			if (typeof params != 'undefined')
				state.router.params = params
			else
				delete state.router.params
		},
		setCurrentRoulette(state, roulette) {
			state.currentRoulette = roulette
		},
		updateLoadState(state, loaded) {
			state.loaded = loaded;
			if(!loaded)
				state.loadStatus = 'Пиздец! Тут все сломалось('
		}
	},
	actions: {
		routerBack ({state}, route) {
			state.router.current = state.router.history[state.router.history.length - 1]
			state.router.history.splice(-1, 1)
		}
	}
})
