<template lang="pug">
	ValidationProvider.input-wr(tag="label",
		:vid="vid",
		:name="name || label",
		v-slot="{ errors, required, ariaInput, ariaMsg }")
		input.input(:value="name",
			@input="updateSelf($event.target.value)",
			@focus="focused = true; $emit('focus')",
			@blur="focused = false; $emit('blur')",
			:type="type",
			:placeholder="placeholder"
			:class="{'input_focused': focused || name !== '' || placeholder, 'input_error': errors[0]}")
		.input-label
			|{{label}}
		span.input-error(v-if="errors[0]")
			|{{ errors[0] }}
</template>
<script>
import { ValidationProvider } from "vee-validate";

export default {
	model: {
		prop: "name",
	},
	components: {
		ValidationProvider
	},
	props: {
		name: {
			type: String,
			default: ""
		},
		label: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "text",
			validator(value) {
				return [
					"url",
					"text",
					"password",
					"tel",
					"search",
					"number",
					"email"
				].includes(value);
			}
		},
		placeholder: {
			type: String,
			default: ""
		},
		rules: {
			type: String,
			default: ""
		},
		vid: {
			type: String,
			default: undefined
		},
	},
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
		padding-top: 10px;
		display: block;
	}
	.input
	{
		box-shadow: none;
		border: none;
		background-color: transparent;
		border-bottom: 1px solid $accent;
		min-height: 32px;
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
			top: -2px;
			color: $accent;
		}
	}
	.input-label
	{
		position: absolute;
		width: 100%;
		top: 16px;
		left: 0;
		// z-index: -1;
		transition: 0.2s;
		color: rgba($main, 0.5);
	}
</style>
