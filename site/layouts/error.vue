<template lang="pug">
	div.error-404-wr
		.error-404-text(v-if="error.statusCode == 404")
			span 404
			//- | Тут ничего нет(((( <br>
			//- |Посмотри&nbsp;
			//- router-link.def-link(to="/")
			//- 	|на главной
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>

<style lang="scss">
	.error-404-wr
	{
		text-align: center;
		padding-top: 50px;
	}
	.error-404-text
	{
		font-size: 18px;
		line-height: 25px;
		span
		{
			font-size: 56px;
			line-height: 52px;
			display: block;
			font-weight: $medium;
			padding-bottom: 30px;
		}
	}
</style>