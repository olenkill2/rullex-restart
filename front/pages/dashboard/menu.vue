<template lang="pug">
	.page-content
		.dashboard-header-wr
			.dashboard-header__left
				|Настройка навигации

			.dashboard-header__right
				button.btn(@click="showLinkPopup = true")
					|Добавить ссылку

		.nav-settings-wr
			.nav-settings-item.nav-settings-item_nav
				.nav-settings-item__header
					|Основное меню

				table.nav-settings-table
					tbody
						tr
							th №
							th Название
							th Url
							th Раздел
							th Ред.
						tr(v-for="(item, index) of navItems")
							td {{index + 1}}
							td {{item.name}}
							td {{item.url}}
							td
								div(v-if="typeof item.category != 'undefined'") {{item.category.category}}
							td
								.edit-btn(@click="editMenuItem(index)")

			.nav-settings-item.nav-settings-item_pages
				.nav-settings-item__header
					|Статьи
				table.nav-settings-table
					tbody
						tr
							th №
							th Название
							th Url
							th Раздел

						tr
							td 1
							td Главная
							td /
							td --

		linkPopup(v-if="showLinkPopup", :editData="editData", @close="closePopup", @dataUpdated="updateMenu")
</template>
<script>
import linkPopup from '~/components/linkPopup.vue';
export default {
	layout (context) {
		return 'dashboard'
	},
	asyncData (req) {
		return req.$axios.get('http://127.0.0.1:3002/menu').then((result, error) => {
			// this.navItems = ;
			return { navItems: result.data.data }
		}).catch((error) => {
			return { navItems: []}
		})
	},
	middleware: ['authenticated'],
	components: {
		linkPopup,
	},
	data: () => ({
		showLinkPopup: false,
		editData: false,
		navItems: [],
		selectedCategory: '',
	}),
	methods: {
		editMenuItem (itemIndex) {
			this.editData = this.navItems[itemIndex];
			this.showLinkPopup = true;
		},
		closePopup () {
			this.showLinkPopup = false;
			this.editData = '';
		},
		updateMenu (newItem) {
			this.navItems.push(newItem)
		}
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.nav-settings-wr
	{
		display: flex;
		justify-content: space-between;
	}
	.nav-settings-item_nav
	{
		flex-basis: 55%;
	}
	.nav-settings-item_pages
	{
		flex: 1;
		padding-left: 20px;
	}
	.nav-settings-item__header
	{
		font-weight: $medium;
		font-size: 20px;
		color: $accent;
		padding-bottom: 8px;
	}
	.nav-settings-table
	{
		width: 100%;
	}
	.edit-btn
	{
		display: block;
		width: 20px;
		height: 20px;
		background-image: url('../../assets/icons/edit.svg');
		background-repeat: no-repeat;
		background-position: center;
		cursor: pointer;
		transition: 0.2s;
		&:hover
		{
			transform: scale(1.2);
		}
	}
</style>
