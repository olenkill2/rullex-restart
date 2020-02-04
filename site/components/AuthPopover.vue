<template lang="pug">
	div.main-auth
		button.btn-login-activator(@click="open")
			.btn-login-activator__text
				|Войти в личный кабинет
			.btn-login-activator__icon
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 612 612" fill="#292F44"><path d="M331.685 425.378c-7.478 7.479-7.478 19.584 0 27.043 7.479 7.478 19.584 7.478 27.043 0l131.943-131.962c3.979-3.979 5.681-9.276 5.412-14.479.269-5.221-1.434-10.499-5.412-14.477L358.728 159.56c-7.459-7.478-19.584-7.478-27.043 0-7.478 7.478-7.478 19.584 0 27.042l100.272 100.272H19.125C8.568 286.875 0 295.443 0 306s8.568 19.125 19.125 19.125h412.832L331.685 425.378zM535.5 38.25H153c-42.247 0-76.5 34.253-76.5 76.5v76.5h38.25v-76.5c0-21.114 17.117-38.25 38.25-38.25h382.5c21.133 0 38.25 17.136 38.25 38.25v382.5c0 21.114-17.117 38.25-38.25 38.25H153c-21.133 0-38.25-17.117-38.25-38.25v-76.5H76.5v76.5c0 42.247 34.253 76.5 76.5 76.5h382.5c42.247 0 76.5-34.253 76.5-76.5v-382.5c0-42.247-34.253-76.5-76.5-76.5z"/></svg>

		.auth-popover-wr(:class="{'auth-popover-wr_opened': opened}" v-if="opened" v-click-outside="close")
			.auth-popover-tab(v-if="activeTab == 'signIn'")
				form(@submit.prevent="signin")
					.auth-popover-header
						|Авторизация
					.auth-popover-fields
						field.auth-popover-field(v-model="signinData.email", label="Email")
						field.auth-popover-field(v-model="signinData.password", name="password", type="password", label="Пароль")

					checkbox.auth-save(v-model="signinData.save", label="запомнить")

					button.btn.btn_accent.btn-auth
						|Войти

				.auth-popover-deliter
					|или
				.auth-popover-social
					a.auth-popover-social__item(:href="goUrl")
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25"><rect width="25" height="25" rx="4" fill="#fff"/></mask><g mask="url(#a)"><path d="M0 0v25h25V0H0zm14.5739 13.5517c-.4275 2.8084-2.5213 4.4184-5.232 4.4184-3.0463 0-5.516-2.4697-5.516-5.516 0-3.0455 2.4697-5.5152 5.516-5.5152 1.4735 0 2.7647.5258 3.7045 1.4386l-1.583 1.583c-.5362-.54-1.2698-.828-2.1216-.828-1.7931 0-3.247 1.5291-3.247 3.3215 0 1.794 1.4539 3.2787 3.247 3.2787 1.5029 0 2.6411-.7264 2.9694-2.181H9.3418v-2.2151h5.2186c.0627.3569.0944.7304.0944 1.1174a7.2858 7.2858 0 0 1-.0809 1.0977zm6.6239-.6868H19.265v1.932h-1.3728v-1.932h-1.9328v-1.3737h1.9328V9.5585h1.3728v1.9327h1.9328v1.3737z" fill="#DD4B39"/></g></svg>

					a.auth-popover-social__item(:href="vkUrl")
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 0H4C1.7909 0 0 1.7909 0 4v17c0 2.2091 1.7909 4 4 4h17c2.2091 0 4-1.7909 4-4V4c0-2.2091-1.7909-4-4-4z" fill="#44678D"/><path d="M6.4764 7.6081c.5992 1.4796 1.3585 2.8746 2.3586 4.127.1327.1666.2999.3148.476.4354.2573.1767.5.1146.6046-.1797.1107-.3088.2122-.9348.2183-1.2591.0165-.8474-.0025-1.4028-.048-2.2492-.0295-.542-.2223-1.018-1.0197-1.1617-.2462-.0446-.269-.2473-.1109-.4495.3294-.421.7882-.488 1.2858-.5146.8064-.0435 1.6157-.008 2.4231 0 .3289.003.6597.0295.9836.1001.4224.0921.6487.3885.7183.8009.036.2127.0546.4314.0495.6467-.021.925-.0655 1.8495-.0761 2.774-.0045.3629.022.7348.0997 1.0882.1086.4925.4439.6162.7868.2603.4355-.452.8194-.9605 1.1798-1.4771.6547-.9395 1.1437-1.9706 1.5647-3.0337.2177-.5486.3844-.6677.9745-.6692a610.0795 610.0795 0 0 1 3.3276 0c.1967.001.4024.0195.5881.0786.3014.096.421.3418.3504.6537-.1647.7308-.5596 1.352-.9825 1.9491-.6788.9581-1.3901 1.8931-2.0848 2.8401-.0886.1206-.1666.2493-.2393.3799-.2598.4695-.2417.7328.1372 1.1237.6031.6222 1.2489 1.2042 1.833 1.8434.4245.4651.8173.9696 1.1537 1.5006.4255.6718.1627 1.3044-.6321 1.417-.5001.0707-2.9426.0006-3.0688 0-.6567-.0029-1.2324-.2307-1.6959-.6767-.5155-.4965-.9841-1.0411-1.4791-1.5592-.1492-.1561-.3084-.3058-.48-.4365-.405-.3088-.8024-.2402-.9916.2353-.1617.4085-.3013 1.4811-.3078 1.5727-.0341.479-.3389.7844-.8755.8139-1.5492.0841-3.0503-.0886-4.4488-.8379-1.1853-.6347-2.1318-1.5322-2.9517-2.5788-1.3024-1.6624-2.3311-3.4897-3.2703-5.3707-.048-.0962-.9993-2.1204-1.0249-2.216-.085-.3201-.0057-.626.2648-.7312.1686-.0656 3.305-.0003 3.3572.0025.5005.0271.8417.2383 1.0526.7577z" fill="#fff"/></svg>

				.auth-popover-actions
					//- .auth-popover-actions__left
					//- 	span.auth-popover-actions-reset
					//- 		|Забыли пароль?
					.auth-popover-actions__right
						span.auth-popover-actions-sign-up(@click="setActiveTab('signUp')")
							|Регистрация

			.auth-popover-tab(v-if="activeTab == 'signUp'")
				form(@submit.prevent="signUp")
					.auth-popover-header
						|Регистрация
					.auth-popover-fields
						field.auth-popover-field(v-model="signupData.email", label="Email")
						field.auth-popover-field(v-model="signupData.password", name="password", type="password", label="Пароль")
						field.auth-popover-field(v-model="signupData.againPassword", name="passwordAgain", type="password", label="Еще раз пароль")

					button.btn.btn_accent.btn-auth
						|Зарегистрироваться

				.auth-popover-deliter
					|или
				.auth-popover-social
					a.auth-popover-social__item(:href="goUrl")
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25"><rect width="25" height="25" rx="4" fill="#fff"/></mask><g mask="url(#a)"><path d="M0 0v25h25V0H0zm14.5739 13.5517c-.4275 2.8084-2.5213 4.4184-5.232 4.4184-3.0463 0-5.516-2.4697-5.516-5.516 0-3.0455 2.4697-5.5152 5.516-5.5152 1.4735 0 2.7647.5258 3.7045 1.4386l-1.583 1.583c-.5362-.54-1.2698-.828-2.1216-.828-1.7931 0-3.247 1.5291-3.247 3.3215 0 1.794 1.4539 3.2787 3.247 3.2787 1.5029 0 2.6411-.7264 2.9694-2.181H9.3418v-2.2151h5.2186c.0627.3569.0944.7304.0944 1.1174a7.2858 7.2858 0 0 1-.0809 1.0977zm6.6239-.6868H19.265v1.932h-1.3728v-1.932h-1.9328v-1.3737h1.9328V9.5585h1.3728v1.9327h1.9328v1.3737z" fill="#DD4B39"/></g></svg>
					a.auth-popover-social__item(:href="vkUrl")
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 0H4C1.7909 0 0 1.7909 0 4v17c0 2.2091 1.7909 4 4 4h17c2.2091 0 4-1.7909 4-4V4c0-2.2091-1.7909-4-4-4z" fill="#44678D"/><path d="M6.4764 7.6081c.5992 1.4796 1.3585 2.8746 2.3586 4.127.1327.1666.2999.3148.476.4354.2573.1767.5.1146.6046-.1797.1107-.3088.2122-.9348.2183-1.2591.0165-.8474-.0025-1.4028-.048-2.2492-.0295-.542-.2223-1.018-1.0197-1.1617-.2462-.0446-.269-.2473-.1109-.4495.3294-.421.7882-.488 1.2858-.5146.8064-.0435 1.6157-.008 2.4231 0 .3289.003.6597.0295.9836.1001.4224.0921.6487.3885.7183.8009.036.2127.0546.4314.0495.6467-.021.925-.0655 1.8495-.0761 2.774-.0045.3629.022.7348.0997 1.0882.1086.4925.4439.6162.7868.2603.4355-.452.8194-.9605 1.1798-1.4771.6547-.9395 1.1437-1.9706 1.5647-3.0337.2177-.5486.3844-.6677.9745-.6692a610.0795 610.0795 0 0 1 3.3276 0c.1967.001.4024.0195.5881.0786.3014.096.421.3418.3504.6537-.1647.7308-.5596 1.352-.9825 1.9491-.6788.9581-1.3901 1.8931-2.0848 2.8401-.0886.1206-.1666.2493-.2393.3799-.2598.4695-.2417.7328.1372 1.1237.6031.6222 1.2489 1.2042 1.833 1.8434.4245.4651.8173.9696 1.1537 1.5006.4255.6718.1627 1.3044-.6321 1.417-.5001.0707-2.9426.0006-3.0688 0-.6567-.0029-1.2324-.2307-1.6959-.6767-.5155-.4965-.9841-1.0411-1.4791-1.5592-.1492-.1561-.3084-.3058-.48-.4365-.405-.3088-.8024-.2402-.9916.2353-.1617.4085-.3013 1.4811-.3078 1.5727-.0341.479-.3389.7844-.8755.8139-1.5492.0841-3.0503-.0886-4.4488-.8379-1.1853-.6347-2.1318-1.5322-2.9517-2.5788-1.3024-1.6624-2.3311-3.4897-3.2703-5.3707-.048-.0962-.9993-2.1204-1.0249-2.216-.085-.3201-.0057-.626.2648-.7312.1686-.0656 3.305-.0003 3.3572.0025.5005.0271.8417.2383 1.0526.7577z" fill="#fff"/></svg>

				.auth-popover-actions
					//- .auth-popover-actions__left
					//- 	span.auth-popover-actions-reset
					//- 		|Забыли пароль?
					.auth-popover-actions__right
						span.auth-popover-actions-sign-up(@click="setActiveTab('signIn')")
							|Авторизация
