<template lang="pug">
	.page-content
		.dashboard-header-wr
			.dashboard-header__left
				|Управление

			.tabs-nav
				.tabs-nav__item.btn(@click="activeTab = 0", :class="{'btn_skin': activeTab == 1}")
					|Рулетками
				.tabs-nav__item.btn(@click="activeTab = 1", :class="{'btn_skin': activeTab == 0}")
					|Режимами

		.tabs-wr
			.tab(v-show="activeTab == 0")
				roulettesTab(:roulettesList="roulettesList", :modesList="modesList")
			.tab(v-show="activeTab == 1")
				modeTab(:modesList="modesList")
</template>
<script>
// import roulettePopup from '~/components/roulettePopup.vue';
import modeTab from '~/components/modeTab.vue';
import roulettesTab from '~/components/roulettesTab.vue';
export default {
	async asyncData ({$axios, redirect, res, route}) {
		try {
			var getRoulettes = await $axios.get('http://127.0.0.1:3002/roulettes');
			var getModes = await $axios.get('http://127.0.0.1:3002/modes');
			return await { roulettesList: getRoulettes.data.data, modesList: getModes.data.data};
		} catch (err) {
			console.log(err);

			return await { roulettesList: [], modesList: []};
		}
	},
	layout (context) {
		return 'dashboard'
	},
	middleware: ['authenticated'],
	components: {
		modeTab,
		roulettesTab
	},
	data: () => ({
		activeTab: 0,
		roulettesList: [],
		modesList: []
	}),
	methods: {
		getRoulettes () {
			this.$axios.get('/api/roulettes').then((result) => {
				this.roulettesList = result.data.data
			}).catch((error) => { this.roulettesList = [];})
		},
	},
	mounted () {
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.tabs-nav
	{
		display: flex;
		align-items: center;
	}
	.tabs-nav__item
	{
		margin-left: 30px;
		&:first-child
		{
			margin-left: 0;
		}
	}
</style>
