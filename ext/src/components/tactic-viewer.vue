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

		.tv-body
			.tv-stages
				transition-group(name="list", tag="div")
					.tv-stages-item(v-for="(stage, index) of tactic.stages", :key="JSON.stringify(stage)")
						.tv-stages-item__top
							.tv-stages-item__number
								|{{index + 1}}
							.tv-stages-item__data
								.tv-stages-item__data-row(v-for="(item, index) of stage")
									|{{tactic.labels[index]}}:
									span.tv-stages-item__data-row-value
										|  {{item}};

						.tv-stages-actions
							//- добавить confirm
							button.btn-str.btn-str_remove(@click="$emit('remove', index)")
								|Удалить
							button.btn-str(@click="$emit('edit', index)")
								|Изменить
</template>
<script>
export default {
	props: ['tactic'],
	data: () => ({
		edit: false,
		expand: false,
		// tactic: ''
	}),
	computed: {
		etapsCount () {
			return this.declOfNum(this.tactic.stages.length, ['этап', 'этапа', 'этапов']);
		}
	},
	wath: {
		tactic: {
			handler(val){
				if(!tactic.stages.length)
					this.expand = false;
			},
			deep: true
		}
	},
	methods: {
		declOfNum(n, titles) {
			return n + ' ' + titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
		},
	},
	created () {
		// this.tactic = this.newTacti
	}
}
</script>
<style lang="scss">
	.list-enter-active, .list-leave-active {
		transition: all 3s;
		// background-color: red;
	}
	.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
		opacity: 0;
		transform: translateX(30px);
	}

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
		transform: translateY(calc(-100% + 54px));
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
	.btn.tv-save
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

	.tv-stages
	{
		padding-bottom: 30px;
		overflow: hidden;
	}
	.tv-stages-item
	{
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 25px;
		padding-bottom: 15px;
		border-bottom: 1px solid #E1EEF6;
	}
	.tv-stages-item__top
	{
		display: flex;
		justify-content: space-between;
	}
	.tv-stages-item__data
	{
		flex: 1;
	}
	.tv-stages-item__number
	{
		font-weight: 300;
		font-size: 48px;
		line-height: 57px;
		color: rgba(41, 47, 68, 0.5);
		padding-right: 23px;
		flex-basis: 30px;
		text-align: center;
	}
	.tv-stages-item__data-row
	{
		font-size: 14px;
		line-height: 29px;
		color: $main;
	}
	.tv-stages-item__data-row-value
	{
		color: $accent;
	}
	.tv-stages-actions
	{
		display: flex;
		justify-content: flex-end;
	}
</style>
