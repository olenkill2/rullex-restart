<template lang="pug">
	.page-content
		.pages-wr
			.pages-header
				.pages-header__left
					|Всего статей - {{posts.length}}
				.pages-header__right
					button.btn.btn_small(v-if="!postFormShow", @click="postFormShow = !postFormShow", :class="{'btn_skin': postFormShow}")
						|Добавить
					button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': postFormShow}")
						|Отменить

			.pages-form-wr(v-if="postFormShow")
				.pages-form-groups
					.pages-form-groups__item
						.pages-form-groups-field-wr
							field(v-model="post.url", label="Url", type="text", rules="required")

						.pages-form-groups-field-wr
							field(v-model="post.title", label="Заголовок", type="text", rules="required")

						.pages-form-groups-field-wr
							checkbox(v-model="post.private", label="Приватная", name="private")

				editor(
					ref="editor",
					class="editor-js-box-wr",
					holder-id="codex-editor",
					save-button-id="save-button",
					placeholder="Контент статьи",
					:init-data="initData",
					@change="save",
					@save="onSave")

				.pages-form-actions(v-if="!edit")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="clearForm") Очистить
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="addPost") Добавить

				.pages-form-actions(v-else="")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="deletePost") Удалить рулетку
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="updatePost") Сохранить

			.page-data-container
				.pages-message(v-if="!posts.length")
					|Статей пока нет

				table.dashboard-table(v-else="")
					tbody
						tr
							th №
							th Заголовок
							th Описание
							th Тип
							th Приватная
							th Редактирование
						tr(v-for="(post, index) in posts")
							td {{index + 1}}
							td {{post.title}}
							td {{post.description}}
							td {{post.pageType}}
							td
								span(v-if="post.private") Да
								span(v-else="") Нет
							td
								.edit-field.edit-field_roulette(@click="setPostForEdit(index)")
</template>
<script>
import field from '~/components/input';
import dropdown from '~/components/drop-down';
import checkbox from '~/components/checkbox';
import textField from '~/components/textarea';

export default {
	layout: 'dashboard',
	async asyncData (req) {
		return req.$axios.get('/api/post').then((result, error) => {
			return { posts: result.data }
		}).catch((error) => {
			return { posts: []}
		})
	},
	middleware: ['authenticated'],
	components: {
		field,
		checkbox,
		dropdown,
		textField
	},
	data: () => ({
		posts: [],
		postFormShow: false,
		post: {},
		statusList: ['private', 'work', 'end'],
		edit: false,
		error: false,
		content: {},
		initData: {
			blocks: [],
		}
	}),
	computed: {
	},
	methods: {
		getPosts () {
			this.$axios.get('/api/post').then((response) => {
				this.posts = response.data
			}).catch((error) => { this.posts = [];})
		},

		getPostSchema () {
			return {
				url: '',
				title: '',
				content: '',
				private: true
			}
		},

		setPostForEdit (index) {
			this.edit = true;
			this.post = JSON.parse(JSON.stringify(this.posts[index]));
			this.initData = JSON.parse(JSON.stringify(this.post.content));
			this.postFormShow = true;
		},

		clearForm () {
			this.post = this.getPostSchema();
		},

		cancelEdit () {
			this.post = this.getPostSchema();
			this.edit = false;
			this.postFormShow = false;
		},

		addPost () {
			// this.$refs.editor.save();
			this.$axios.post('/api/post', this.post).then((response, error) => {
				this.getPosts();
				this.cancelEdit();
			}).catch((error, res) => {
				// this.addPostErrors = error;
			})
		},

		deletePost () {
			this.$axios.delete('/api/post/' + this.post._id).then((response, error) => {
				this.getPosts();
				this.cancelEdit();
			}).catch((error, res) => {
				this.error = true;
			})
		},

		updatePost () {

			console.log(this.post.content);

			this.$axios.put('/api/post/' + this.post._id, this.post).then((response, error) => {
				console.log(this.post.content);

				this.getPosts();
				this.cancelEdit();
			}).catch((error) => {
				console.log(error);

				this.error = true;
			});
		},
		save() {
			this.$refs.editor.save();
		},
		onSave (response) {
			this.post.content = response;
		}
	},
	created () {
		this.post = this.getPostSchema();
	}
}
</script>
<style lang="scss">
	.editor-js-box-wr
	{
		border: 1px solid $dark-gray;
		margin-top: 45px;
		padding-top: 20px;
	}
</style>
