<template lang="pug">
	.category-wr
		.category-input-wr(v-click-outside="hideCategoris")
			field.category-input(type="text", v-model="category", label="Категория", @focus="focus = true")
			.categorys-list(v-show="focus")
				.categorys-list__item(v-for="(category, index) in filteredList", @click="selectCategory(category.index)", :key="index")
					| {{category.category + category.index}}


		button.btn.category-btn(:disabled="filteredList.length != 0", @click="addCategory")
			|+

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
				this.$emit('select', null);
		},
		focus (newValue) {
			// console.log(newValue);
		}
	},
	computed: {
		filteredList() {
			if(this.categoryList.length)
				return this.categoryList.filter((category, index) => {
					category.index = index;
					return category.category.toLowerCase().includes(this.category.toLowerCase())
				})
			return this.categoryList
		},
	},
	methods: {
		addCategory () {
			this.$axios.post('/api/category', {category: this.category}).then((result, error) => {
				this.categoryList.push(result.data);
				this.selectCategory(this.categoryList.length - 1);
			}).catch((error) => {
				this.error = true;
			});
		},
		selectCategory (index) {
			this.focus = false;
			this.category = this.categoryList[index].category;
			this.$emit('select', this.categoryList[index]._id);
		},
		hideCategoris () {
			this.focus = false;
		}
	},
	mounted () {
		if(this.selected.category != null)
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
	@import '../style/variables.scss';
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
		overflow-y: auto;
	}
	.categorys-list__item
	{
		padding: 5px;
	}
	.category-btn
	{
		min-width: 40px;
	}
</style>
