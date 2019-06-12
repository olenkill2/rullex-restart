<template lang="pug">
transition
	.tv(v-if="tactic.stages.length", :class="{'tv_expand': expand}")
		.tv-layout
		.tv-header(:class="{'tv-header_expand': expand}")
			.tv-header__left
				.tv-name(v-if="tactic.name")
					|{{tactic.name}}
				.tv-name(v-else="")
					|Насос бабла

				.tv-info
					|Режим {{tactic.mode}}, {{etapsCount}}
			.tv-header__right
				button.tv-change(v-if="!expand", @click="expand = !expand")
					|Подробнее

				button.tv-change(v-else="", @click="expand = !expand")
					|Свернуть

				button.btn.btn_accent.tv-save
					|Сохранить
		.tv-body(v-if="expand")
			.tv-stages
				|{{tactic}}
</template>
<script>
export default {
	props: ['tactic'],
	data: () => ({
		edit: false,
		expand: false,
	}),
	computed: {
		etapsCount () {
			const res = this.declOfNum(this.tactic.stages.length, ['этап', 'этапа', 'этапов']);
			return res
		}
	},
	methods: {
		declOfNum(n, titles) {
			return n + ' ' + titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
		}
	}
}
</script>
<style lang="scss" scoped>
	.tv
	{
		position: absolute;
		top: calc(100% - 54px);
		left: 0;
		max-width: 350px;
		width: 100%;
		background-color: #fff;
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-height: 56px;
		transition: 0.2s;
	}
	.tv_expand
	{
		max-height: 65%;
		transform: translateY(-65%);
	}
	.tv-header
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 12px;
		padding-left: 10px;
		padding-right: 10px;
		box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.05);
		background-color: #fff;
		transition: 0.2s;
	}
	.tv-header_expand
	{
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
	}
	.tv-header__right
	{
		display: flex;
	}
	.tv-name
	{
		font-weight: 500;
		font-size: 12px;
		line-height: 17px;
		color: $accent;
	}
	.tv-info
	{
		font-size: 10px;
		color: $main;
	}
	.tv-change
	{
		border: none;
		background-color: #fff;
		box-shadow: none;
		font-weight: 500;
		font-size: 12px;
		color: $blue;
		cursor: pointer;
		width: 80px;
	}
	.tv-save
	{
		min-width: auto;
		width: 100px;
		height: 34px;
		padding-left: 10px;
		padding-right: 10px;
		font-size: 14px;
		margin-left: 10px;
	}
	.tv-body
	{
		overflow: auto;
	}
</style>
