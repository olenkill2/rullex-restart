<template lang="pug">
	.auth-wr(:class="{'auth-wr_error': error}")
		.auth-header
			|Авторизация

		form(@submit="signin($event)", novalidate)
			.auth-fields
				field.auth-field(v-model="email", label="Email", type="email")
				field.auth-field(v-model="password", label="Password", type="password")

			label.auth-checkbox.checkbox-label-wr
				checkbox(v-model="save")
				span.label-text
					|Запомнить

			.auth-submit-wr
				button.btn.btn_accent.auth-submit(:disabled="!email || !password")
					|Авторизоваться

</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined;
import field from '~/components/input';
import checkbox from '~/components/checkbox';

export default {
	middleware: 'notAuthenticated',
	layout: 'dashboard',
	components: {
		field,
		checkbox
	},
	data: () => ({
		valid: false,
		email: 'a@a.ru',
		password: '1',
		save: false,
		error: false,
		errorText: ''
	}),
	methods: {
		signin(e) {
			this.error = false;
			const data = {
				email: this.email,
				password: this.password,
			}
			e.preventDefault()

			this.$axios.post('/api/signin', data).then((result, error) => {
				if(this.save)
					Cookie.set('authorization', result.data.token);
				this.$store.commit('user/setAuth', result.data);
				this.$router.push('/dashboard');
			}).catch((error) => {
				this.error = true;
			})
		},
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	@keyframes error-set {
		0%
		{
			transform: translateY(0);
		}
		40%
		{
			transform: translateY(-50px);
		}
		80%
		{
			transform: translateY(50px);
		}
		100%
		{
			transform: translateY(0);
		}
	}
	.auth-wr
	{
		margin-top: 60px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		margin-left: auto;
		margin-right: auto;
		padding-left: 68px;
		padding-right: 68px;
		padding-top: 50px;
		padding-bottom: 60px;
		max-width: 400px;
		width: 100%;
	}
	.auth-wr_error
	{
		animation: error-set 0.3s ease;
		border: 1px solid $red;
	}
	.auth-header
	{
		font-size: 36px;
		line-height: normal;
		color: $accent;
		padding-bottom: 15px;
	}
	.auth-field
	{
		margin-bottom: 15px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
	.auth-checkbox
	{
		padding-top: 24px;
	}
	.auth-submit-wr
	{
		padding-top: 35px;
	}
	.auth-submit
	{
		width: 100%;
	}
</style>
