<template lang="pug">
	.header__center
		.header-stat-wr
			.header-stat-item
				|Установок
				span.header-stat-item__value
					|432
			.header-stat-item
				|Играют
				span.header-stat-item__value
					|432
			.header-stat-item
				|Ставок
				span.header-stat-item__value
					|432
			.header-stat-item
				|Выиграли
				span.header-stat-item__value
					|432
</template>
<script>
export default {
	model: {
		prop: "name",
	},
	props: ["name", "label", "type"],
	data: () => ({
	}),
	methods: {
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.header-stat-wr
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header__center
	{
		flex: 1;
		margin-left: 20px;
		margin-right: 20px;
	}
	.header-content
	{
		min-height: 75px;
	}
	.header-stat-item
	{
		color: $main;
	}
	.header-stat-item__value
	{
		color: $accent;
		padding-left: 5px;
	}
</style>
