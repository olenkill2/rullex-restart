<template>
  <label class="textarea-wr">
    <textarea
      :class="{'textarea_focused': focused || name !== ''}"
      :value="name"
      @blur="focused = false; $emit('blur')"
      @focus="focused = true; $emit('focus')"
      @input="updateSelf($event.target.value)"
      class="textarea"
    >
    </textarea>
    <div class="textarea-label">{{label}}</div>
  </label>
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
		border-bottom: 1px solid $accent;
		left: 0;
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
