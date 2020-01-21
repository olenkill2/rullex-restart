<template lang="pug">
	ValidationProvider.input-wr(tag="label",
		:vid="vid",
		:name="name || label",
		:rules="rules",
		v-slot="{ errors, required, ariaInput, ariaMsg }")
		input.input(:value="name",
			@focus="focused = true; $emit('focus')",
			@blur="focused = false; $emit('blur')",
			:type="type",
			:placeholder="placeholder",
			:name="name",
			ref="input",
			v-model="innerValue",
			:class="{'input_focused': focused || innerValue !== '' || placeholder, 'input_error': errors[0]}")
		.input-label
			|{{label}}
		span.input-error(v-if="errors[0]")
			|{{ errors[0] }}
</template>
<script>
// import { extend } from 'vee-validate';
// import { required, email } from 'vee-validate/dist/rules';
// extend('required', {
// 	...required,
// 	message: 'Поле не заполнено'
// });
import { ValidationProvider } from "vee-validate";

export default {
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
		value: {
			type: null,
			default: ""
		}
	},
	data: () => ({
		focused: false,
		innerValue: '',
	}),
	computed: {
		hasValue() {
			return !!this.innerValue;
		}
	},
	watch: {
		innerValue(value) {
			this.$emit('input', value);
		},
		value(val) {
			if(this.innerValue != val)
				this.innerValue = val;
		},
	},
	created() {
		if(this.value)
			this.innerValue = this.value;
	},
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.input-wr
	{
		position: relative;
		padding-top: 10px;
		display: block;
		padding-bottom: 18px;
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
		& ~ .input-error
		{
			opacity: 1;
		}
	}
	.input-error
	{
		font-size: 12px;
		position: absolute;
		left: 0;
		bottom: 0;
		color: $red;
		opacity: 0;
		transition: 0.2s;
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
