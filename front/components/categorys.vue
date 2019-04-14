<template lang="pug">
	.category-wr
		.category-input-wr
			field.category-input(type="text", v-model="category", label="Категория", @focus="focus = true")
			.categorys-list(v-show="focus")
				.categorys-list__item(v-for="(category, index) in categoryList", @click="selectCategory(index)", :key="index")
					| {{category.category}}

		button.btn.category-btn
			|Добавить

</template>
<script>
import field from '~/components/input';
export default {
	components: {
		field
	},
	props: ['selected'],
	data: () => ({
		category: '',
		focus: false,
		categoryList: [],
	}),
	watch: {
		category (newValue) {
			if(newValue == '')
				this.$emit('select', '');
		}
	},
	methods: {
		addCategory () {
			this.$axios.post('/api/category', {category}).then((result, error) => {
				this.categoryList.push(result.data.data);
			}).catch((error) => {
				this.error = true;
			});
		},
		selectCategory (index) {
			this.focus = false;
			this.category = this.categoryList[index].category;
			this.$emit('select', {...this.categoryList[index]});
		}
	},
	mounted () {
		if(typeof this.selected.category != 'undefined')
			this.category = this.selected.category.category;

		this.$axios.get('/api/category').then((result, error) => {
			this.categoryList = result.data.data;
		}).catch((error) => {
			this.error = true;
		});
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.category-wr
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.category-input-wr
	{
		flex: 1;
		margin-right: 8px;
		position: relative;
	}
	.categorys-list
	{
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		max-height: 150px;
		background-color: #fff;
		z-index: 4;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	}
	.categorys-list__item
	{
		padding: 5px;
	}
</style>
