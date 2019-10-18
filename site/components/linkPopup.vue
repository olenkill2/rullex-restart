<template lang="pug">
	.popup-box
		.popup-box__layout
		.popup.popup_link
			.popup-top
				.popup-top__header
					|Добавить ссылку
				.popup-top__close(@click="close")
					img(src="~/assets/icons/close.svg")

			.popup-body
				field.popup-link__field(v-model="linkData.name", label="Название")
				field.popup-link__field(v-model="linkData.url", label="Url")
				category.popup-link__field(@select="selectCategory", :selected="editData")
				field.popup-link__field(v-model="linkData.order", label="Вес")
				label.checkbox-label-wr
					checkbox(v-model="linkData.private")
					span.label-text
						|Приватная

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
		checkbox
	},
	data: () => ({
		linkData: {
			name: '',
			url: '',
			category: '',
			order: '',
			private: false,
		},
		selectedCategory: '',
		error: false,
		model: ''
	}),
	methods: {
		close () {
			this.$emit('close');
		},
		addNewItem () {
			this.$axios.post('/api/menu', this.linkData).then((result, error) => {
				this.$emit('update');
				this.close();
			}).catch((error) => {
				this.error = true;
			})
		},
		selectCategory (category) {
			if(category != null)
				this.linkData.category = category;
			else
				this.linkData.category = null
		},
		updateItem () {
			this.$axios.put('/api/menu', this.linkData).then((result, error) => {
				this.$emit('update');
				this.close();
			}).catch((error) => {
				this.error = true;
			});
		},
		removeItem () {
			this.$axios.delete('/api/menu', {data: {link: this.linkData}}).then((result, error) => {
				this.$emit('update');
				this.close();
			}).catch((error) => {
				this.error = true;
			})
		},
	},
	computed:
	{
		edit () {
			if(this.editData)
			{
				this.linkData = {...this.editData};
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
	.popup-link__field
	{
		margin-bottom: 15px;
		&:last-child
		{
			margin-bottom: 0;
		}
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
</style>
