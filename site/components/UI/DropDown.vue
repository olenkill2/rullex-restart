<template>
  <div class="dropdown-wr" tabindex="1">
    <div
      @click="open = !open"
      class="dropdown-selected"
    >
      <div class="dropdown-selected__text">
        {{ selected ? selected.label : 'Выберите...' }}
      </div>
      <div
        v-if="options.length > 1"
        class="dropdown-selected__icon"
        :class="{'dropdown-selected__icon_open': open}"
      >
        <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1014.116a.3964.3964 0 00-.5603 0L5.6135 5.053.6763.116a.3965.3965 0 00-.5604 0 .3965.3965 0 000 .5604l5.2078 5.2078A.387.387 0 005.6039 6a.4034.4034 0 00.2802-.116L11.0918.6764a.3882.3882 0 00.0096-.5604z" fill="#62677D" /></svg>
      </div>
    </div>

    <div
      v-if="open && options.length"
      v-click-outside="close"
      class="dropdown-list"
    >
      <div
        v-for="(item, index) in options"
        :key="index"
        @click="select(item)"
        class="dropdown-list__item"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="dropdown-label">
      {{label}} <span class="dropdown-label__sub">{{labelSubText}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['options', 'value', 'label', 'labelSubText'],
  name: 'DropDown',
  model: { prop: 'model', event: 'input' },
  data() {
    return {
      selected: null,
      open: false
    }
  },
  mounted() {
    if (this.value) {
      this.select(this.value)
    } else {
      this.select(this.options[0].value)
    }
  },
  watch: {
    value(newValue) {
      this.select(this.value)
    }
  },
  methods: {
    select(value) {
      const option = this.options.find((option) => {
        return value.value === option.value
      })

      this.selected = option || this.options[0]
      this.$emit('input', this.selected)
      this.close()
    },
    close() {
			this.open = false
		}
  }
}
</script>
<style lang="scss">
	.dropdown-wr
	{
		position: relative;
		padding-top: 12px;
		width: 100%;
	}
	.dropdown-selected
	{
		background-color: transparent;
		border-bottom: 1px solid $accent;
		z-index: 1;
		position: relative;
		font-size: 14px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		min-height: 32px;
	}
	.dropdown-label
	{
		position: absolute;
		width: 100%;
		left: 0;
		z-index: 0;
		transition: 0.2s;
		font-size: 12px;
		top: -3px;
		color: $accent;
	}
	.dropdown-label__sub
	{
		color: rgba(98, 103, 125, 0.5);
	}
	.dropdown-list
	{
		position: absolute;
		left: 0;
		top: 100%;
		width: 100%;
		background-color: #fff;
		z-index: 2;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	}
	.dropdown-list__item
	{
		padding: 4px;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
		color: $main;
		&:hover
		{
			background-color: rgba($main, 0.05);
			color: $accent;
		}
	}
	.dropdown-selected__icon
	{
		svg
		{
			transform-origin: center;
			transition: transform .24s;
		}
	}
	.dropdown-selected__icon_open
	{
		svg
		{

			transform: rotate(180deg);
		}
	}
</style>
