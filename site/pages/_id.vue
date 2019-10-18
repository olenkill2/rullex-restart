<template lang="pug">
	div.page-content(v-html="pageData.content")
</template>

<script>
	export default {
		asyncData ({$axios, redirect, res, route, error}) {
			return $axios.get('http://127.0.0.1:3002/post-public/' + route.params.id).then((result, error) => {
				return { pageData: result.data }
			}).catch((err) => {
				error({ statusCode: 404, message: 'Post not found' })
			});
		},
		head () {
			return {
				title: this.pageData.title,
				meta: [
					// hid is used as unique identifier. Do not use `vmid` for it as it will not work
					{ hid: 'description', name: 'description', content: this.pageData.description }
				]
			}
		},
		data: () => ({
			pageData: '',
		}),
	}
</script>

<style lang="scss">
	// .page-content
	// {
	// 	padding-top: 30px;
	// 	padding-left: 25px;
	// 	padding-right: 20px;
	// 	padding-bottom: 39px;
	// }
</style>