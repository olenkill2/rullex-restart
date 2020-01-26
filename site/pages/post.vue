<template lang="pug">
	div
		.page-content
			h1.page-content__header {{pageData.title}}
			.content-element(v-for="item in pageData.content.blocks")
				p {{item}}

</template>

<script>
	export default {
		async asyncData ({$axios, redirect, res, route, error}) {
			let seoData = {
				title: 'Rullex',
				description: 'Бот для рулеток'
			};

			let pageData = null;
			const params = {params: {url: route.path}};

			try {
                const seo = await $axios.get('http://127.0.0.1:3002/api/v1/seo/public/', params);
				seoData = seo.data.data;
			} catch(err) {
				console.log('seo not found');
			}

			try {
                const post = await $axios.get('http://127.0.0.1:3002/api/v1/post/public/', params);
				pageData = post.data.data;
			} catch(err) {
				error({ statusCode: 404, message: 'Post not found' })
			}

			return {seoData, pageData}
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
	.page-content__header
	{
		margin-top: 0;
	}
</style>