<template lang="pug">
	.page-content
		.dashboard-header-wr
			.dashboard-header__left
				|Управление статьями

			.dashboard-header__right
				button.btn(@click="showPostPopup = true")
					|Добавить статью

		.post-settings-wr
				table.post-settings-table
					tbody
						tr
							th №
							th Название
							th Url
							th Title
							th Description
							th Раздел
							th Публичная
							th Управление
						tr(v-for="(item, index) of postList")
							td {{index + 1}}
							td {{item.name}}
							td {{item.url}}
							td {{item.title}}
							td {{item.description}}
							td
								div(v-if="item.category != null") {{item.category.category}}
							td
								span(v-if="!item.private") Нет
								span(v-else) Да
							td
								.edit-btn(@click="editPost(index)")

		postPopup(v-if="showPostPopup", :editData="editData", @close="closePopup", @update="updatePosts")
</template>
<script>
import postPopup from '~/components/postPopup.vue';
export default {
	layout (context) {
		return 'dashboard'
	},
	asyncData (req) {
		return req.$axios.get('http://127.0.0.1:3002/post').then((result, error) => {
			return { postList: result.data.data }
		}).catch((error) => {
			return { postList: []}
		})
	},
	components: {
		postPopup,
	},
	middleware: ['authenticated'],
	data: () => ({
		showPostPopup: false,
		editData: false,
		postList: [],
	}),
	methods: {
		closePopup () {
			this.showPostPopup = false;
			this.editData = '';
		},
		editPost (itemIndex) {
			this.editData = this.postList[itemIndex];
			this.showPostPopup = true;
		},
		updatePosts (newItem) {
			this.$axios.get('/api/post').then((result, error) => {
				this.postList = result.data.data;
			}).catch((error) => {
				this.error = true;
			})
		},
	}
}
</script>
<style lang="scss">
	.post-settings-table
	{
		width: 100%;
	}
</style>