</template>
<script>
import field from '~/components/input';
import checkbox from '~/components/checkbox';
import { mapActions } from 'vuex';

export default {
	props: [],
	components: {
		field,
		checkbox
	},
	data: () => ({
		opened: false,
		activeTab: 'signIn',
		signinData: {
			email: '',
			password: '',
			save: false,
		},
		signupData: {
			email: '',
			password: '',
			againPassword: '',
		},
		error: false,
	}),
	computed: {
		vkUrl () {
			const redirectTo = window.location.origin + '/oauth/?from=vk';
			return `http://oauth.vk.com/authorize?client_id=7101695&display=page&redirect_uri=${redirectTo}&scope=email&response_type=code&v=5.52`;
		},
		goUrl () {
			const redirectTo = window.location.origin + '/oauth/?from=google';
			return `https://accounts.google.com/o/oauth2/v2/auth?client_id=48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com&redirect_uri=${redirectTo}&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&access_type=offline&prompt=consent`;
		},
	},
	methods: {
		...mapActions({ auth: 'user/auth'}),
		setActiveTab(tabName) {
			this.activeTab = tabName;
		},
		close() {
			this.opened = false;
		},
		open() {
			this.opened = !this.opened;
		},
		async signUp() {
			this.error = false;
			try {
				const res = await this.$axios.post('/api/users/signup', this.signupData);
				this.auth(res.data);
				this.close();
			} catch (error) {
				this.error = true;
			}
		},
		async signin() {
			this.error = false;
			try {
				const res = await this.$axios.post('/api/users/signin', this.signinData);
				this.auth(res.data);
				this.close();
			} catch (error) {
				this.error = true;
			}
		},
		mounted() {

		}
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.main-auth
	{
		position: relative;
		flex-basis: 19%;;
		display: flex;
		justify-content: flex-end;
	}
	.auth-popover-wr
	{
		position: absolute;
		background-color: #fff;
		right: 0;
		top: 200%;
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 34px;
		min-width: 288px;
		border-radius: 4px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		transform: tranlateX(40px);
		transition: 0.2s;
		opacity: 0;
	}
	.auth-popover-wr_opened
	{
		opacity: 1;
		transform: tranlateX(0);
	}
	.auth-popover-header
	{
		padding-bottom: 10px;
		font-size: 18px;
		color: $accent;
		font-weight: $medium;
	}
	.auth-popover-fields
	{
		margin-bottom: 25px;
	}
	.auth-popover-field
	{
		margin-bottom: 15px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
	.auth-save
	{
		padding-top: 7px;
		margin-bottom: 30px;
	}
	.btn-auth
	{
		width: 100%;
		font-size: 14px;
		height: 35px;
	}
	.auth-popover-deliter
	{
		margin-top: 10px;
		margin-bottom: 10px;
		text-align: center;
		font-size: 10px;
		color: $main;
	}
	.auth-popover-social
	{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.auth-popover-social__item
	{
		margin-left: 8px;
		margin-right: 8px;
		line-height: 0;
		cursor: pointer;
		transition: 0.2s;
		&:hover
		{
			opacity: 0.7;
			// transform: scale(1.05);
		}
	}
	.auth-popover-actions
	{
		display: flex;
		justify-content: center;
		width: 100%;
		align-items: center;
		margin-top: 25px;
	}
	.auth-popover-actions__left
	{
		// flex-basis: 50%;
		// text-align: right;
	}
	.auth-popover-actions__right
	{
		// flex-basis: 50%;
		// text-align: left;
	}
	.auth-popover-actions-reset
	{
		font-size: 12px;
		line-height: 12px;
		cursor: pointer;
		padding-right: 8px;
		border-right: 1px solid $main;
	}
	.auth-popover-actions-sign-up
	{
		padding-left: 8px;
		font-size: 12px;
		line-height: 12px;
		color: $blue;
		cursor: pointer;
	}
	.btn-login-activator
	{
		color: $blue;
		border: none;
		box-shadow: none;
		background: none;
		cursor: pointer;
		font-size: 16px;
		font-weight: $medium;
		white-space: nowrap;
		padding-right: 0;
	}
	.btn-login-activator__icon
	{
		display: none;
	}

	@media (max-width: $mobile)
	{
		.main-auth
		{
			flex: 1;
		}
		.btn-login-activator__text
		{
			display: none;
		}
		.btn-login-activator__icon
		{
			line-height: 0;
			display: block;
		}
	}
</style>
