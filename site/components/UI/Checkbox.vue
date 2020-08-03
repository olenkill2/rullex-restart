<template>
	<label
    class="checkbox-wr"
    :class="[ $options._componentTag, { checked: checked, disabled: $attrs.disabled }]"
  >
    <input
      class="checkbox-input"
      type="checkbox"
      v-bind="$attrs"
      v-model="model"
      :value="$attrs.value"
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
	model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: [String, Number, Boolean, Array],
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  }
};
</script>
<style lang="scss">
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
