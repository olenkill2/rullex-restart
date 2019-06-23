import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loaded: false,
		loadStatus: 'Подожди. Сейчас идет загрузка(',
		// свернутое состояние
		expand: false,
		// авторизация на сайте рулетки
		auth: false,
		// баланс на сайте рулетки
		userBalance: '00.00',
		// минимальная ставка в игре или рулетке
		minBet: 1,
		// текущее состояние
		// need-auth -- требуется авторизация
		// need-balance -- требуется баланс для игры
		// ready -- готов к использованию
		// play -- идет игра
		// pause - пауза
		stateName: 'need-auth',
		// отображение ошибки вместо баланса
		stateHeader: 'Требуется авторизация',
		// описание ошибки
		stateMessage: 'Пожалуйста, войдите',
		// состояние баланса, если в минусе, то будет окрашиваться
		balanceMinus: false,
		// валюта рулетки
		currency: '₽',
		// текущий роут и история роутов
		router: {
			current: 'FirstScreen',
			history: [],
		},
		currentRoulette: {},
		userSavedTactics: [],
	},
	mutations: {
		updateExpand (state, expanded) {
			state.expand = expanded;
		},
		updateAuth (state, auth) {
			state.auth = auth;
		},
		updateStateName (state, stateName) {
			state.stateName = stateName;
		},
		updateBalance (state, balance) {
			state.userBalance = balance;
		},
		updateStateHeader(state, stateHeader) {
			state.stateHeader = stateHeader;
		},
		updateStateMessage(state, stateMessage) {
			state.stateMessage = stateMessage;
		},
		updateBalanceMinus(state, balanceMinus) {
			state.balanceMinus = balanceMinus;
		},
		setRoute(state, route, params) {
			state.router.history.push(state.router.current);
			state.router.current = route;
			console.log(params);

			if (typeof params != 'undefined') {
				state.router.params = params;
			}
		},
		updateLoadState(state, loaded) {
			state.loaded = loaded;
			if(!loaded)
				state.loadStatus = 'Пиздец! Тут все сломалось(';
		},
		setCurrentRoulette(state, roulette, params) {
			state.currentRoulette = roulette;
		},
	},
	actions: {
		routerBack ({state}, route) {
			state.router.current = state.router.history[state.router.history.length - 1];
			state.router.history.splice(-1, 1);
		},
		getUserSavedTactics ({state}) {
			let savedTactics = JSON.parse(localStorage.getItem('userTactics'));

			if(savedTactics == null)
			{
				savedTactics = {};
				localStorage.setItem('userTactics', JSON.stringify(savedTactics));
				state.userSavedTactics = [];
				return false;
			}

			if(typeof savedTactics[state.currentRoulette.name] == 'undefined')
			{
				return false
			}

			for (const tactic in savedTactics[state.currentRoulette.name]) {
				const userTactic =  savedTactics[state.currentRoulette.name][tactic];
				state.userSavedTactics.push(userTactic)
			}
			// console.log('savedTactics');
		}
	}
})
