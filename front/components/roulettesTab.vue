<template lang="pug">
	.modes-wr
		.modes-header
			.modes-header__left
				|Всего режимов - 0
			.modes-header__right
				button.btn.btn_small
					|Добавить

		table.modes-list
			tbody
				tr
					th №
					th Название
					th Список полей
					th Схема
					th Редактирование

</template>
<script>
import field from '~/components/input';
import checkbox from '~/components/checkbox';

export default {
	props: ['opened', 'editData'],
	components: {
		field,
		checkbox
	},
	data: () => ({
		// linkData: {
		// 	name: '',
		// 	url: '',
		// 	category: '',
		// 	order: '',
		// 	private: false,
		// },
		// selectedCategory: '',
		// error: false,
		// model: ''
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
			this.$axios.put('/api/menu', {link: this.linkData}).then((result, error) => {
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
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.modes-list
	{
		width: 100%;
	}
</style>
