<template lang="pug">
	div.page-content
		| Описание страницы
		a(href="https://accounts.google.com/o/oauth2/v2/auth?client_id=48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com&redirect_uri=http://localhost:3334/vk/?google-auth&scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&access_type=offline&prompt=consent", target="blank") lol
</template>

<script>
	export default {
		async asyncData ({$axios, redirect, res, route}) {
			// try
			// {
			// 	var seo = await $axios('http://127.0.0.1:3002/api/v1/page-seo/', {params: {link: route.path}})
			// 	return seo.data;
			// } catch(err) {
			// 	return {
			// 		title: 'Rullex',
			// 		description: 'Бот для рулеток'
			// 	};
			// }
		},
		head () {
			// return {
			// 	title: this.title,
			// 	meta: [
			// 		// hid is used as unique identifier. Do not use `vmid` for it as it will not work
			// 		{ hid: 'description', name: 'description', content: this.description }
			// 	]
			// }
		},
		data: () => ({
			// title: 'Rullex',
			// description: 'Бот для рулеток',
			// content: 'Расширение для рулеток'
		}),
	}
</script>

<style lang="scss">

</style>