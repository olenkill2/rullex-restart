<template lang="pug">
	.dropdown-wr
		.dropdown-selected(@click="open = !open")
			.dropdown-selected__text
				slot(name="selected", v-bind:current="selectedValue")
					|{{selectedValue}}
			.dropdown-selected__icon(v-if="list.length > 1", :class="{'dropdown-selected__icon_open': open}")
				<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1014.116a.3964.3964 0 00-.5603 0L5.6135 5.053.6763.116a.3965.3965 0 00-.5604 0 .3965.3965 0 000 .5604l5.2078 5.2078A.387.387 0 005.6039 6a.4034.4034 0 00.2802-.116L11.0918.6764a.3882.3882 0 00.0096-.5604z" fill="#62677D"/></svg>

		.dropdown-list(v-if="open", v-click-outside="close")
				.dropdown-list__item(v-for="(item, index) in list", @click="select(index)", v-show="index != selected")
					slot(name="items", v-bind:item="item")
						|{{item}}

		.dropdown-label
			|{{label}} <span class="dropdown-label__sub">{{labelSubText}}</span>
</template>
<script>
export default {
	props: ["list", "model", "value", "label", "labelSubText"],
	data: () => ({
		selected: 0,
		open: false,
	}),
	model: { prop: 'model', event: 'change' },
	methods: {
		select(index) {
			this.selected = index;
			this.$emit("change", this.list[index]);
			this.$emit("select", this.list[index]);
			this.close();
		},
		close() {
			this.open = false;
		}
	},
	computed: {
		selectedValue() {
			return this.model;
		}
	},
	created () {
		this.$emit("change", this.list[this.selected]);
	},
	mounted () {
		this.$emit("change", this.list[this.selected]);
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
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
		// transition: 0.2s;
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
