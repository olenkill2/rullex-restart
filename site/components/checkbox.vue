<template lang="pug">
	label.checkbox-wr
		input.checkbox(
			@change="change",
			:name="name",
			type="checkbox",
			:checked="isChecked",
			:class="{'checked': isChecked}")
		.checkbox-box
		.checkbox-label
			|{{label}}
</template>
<script>
export default {
	name: "checkbox",
	model: {
		prop: "checked",
		event: "change"
	},
	props: ["checked", "value", "name", "label"],
	computed: {
		isChecked() {
			if(typeof this.checked != 'boolean')
				return this.checked.includes(this.value);
			else
			{
				console.log(this.checked);
				return this.checked;
			}
		}
	},
	methods: {
		change(e) {
			if(typeof this.checked != 'boolean')
			{
				const checked = this.checked.slice();
				const found = checked.indexOf(this.value);
				if (found !== -1) {
					checked.splice(found, 1);
				} else {
					checked.push(this.value);
				}
				this.$emit("change", checked);
			}
			else
			{
				this.$emit("change", e.target.checked);
			}
		}
	}
};
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.checkbox-wr
	{
		position: relative;
		display: flex;
		align-items: center;
	}
	.checkbox
	{
		display: none;
		&:checked ~ .checkbox-box
		{
			border-color: $main;
			background-image: url('../assets/icons/check.svg');
		}
	}
	.checkbox-box
	{
		width: 20px;
		height: 20px;
		border: 1px solid #C5DFF0;
		background-color: #fff;
		cursor: pointer;
		transition: 0.2s;
		background-size: 70%;
		background-position: center;
		background-repeat: no-repeat;
	}
	.checkbox-label
	{
		margin-left: 8px;
		line-height: 16px;
		color: $main;
		font-size: 16px;
	}
</style>
