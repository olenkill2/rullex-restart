<template lang="pug">
	.input-wr
		input.input(:value="value",
			@input="$emit('input', $event.target.value)",
			@focus="focused = true; $emit('focus');",
			@blur="focused = false; $emit('blur'); $emit('input', $event.target.value)",
			@change="$emit('input', $event.target.value)",
			:type="type",
			:name="name",
			:placeholder="placeholder",
			:class="{'input_focused': focused || value !== '' || placeholder, 'input_error': !!error }")
		span.input-error(v-if="!!error")
			|{{error}}
		.input-label
			|{{label}} <span class="input-label__sub">{{labelSubText}}</span>
</template>
<script>
export default {
	props: ["value", "name", "label", "type", "labelSubText", "placeholder", "error"],
	data: () => ({
		focused: false
	}),
	$_veeValidate: {
		name() {
			return this.name;
		},
		value() {
			return this.value;
		}
	},
	created () {

	}
}
</script>
<style lang="scss">
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
		font-size: 16px;
		border-bottom: 1px solid $accent;
		left: 0;
		min-height: 32px;
		z-index: 1;
		position: relative;
		padding-bottom: 3px;
		font-size: 14px;
		display: block;
		width: 100%;
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
	.input-error
	{
		position: absolute;
		left: 0;
		font-size: 12px;
		bottom: -18px;
		color: $red;
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
	.input-label__sub
	{
		color: rgba(98, 103, 125, 0.5);
	}
</style>
