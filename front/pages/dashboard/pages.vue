<template lang="pug">
	.content
		|Управление страницами
</template>
<script>
export default {
	layout (context) {
		return 'dashboard'
	},
	middleware: ['authenticated'],
	data: () => ({

	}),
	methods: {
		// async onSubmit(e) {

		// }
	}
}
</script>
<style>
	.form-container
	{
		padding-left: 16px;
		padding-right: 16px;
		padding-top: 20px;
	}
</style>
