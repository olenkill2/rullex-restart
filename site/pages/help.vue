<template lang="pug">
	div.page-content
		| help
</template>

<script>
	export default {
		async asyncData ({$axios, redirect, res, route}) {
			try
			{
                var seo = await $axios.get('http://127.0.0.1:3002/api/v1/seo/', {params: {url: 'help'}})

				return {seoData: seo.data.data};
			} catch(err) {
				return {
					title: 'Rullex',
					description: 'Бот для рулеток'
				};
			}
		},
		head () {
			return {
				title: this.seoData.title,
				meta: [
					{ hid: 'description', name: 'description', content: this.seoData.description },
					{ hid: 'og:title', name: 'og:title', content: this.seoData.ogTitle },
					{ hid: 'og:descriptio ', name: 'og:descriptio ', content: this.seoData.ogDescription },
				]
			}
		},
		data: () => ({
			// seoData
		}),
	}
</script>

<style lang="scss">

</style>