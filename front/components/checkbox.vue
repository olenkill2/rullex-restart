<template lang="pug">
	.checkbox-wr
		input.checkbox(
			@change="updateSelf($emit('input', $event.target.checked))",
			:checked="name"
			type="checkbox"
			:class="{'checked': name != false}")
		.checkbox-label
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
			;
		}
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.checkbox-wr
	{
		position: relative;
		display: inline-block;
	}
	.checkbox
	{
		display: none;
		&:checked ~ .checkbox-label
		{
			border-color: $main;
			background-size: 12px;
		}
	}
	.checkbox-label
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
</style>
