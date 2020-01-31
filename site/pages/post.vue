<template lang="pug">
	div
		.page-content
			h1.page-content__header {{pageData.title}}

			component(
				v-for="(block, key) in pageData.content.blocks",
				:key="key"
				:is="'co_' + block.type",
				v-if="haveComponent('co_' + block.type)",
				:block="block")

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
		data: () => ({}),
		components: {
			co_header: () => import('../components/content/header'),
			co_delimiter: () => import('../components/content/delimiter'),
			co_list: () => import('../components/content/list'),
			co_paragraph: () => import('../components/content/paragraph'),
			co_images: () => import('../components/content/images'),
		},
		methods: {
			haveComponent(name) {
				return Object.keys(this.$options.components).includes(name);
			}
		},
	}
</script>

<style lang="scss">
	.page-content__header
	{
		margin-top: 0;
	}
</style>