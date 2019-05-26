<template lang="pug">
	div
		header.header-wr
			.container
				.header-content
					.header__left
						router-link.header-logo(to="/") RULLEX

					real-stat

					.header__right
						router-link.header-ext-link-wr(to="/")
							span.header-ext-link__text(@click="$store.commit('user/logout');")
								|Выйти

		main.container.main
			aside.sidebar-wr(v-if="$store.state.user.role == 'admin'")
				.sidebar-nav
					router-link.sidebar-nav-item(to="/dashboard") Админка
					router-link.sidebar-nav-item(to="/dashboard/menu") Меню
					router-link.sidebar-nav-item(to="/dashboard/pages") Страницы
					router-link.sidebar-nav-item(to="/dashboard/roulets") Рулетки

			.content(:class="{'content_popup': !$store.state.user.auth}")
				nuxt

			aside.sidebar-wr(v-if="$store.state.user.role == 'admin'")
				| всякие штуки
</template>

<script>
	import realStat from '~/components/real-stat.vue';
	export default {
		components: {
			realStat
		},
		data() {
			return {
			}
		}
	}
</script>

<style lang="scss" scoped="">
	@import '~/assets/style/variables.scss';
	.header-content,
	.header-ext-link-wr
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header-ext-link-wr
	{
		display: inline-flex;
	}
	.header__left,
	.header__right
	{
		flex-basis: 19%;
		flex-shrink: 1;
	}
	.header__right
	{
		text-align: right;
	}
	.header-wr
	{
		box-shadow: 0px 1px 10px rgba(205, 205, 205, 0.25);
		background-color: #fff;
		position: sticky;
		top: 0;
	}
	.header-logo
	{
		font-weight: $light;
		font-size: 40px;
		line-height: normal;
		letter-spacing: 0.13em;
		text-decoration: none;
		color: $accent;
	}
	.header-ext-link-wr
	{
		text-decoration: none;
		color: $accent;
		justify-content: flex-end;
	}
	.header-ext-link__text
	{
		margin-top: 2px;
		border-bottom: 1px solid $main;
		transition: border-color 0.2s;
		cursor: pointer;
	}

	.main
	{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding-top: 16px;
	}
	.sidebar-wr,
	.content
	{
		background-color: #FFFFFF;
	}
	.sidebar-wr
	{
		height: calc(100vh - 91px);
		flex-basis: 19%;
		flex-shrink: 1;
		position: sticky;
		top: 91px;
	}
	.content
	{
		flex: 1;
		margin-left: 16px;
		margin-right: 16px;
		min-height: calc(100vh - 91px);
		max-width: 59%;
	}
	.content_popup
	{
		background-color: transparent;
	}

	.sidebar-nav-item
	{
		display: flex;
		align-items: center;
		padding-left: 24px;
		height: 50px;
		color: $main;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-decoration: none;
		transition: 0.2s;
		position: relative;
		&:before
		{
			position: absolute;
			content: '';
			left: 0;
			top: 0;
			height: 100%;
			width: 2px;
			background-color: transparent;
			transition: 0.2s;
		}

		&.nuxt-link-exact-active
		{
			color: $accent;
			&:before
			{
				background-color: $blue;
			}
		}
	}
</style>