<template lang="pug">
	.popup-box
		.popup-box__layout
		.popup.popup_post
			.popup-top
				.popup-top__header
					|Управление статьей
				.popup-top__close(@click="close")
					img(src="~/assets/icons/close.svg")

			.popup-body
				.popup-body__top
					field.popup-post__field(v-model="postData.name", label="Название")
					field.popup-post__field(v-model="postData.url", label="Url")
					field.popup-post__field(v-model="postData.title", label="Title")
					field.popup-post__field(v-model="postData.description", label="Description")
					category.popup-post__field(@select="selectCategory", :selected="editData")
					label.checkbox-label-wr
						checkbox(v-model="postData.private")
						span.label-text
							|Приватная

				.content-editor
					//- <froala :tag="'textarea'" :config="config" v-model="postData.content"></froala>
					editor(v-model="postData.content", ref="editor", :value="postData.content", :options="editorOptions", :html="editorHtml", :visible="editorVisible", previewStyle="vertical", mode="wysiwyg")

			.popup-footer
				button.btn.btn_red.popup-footer__btn(v-if="edit", @click="removeItem")
					|Удалить
				button.btn.popup-footer__btn(v-if="edit", @click="updateItem")
					|Изменить
				button.btn.btn_accent.popup-footer__btn(v-if="!edit", @click="addNewItem")
					|Добавить
</template>
<script>
import field from '~/components/input';
import category from '~/components/categorys';
import checkbox from '~/components/checkbox';

export default {
	props: ['opened', 'editData'],
	components: {
		field,
		category,
		checkbox,
	},
	data: () => ({
		postData: {
			name: '',
			url: '',
			title: '',
			description: '',
			category: '',
			private: true,
			content: '',
			category: 'null'
		},
		selectedCategory: '',
		error: false,
		editorText: 'This is initialValue.',
		editorOptions: {
			useDefaultHTMLSanitizer: true,
			hideModeSwitch: true
		},
		editorHtml: ``,
		editorVisible: true
	}),
	methods: {
		close () {
			this.$emit('close');
		},
		addNewItem () {
			console.log(this.postData.category);
			this.postData.content = this.$refs.editor.invoke('getHtml');
			this.$axios.post('/api/post', this.postData).then((result, error) => {
				this.$emit('update');
				this.close();
			}).catch((error) => {
				this.error = true;
			})
		},
		selectCategory (category) {
			if(category != null)
				this.postData.category = category;
			else
				this.postData.category = null
		},
		updateItem () {
			this.postData.content = this.$refs.editor.invoke('getHtml');
			this.$axios.put('/api/post', {post: this.postData}).then((result, error) => {
				this.$emit('update');
				this.close();
			}).catch((error) => {
				this.error = true;
			});
		},
		removeItem () {
			this.$axios.delete('/api/post', {data: {post: this.postData._id}}).then((result, error) => {
				this.$emit('update');
				this.close();
			}).catch((error) => {
				this.error = true;
			})
		},
		uploadImage (file) {
			console.log('upload');
		}
	},
	computed:
	{
		edit () {
			if(this.editData)
			{
				this.postData = {...this.editData};
				return true;
			}
			return false;
		}
	},
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.popup-box
	{
		position: fixed;
		z-index: 30;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		// background-color: rgba($accent, 0.4);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.popup-box__layout
	{
		position: fixed;
		z-index: 29;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba($accent, 0.4);
	}
	.popup
	{
		margin-left: auto;
		margin-right: auto;
		background-color: #fff;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		text-align: left;
		padding: 25px;
		padding-right: 20px;
		padding-bottom: 0;
		min-width: 300px;
		position: relative;
		z-index: 30;
	}
	.popup-top
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding-bottom: 20px;
	}
	.popup-top__header
	{
		font-size: 24px;
		font-weight: $medium;
		color: $accent;
		margin-right: 40px;
	}
	.popup-top__close
	{
		line-height: 0;
		cursor: pointer;
		width: 28px;
		img
		{
			width: 100%;
		}
	}
	.popup-post__field
	{
		margin-right: 10px;
	}
	.popup-footer
	{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-top: 15px;
		margin-top: 50px;
		padding-bottom: 25px;
		margin-left: -25px;
		margin-right: -20px;
		padding-left: 25px;
		padding-right: 20px;
		border-top: 1px solid #E1EEF6;
	}
	.popup-footer__btn
	{
		margin-left: 20px;
		&:first-child
		{
			margin-left: 0;
		}
	}
	.popup-body__top
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.content-editor
	{
		padding-top: 40px;
	}
</style>
