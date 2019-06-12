<template lang="pug">
	.dropdown-wr
		.dropdown-selected(@click="open = !open", v-if="list.length > 1")
			.dropdown-selected__text
				|{{selectedValue}}
			.dropdown-selected__icon(:class="{'dropdown-selected__icon_open': open}")

		.dropdown-selected(v-else="")
			.dropdown-selected__text
				|{{selectedValue}}

		.dropdown-list(v-if="open", v-click-outside="close")
			.dropdown-list__item(v-for="(item, index) in list", @click="select(index)", v-if="index != selected")
				|{{item}}

		.dropdown-label
			|{{label}} <span class="dropdown-label__sub">{{labelSubText}}</span>
</template>
<script>
export default {
	props: ["list", "label", "labelSubText"],
	data: () => ({
		selected: 0,
		open: false,
	}),
	methods: {
		select(index) {
			this.selected = index;
			this.$emit("input", this.list[index]);
			this.close();
		},
		updateSelf() {
			this.$emit("input", this.list[this.selected]);
		},
		close() {
			this.open = false;
		}
	},
	computed: {
		selectedValue() {
			return this.list[this.selected];
		}
	},
	created () {
		this.$emit("input", this.list[this.selected]);
	},
	mounted () {
		this.$emit("input", this.list[this.selected]);
	}
}
</script>
<style lang="scss">
	.dropdown-wr
	{
		position: relative;
		padding-top: 12px;
		width: 100%;
		min-width: 90px;
	}
	.dropdown-selected
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
	.dropdown-label
	{
		position: absolute;
		width: 100%;
		top: 16px;
		left: 0;
		z-index: 0;
		transition: 0.2s;
		color: rgba($main, 0.5);
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
		z-index: 9;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	}
	.dropdown-list__item
	{
		padding: 4px;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
		color: $main;
		transition: 0.2s;
		&:hover
		{
			background-color: rgba($main, 0.05);
			color: $accent;
		}
	}
	.dropdown-selected
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.dropdown-selected__icon
	{
		position: absolute;
		width: 8px;
		height: 8px;
		right: 0;
		border-right: 1px solid $main;
		border-bottom: 1px solid $main;
		transform: rotate(45deg);
		transform-origin: center;
		transition: 0.2s;
	}
	.dropdown-selected__icon_open
	{
		transform: rotate(225deg) translateY(-4px);
		// margin-top: 4px;
	}
</style>
