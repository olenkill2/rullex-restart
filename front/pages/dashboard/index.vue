<template lang="pug">
	.page-content
		.dashboard-header-wr
			.dashboard-header__left
				|Основная панель

		.dashboard-main-panel
			router-link.dashboard-main-panel__item(to="/dashboard/menu") Меню
			router-link.dashboard-main-panel__item(to="/dashboard/pages") Страницы
			router-link.dashboard-main-panel__item(to="/dashboard/menu") Меню
</template>
<script>
export default {
	layout (context) {
		return 'dashboard'
	},
	middleware: ['authenticated'],
	data: () => ({

	}),
	methods: {
		// async onSubmit(e) {

		// }
	}
}
</script>
<style>
	.dashboard-main-panel
	{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.dashboard-main-panel__item
	{
		flex-basis: 14%;
		text-align: center;
		padding-top: 40px;
		padding-bottom: 40px;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 24px;
	}
</style>
