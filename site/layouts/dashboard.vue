<template lang="pug">
	div
		headerTop
		main.container.main
			aside.sidebar-wr(v-if="$store.state.user.role == 'admin'")
				.sidebar-nav
					router-link.sidebar-nav-item(to="/dashboard") Админка
					router-link.sidebar-nav-item(to="/dashboard/menu") Меню
					router-link.sidebar-nav-item(to="/dashboard/posts") Статьи
					router-link.sidebar-nav-item(to="/dashboard/seo") SEO
					router-link.sidebar-nav-item(to="/dashboard/roulettes") Рулетки
					router-link.sidebar-nav-item(to="/dashboard/modes") Режимы
					router-link.sidebar-nav-item(to="/dashboard/freebie") Халява
			.content-wr
				.content(:class="{'content_popup': !$store.state.user.auth}")
					nuxt

			aside.sidebar-wr(v-if="$store.state.user.role == 'admin'")
				| всякие штуки
</template>

<script>
	import headerTop from '~/components/Header.vue';
	export default {
		components: {
			headerTop
		},
		data() {
			return {
			}
		}
	}
</script>

<style lang="scss">
	.dashboard-table
	{
		width: 100%;
		display: block;
		overflow-x: auto;
		white-space: nowrap;
		// table-layout: fixed;
		padding-bottom: 20px;
		min-width: 100%;
		tbody
		{
			width: 100%;
			display: table;
		}
		th
		{
			padding-bottom: 14px;
			font-size: 16px;
			width: auto;
		}
		td,th
		{
			padding-right: 25px;
			white-space: nowrap;
			font-size: 15px;
			padding-top: 8px;
			padding-bottom: 8px;
			&:last-child
			{
				padding-right: 0;
			}
		}
	}
</style>