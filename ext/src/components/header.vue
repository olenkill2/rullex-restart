<template lang="pug">
	.header-wr
		.header__left
			.header-stat-top(v-if="$store.state.stateName == 'need-auth'")
				|{{$store.state.stateHeader}}
			.header-stat-top(v-else="")
				|{{$store.state.userBalance}} <span class="header-currency" :class="{'header-currency_minus': $store.state.balanceMinus}">₽</span>
			.header-stat-bottom
				|{{$store.state.stateMessage}}
		.header__right
			transition-group(name="list", tag="div", mode="out-in")
				.header-expand-icon(@click="changeExpand", key="nav-item-1")
					<svg v-if="$store.state.expand" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" fill="#62677D"><path d="M11 2H2v9l1-1V3h7l1-1zM5 14h9V5l-1 1v7H6l-1 1z"/><path d="M16 0h-5l1.8 1.8-4.5 4.5 1.4 1.4 4.5-4.5L16 5V0zM7.7 9.7L6.3 8.3l-4.5 4.5L0 11v5h5l-1.8-1.8 4.5-4.5z"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
					<svg v-else="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0H0v12l1-1V1h10l1-1zM4 16h12V4l-1 1v10H5l-1 1z" fill="#62677D"/><path d="M7 9H2l1.8 1.8L0 14.6 1.4 16l3.8-3.8L7 14V9zM16 1.4L14.6 0l-3.8 3.8L9 2v5h5l-1.8-1.8L16 1.4z" fill="#62677D"/></svg>
				.header-back(v-if="$store.state.router.history.length > 0", @click="$store.dispatch('routerBack')", key="nav-item-2")
					<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1005 5.7452l.025.0055H4.419l3.3657-3.3731c.1648-.1647.2552-.3878.2552-.622a.8738.8738 0 0 0-.2552-.6207L7.261.6109A.8683.8683 0 0 0 6.643.3552a.8681.8681 0 0 0-.6184.255L.255 6.3793a.867.867 0 0 0-.2551.6199.867.867 0 0 0 .255.621l5.7696 5.7695a.8682.8682 0 0 0 .6184.2551.869.869 0 0 0 .6181-.2551l.5237-.524a.8666.8666 0 0 0 .2552-.6181c0-.234-.0904-.442-.2552-.6066L4.381 8.2489h10.7315c.4822 0 .8874-.4156.8874-.8975v-.7411c0-.482-.4172-.865-.8994-.865z" fill="#62677D"/></svg>
</template>
<script>
export default {
	data: () => ({
	}),
	methods: {
		changeExpand () {
			this.$store.commit('updateExpand', !this.$store.state.expand);
		},
	}
}
</script>
<style lang="scss">
	.header-wr
	{
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		padding-left: 10px;
		padding-right: 10px;
	}
	.header-expand-icon
	{
		line-height: 0;
		cursor: pointer;
		transition: 0.2s;
	}
	.header-currency
	{
		font-size: 12px;
		color: $green;
	}
	.header-currency_minus
	{
		color: $red;
	}
	.header-stat-bottom
	{
		font-size: 12px;
		color: $main;
	}
	.header-back
	{
		line-height: 0;
		// padding: 5px;
		cursor: pointer;
		margin-left: 10px;
	}
	.header__right
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		& > div {
			display: flex;
			align-items: center;
		}
	}
</style>
