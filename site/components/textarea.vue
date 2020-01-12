<template lang="pug">
	label.textarea-wr
		textarea.textarea(:value="name",
			@input="updateSelf($event.target.value)",
			@focus="focused = true; $emit('focus')",
			@blur="focused = false; $emit('blur')",
			:class="{'textarea_focused': focused || name !== ''}")
		.textarea-label
			|{{label}}
</template>
<script>
export default {
	model: {
		prop: "name",
	},
	props: ["name", "label", "type"],
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
	.textarea-wr
	{
		position: relative;
		padding-top: 12px;
		display: block;
	}
	.textarea
	{
		box-shadow: none;
		border: none;
		background-color: transparent;
		font-size: 16px;
		border-bottom: 1px solid $accent;
		left: 0;
		min-height: 32px;
		position: relative;
		padding-bottom: 3px;
		padding-top: 5px;
		font-size: 14px;
		display: block;
		width: 100%;
		resize: vertical;
		min-height: 45px;
	}
	.textarea_error
	{
		border-color: $red;
		& ~ .textarea-label
		{
			color: $red;
		}
	}
	.textarea_focused
	{
		& ~ .textarea-label
		{
			font-size: 12px;
			top: -3px;
			color: $accent;
		}
	}
	.textarea-label
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
