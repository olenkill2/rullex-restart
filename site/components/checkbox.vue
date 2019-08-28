<template lang="pug">
	label.checkbox-wr
		input.checkbox(
			@change="updateSelf($emit('input', $event.target.checked))",
			:checked="name"
			type="checkbox"
			:class="{'checked': name != false}")
		.checkbox-box
		.checkbox-label
			|{{label}}
</template>
<script>
export default {
	model: {
		prop: "name",
	},
	props: ["name", "label", "type"],
	data: () => ({
	}),
	methods: {
		updateSelf(name) {
		}
	}
}
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
			background-size: 12px;
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
		background-image: url('../assets/icons/check.svg');
		background-position: center;
		background-size: 0;
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
