<template>
	<ValidationProvider
    class="input-wr"
    tag="label"
    :vid="vid"
    :name="name || label"
    :rules="rules"
    v-slot="{ errors, required, ariaInput, ariaMsg }"
  >
    <input
      :class="{'input_focused': focused || innerValue !== '' || placeholder, 'input_error': errors[0]}"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="name"
      @blur="focused = false"
      @focus="focused = true"
      class="input"
      ref="input"
      v-model="innerValue"
    />
    <div class="input-label">
      {{label}}
    </div>
    <span class="input-error" v-if="errors[0]">{{ errors[0] }}</span>
  </ValidationProvider>
</template>
<script>

export default {
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
	data() {
	  return {
      focused: false,
      innerValue: '',
    }
  },
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
			if(this.innerValue !== val)
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
	.input-wr
	{
		position: relative;
		padding-top: 12px;
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
		bottom: -16px;
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
		transition: 0.2s;
		color: rgba($main, 0.5);
	}
</style>
