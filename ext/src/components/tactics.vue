<template lang="pug">
	.tactics-wr
		.tactics
			h2.tactics-header
				|Управление  тактиками <span class="tactics-header__name">{{$store.state.currentRoulette.name}}</span>
		.tabs-nav-wr
			.tabs-nav__item(v-for="(tab, index) in tabs",
				@click="currentTabId = index",
				:key="index",
				:class="{'tabs-nav__item_active': currentTabId == index}")
				|{{tab.name}} <span v-if="tab.component == 'tacticSaved' && savedTacticsCount">({{savedTacticsCount}})</span>

		.tabs-container
			.tab(v-for="(tab, index) in tabs", :key="index", v-show="currentTabId == index")
				component(:is="tab.component")
</template>
<script>
import tacticAdd from '@/components/tactic-add.vue';
import tacticSaved from '@/components/tactic-saved.vue';
import tacticImport from '@/components/tactic-import.vue';
export default {
	name: 'tactics',
	components: {
		tacticAdd,
		tacticSaved,
		tacticImport
	},
	data: () => ({
		tabs: [
			{
				name: 'Новая',
				component: 'tacticAdd',
			},
			{
				name: 'Сохраненные',
				component: 'tacticSaved',
			},
			{
				name: 'Импорт',
				component: 'tacticImport',
			},
		],
		currentTabId: 0
		// : 'tacticAdd',
	}),
	computed: {
		currentTab () {
			return this.tabs[this.currentTabId].component;
		},
		savedTacticsCount () {
			return this.$store.state.userSavedTactics.length;
		}
	},
	methods: {

	},
	mounted () {
		const query = this.$store.state.router;
		if(typeof query.params != 'undefined' && query.params.query === 'open-tab')
		{
			this.tabs.map((tab, index) => {
				if(tab.component == query.params.value)
				{
					this.currentTabId = index;

				}
				console.log(tab, index);
			 })
		}
	}
}
</script>
<style lang="scss">
	.tactics-header
	{
		font-size: 20px;
		margin: 0;
		margin-left: 10px;
		margin-right: 10px;
		padding-top: 35px;
		padding-bottom: 26px;
		font-weight: 400;
	}
	.tactics-header__name
	{
		font-weight: 600;
	}
	.tabs-nav-wr
	{
		background-color: $light-gray;
		display: flex;
		justify-content: space-between;
	}
	.tabs-nav__item
	{
		flex-basis: 33.333%;
		text-align: center;
		padding-top: 13px;
		padding-bottom: 14px;
		border-bottom: 1px solid transparent;
		transition: 0.2s;
		cursor: pointer;
		color: $main;
	}
	.tabs-nav__item_active
	{
		border-color: $blue;
		cursor: default;
		color: $accent;
	}
	.tabs-container
	{
		// display: flex;
	}
	.tab
	{
		display: inline-block;
		width: 100%;
	}
</style>
