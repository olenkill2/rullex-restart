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
				|{{tab.name}} <span v-if="tab.customName()">{{tab.customName()}}</span>

		.tabs-container
			.tab(v-for="(tab, index) in tabs", :key="index", v-show="currentTabId == index")
				transition(name="fade", tag="div", mode="out-in")
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
				customName: () => {
					return '';
				}
			},
			{
				name: 'Сохраненные',
				component: 'tacticSaved',
				customName: () => {
					let savedTactics = JSON.parse(localStorage.getItem('userTactics'));
					if(savedTactics == null)
					{
						return 'false';
					}

					console.log(savedTactics);
				}
			},
			{
				name: 'Импорт',
				component: 'tacticImport',
				customName: () => {
					return '';
				}
			},
		],
		currentTabId: 0
		// : 'tacticAdd',
	}),
	computed: {
		currentTab () {
			return this.tabs[this.currentTabId].component;
		}
	},
	methods: {

	},
	mounted () {
		// console.log(this.$store.state.router);

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
