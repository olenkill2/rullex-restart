<template lang="pug">
	.dashboard(:class="{'dashboard_opened': $store.state.expand}", v-if="$store.state.loaded")
		AppHeader
		.main
			keep-alive
				transition(name="list", mode="out-in")
					component(:is="$store.state.router.current")
	.dashboard(v-else="")
		.load-message
			|{{$store.state.loadStatus}}
</template>
<script>
// @ is an alias to /src
import AppHeader from '@/components/header.vue'
import FirstScreen from '@/components/first-screen.vue'
import Tactics from '@/components/tactics.vue'

export default {
	name: 'Dashboard',
	components: {
		AppHeader,
		FirstScreen,
		Tactics
	},
	data: () => ({
		authCheckFunction: '',
		getBalanceFunction: '',
	}),
	mounted () {
	},
	async created () {
		try {
			const res = await this.axios.get('/roulettes/public/' + window.location.host);
			const roulette = res.data.data;
			console.log(roulette);

			this.authCheckFunction = eval(roulette.functions.authValidationRuleFunction).call(this);
			this.getBalanceFunction = eval(roulette.functions.balanceParseFunction).call(this);
			this.$store.commit('updateLoadState', true);
			this.$store.commit('setCurrentRoulette', roulette);
		} catch (error) {
			console.log(error);

			// this.$store.commit('updateLoadState', false);
			return false;
		}

		const userAuth = this.authCheckFunction();
		const userBalance = this.getBalanceFunction();

		if(!userAuth) {
			this.$store.commit('updateAuth', false);
			this.$store.commit('updateStateName', 'need-auth');
			this.$store.commit('updateStateHeader', 'Требуется авторизация');
			this.$store.commit('updateStateMessage', 'Пожалуйста, войдите');
			return false;
		}

		this.$store.commit('updateAuth', true);
		this.$store.commit('updateBalance', userBalance);

		if(userBalance < this.$store.state.minBet) {
			this.$store.commit('updateStateName', 'need-balance');
			this.$store.commit('updateBalanceMinus', true);
			this.$store.commit('updateStateMessage', 'Не хватит даже на оду ставку');
		} else {
			this.$store.commit('updateStateName', 'ready');
			this.$store.commit('updateBalanceMinus', false);
			this.$store.commit('updateStateMessage', 'Готов к работе');
		}

		this.$store.dispatch('getUserSavedTactics');
	}
}
</script>

<style lang="scss">
	.dashboard
	{
		width: 350px;
		height: 100vh;
		position: fixed;
		transform: translateY(calc(100% - 60px));
		left: 0;
		transition: 0.2s;
		background: #FFFFFF;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
		overflow: hidden;
	}
	.dashboard_opened
	{
		transform: translateY(0);
	}
	.main
	{
		height: 100%;
		max-height: calc(100vh - 60px);
		overflow-y: auto;
		overflow-x: hidden;
	}
	.load-message
	{
		display: flex;
		justify-content: center;
		align-items: center;
		color: $accent;
		font-size: 16px;
		padding-top: 22px;
	}
</style>
