<template lang="pug">
	.mode-wr
		.mode-input-wr(v-click-outside="hideCategoris")
			field.mode-input(type="text", v-model="mode", label="Категория", @focus="focus = true")
			.modes-list(v-show="focus")
				.modes-list__item(v-for="(mode, index) in filteredList", @click="selectmode(mode.index)", :key="index")
					| {{mode.name}}

</template>
<script>
import field from '~/components/input';
export default {
	components: {
		field
	},
	props: ['selected'],
	data: () => ({
		mode: '',
		focus: false,
		modeList: [],
	}),
	watch: {
		mode (newValue) {
			if(newValue == '')
				this.$emit('select', null);
		},
		focus (newValue) {
			// console.log(newValue);
		}
	},
	computed: {
		filteredList() {
			if(this.modeList.length)
				return this.modeList.filter((mode, index) => {
					mode.index = index;
					return mode.mode.toLowerCase().includes(this.mode.toLowerCase())
				})
			return this.modeList
		},
	},
	methods: {
		addmode () {
			this.$axios.post('/api/mode', {mode: this.mode}).then((result, error) => {
				this.modeList.push(result.data);
				this.selectmode(this.modeList.length - 1);
			}).catch((error) => {
				this.error = true;
			});
		},
		selectmode (index) {
			this.focus = false;
			this.mode = this.modeList[index].mode;
			this.$emit('select', this.modeList[index]._id);
		},
		hideCategoris () {
			this.focus = false;
		}
	},
	mounted () {
		if(this.selected.mode != null)
			this.mode = this.selected.mode.mode;

		this.$axios.get('/api/modes').then((result, error) => {
			this.modeList = result.data.data;
		}).catch((error) => {
			this.error = true;
		});
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.mode-wr
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.mode-input-wr
	{
		flex: 1;
		margin-right: 8px;
		position: relative;
	}
	.modes-list
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

	.modes-list__item
	{
		padding: 5px;
	}
	.mode-btn
	{
		min-width: 40px;
	}

</style>