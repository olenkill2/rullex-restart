<template>
	<label
    class="checkbox-wr"
    :class="[ $options._componentTag, { checked: checked, disabled: $attrs.disabled }]"
  >
    <input
      class="checkbox-input"
      type="checkbox"
      v-bind="$attrs"
      :checked="checked"
      :value="value"
      @change="update"
    />
    <div class="checkbox-box"></div>
    <div class="checkbox-label">
      <slot>{{label}}</slot>
    </div>
  </label>
</template>
<script>
export default {
	inheritAttrs: false,
	model: { prop: 'model', event: 'change' },
	props: {
		value:      { default: null  },
		model:      { default: false },
		trueValue:  { default: true  },
		falseValue: { default: false },
		label:      { default: '' }
	},
	computed: {
		checked() {
			if(this.model instanceof Array) {
				for(let mode of this.model) {
					if(JSON.stringify(mode) == JSON.stringify(this.value)) return mode;
				}
			}
			else {
				return (this.model === this.trueValue);
			}
		}
	},
	methods: {
		update(e) {
			let checked = e.target.checked;
			if (this.model instanceof Array) {
				let value = [...this.model];
				(checked) ? value.push(this.value) : value.splice(value.indexOf(this.value), 1);
				this.$emit('change', value);
			} else {
				this.$emit('change', checked ? this.trueValue : this.falseValue);
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
	.checkbox-input
	{
		display: none;
		&:checked ~ .checkbox-box
		{
			border-color: $main;
			background-image: url('../../assets/icons/check.svg');
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
