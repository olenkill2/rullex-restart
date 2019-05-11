<template lang="pug">
	.input-wr
		input.input(:value="name",
			@input="updateSelf($event.target.value)",
			@focus="focused = true; $emit('focus')",
			@blur="focused = false; $emit('blur')",
			:type="type",
			:placeholder="placeholder"
			:class="{'input_focused': focused || name !== '' || placeholder}")
		.input-label
			|{{label}}
</template>
<script>
export default {
	model: {
		prop: "name",
	},
	props: ["name", "label", "type", "placeholder"],
	data: () => ({
		focused: false
	}),
	methods: {
		updateSelf(name) {
			this.$emit("input", name);
		}
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.input-wr
	{
		position: relative;
		padding-top: 12px;
	}
	.input
	{
		box-shadow: none;
		border: none;
		background-color: transparent;
		border-bottom: 1px solid $accent;
		left: 0;
		min-height: 32px;
		z-index: 1;
		position: relative;
		padding-bottom: 3px;
		font-size: 14px;
		display: block;
		width: 100%;
		min-width: 60px;
	}
	.input_error
	{
		border-color: $red;
		& ~ .input-label
		{
			color: $red;
		}
	}
	.input_focused
	{
		& ~ .input-label
		{
			font-size: 12px;
			top: -3px;
			color: $accent;
		}
	}
	.input-label
	{
		position: absolute;
		width: 100%;
		top: 16px;
		left: 0;
		z-index: 0;
		transition: 0.2s;
		color: rgba($main, 0.5);
	}
</style>
