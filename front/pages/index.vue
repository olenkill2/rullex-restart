<template lang="pug">
	div.page-content
		|lorem
</template>

<script>
	export default {
		async asyncData ({$axios, redirect, res, route}) {
			try
			{
				var seo = await $axios('http://127.0.0.1:3002/page-seo', {params: {link: route.path}})
				return seo.data;
			} catch(err) {
				return {
					title: 'Rullex',
					description: 'Бот для рулеток'
				};
			}
		},
		head () {
			return {
				title: this.title,
				meta: [
					// hid is used as unique identifier. Do not use `vmid` for it as it will not work
					{ hid: 'description', name: 'description', content: this.description }
				]
			}
		},
		data: () => ({
			title: 'Rullex',
			description: 'Бот для рулеток'
		}),
	}
</script>

<style lang="scss">

</style>