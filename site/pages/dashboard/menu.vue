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
							th Скрыта
							th Раздел
							th Ред.
						tr(v-for="(item, index) of navItems")
							td {{index + 1}}
							td {{item.name}}
							td {{item.url}}
							td
								span(v-if="!item.private") Нет
								span(v-else) Да
							td
								div(v-if="item.category != null") {{item.category.category}}
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

						tr(v-for="(post, index) in allPosts")
							td {{index + 1}}
							td {{post.name}}
							td {{post.url}}
							td
								div(v-if="post.category != null") {{post.category.category}}

		linkPopup(v-if="showLinkPopup", :editData="editData", @close="closePopup", @update="updateMenu")
</template>
<script>
import linkPopup from '~/components/linkPopup.vue';
export default {
	layout (context) {
		return 'dashboard'
	},
	async asyncData (req) {
		try {
			var getLinks = await req.$axios.get('/api/menu');
			var getPosts = await req.$axios.get('/api/posts');
			return await { navItems: getLinks.data.data, allPosts: getPosts.data.data};
		} catch (err) {
			return await { navItems: '', allPosts: ''};
		}
	},
	middleware: ['authenticated'],
	components: {
		linkPopup,
	},
	data: () => ({
		showLinkPopup: false,
		editData: false,
		navItems: [],
		allPosts: [],
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
			this.$axios.get('/api/menu').then((result, error) => {
				this.navItems = result.data.data;
			}).catch((error) => {
				this.error = true;
			})
		},
	},
	mounted () {
		// this.$axios.get('/api/post').then((result, error) => {
		// 	this.allPosts = result.data.data;
		// }).catch((error) => {
		// 	this.error = true;
		// })
	}
}
</script>
<style lang="scss">
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
</style>
