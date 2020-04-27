<template>
	<div class="page-content">
    <div class="dashboard-header-wr">
      <div class="dashboard-header__left">Основная панель</div>
    </div>
    <div class="dashboard-main-panel">
      <router-link class="dashboard-main-panel__item" to="/dashboard/menu">Меню</router-link>
      <router-link class="dashboard-main-panel__item" to="/dashboard/pages">Страницы</router-link>
      <router-link class="dashboard-main-panel__item" to="/dashboard/roulets">Рулетки</router-link>
      <router-link class="dashboard-main-panel__item" to="/dashboard/freebie">Халява</router-link>
    </div>
  </div>
</template>
<script>
export default {
	layout (context) {
		return 'dashboard'
	},
	data: () => ({

	}),
	methods: {
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
