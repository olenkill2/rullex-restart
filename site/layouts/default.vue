<template lang="pug">
	div
		header.header-wr
			.container
				.header-content
					.header__left
						router-link.header-logo(to="/") RULLEX

					real-stat

					.header__right
						a.header-ext-link-wr(href="google.ru", target="_blank")
							span.header-ext-link__text
								|Расширения для
							span.header-ext-link__icon
								svg(width='28', height='28', viewBox='0 0 28 28', fill='none', xmlns='http://www.w3.org/2000/svg')
									path(d='M12.697.461C10.083.731 7.7 1.687 5.6 3.311c-.63.485-1.796 1.65-2.289 2.289C1.807 7.541.907 9.646.54 12.071c-.09.583-.103.819-.103 1.929s.013 1.346.103 1.928c.171 1.128.492 2.306.887 3.245 1.277 3.056 3.561 5.511 6.493 6.977 2.061 1.033 4.122 1.487 6.467 1.423 2.104-.06 3.827-.493 5.7-1.427 1.384-.695 2.391-1.423 3.514-2.546 1.809-1.809 2.979-3.87 3.596-6.33.3-1.2.368-1.813.368-3.27 0-1.11-.013-1.346-.102-1.929A13.68 13.68 0 0 0 24.689 5.6c-.48-.621-1.659-1.8-2.246-2.259C20.459 1.811 18.359.903 15.95.54c-.686-.103-2.58-.15-3.253-.078zm3.146 1.02c1.826.279 3.566.939 5.057 1.92.587.386 1.166.828 1.149.875-.009.017-.296.3-.639.625l-5.254 4.993C14.994 10.996 14.026 11.9 14 11.9c-.026 0-.994-.904-2.156-2.006L6.59 4.901a16.79 16.79 0 0 1-.639-.625c-.017-.052.575-.497 1.179-.892a12.653 12.653 0 0 1 5.156-1.915c.75-.099.805-.103 1.928-.09.789.012 1.192.038 1.629.102zM6.766 6.376L9.993 9.44c.938.891 2.224 2.113 2.85 2.704.626.596 1.144 1.085 1.157 1.085.013 0 .531-.489 1.157-1.085 1.522-1.444 6.926-6.578 7.324-6.951l.318-.3.351.373c.364.39.883 1.011 1.153 1.388l.154.223L21.6 9.654l-4.316 4.196c-.797.776-1.543 1.496-1.659 1.598l-.21.19v10.92l-.115.03c-.155.042-2.443.042-2.593 0l-.12-.03-.005-5.457V15.65l-.951-.921c-.523-.506-2.554-2.482-4.517-4.389L3.547 6.877l.133-.197c.373-.54 1.461-1.783 1.539-1.757.017.008.715.66 1.547 1.453zm-.069 4.881c1.98 1.916 3.9 3.789 4.273 4.153l.673.664v5.177c0 2.846-.013 5.177-.034 5.177a9.48 9.48 0 0 1-.553-.128 12.484 12.484 0 0 1-3.986-1.727 11.68 11.68 0 0 1-2.006-1.637c-1.971-1.972-3.188-4.415-3.608-7.243-.116-.802-.107-2.7.021-3.532.124-.775.369-1.748.63-2.468.257-.716.857-1.963.939-1.942.03.009 1.675 1.586 3.651 3.506zm18.656-2.82a13.169 13.169 0 0 1 1.17 3.724c.128.832.137 2.73.021 3.532-.287 1.928-.938 3.673-1.958 5.224a11.92 11.92 0 0 1-1.65 2.019 12.464 12.464 0 0 1-5.842 3.325c-.36.09-.673.168-.694.168-.03 0-.043-1.856-.043-5.182v-5.181l3.506-3.399 4.273-4.161c.424-.42.797-.763.827-.763.03 0 .206.313.39.694z', fill='#292F44')
									path(d='M13.443 3.23c-.982.064-1.877.231-2.726.501-1.063.343-2.147.87-2.267 1.098-.107.21-.081.377.081.54.215.214.348.197.956-.108 1.097-.552 2.13-.87 3.356-1.037.484-.064 1.804-.064 2.314 0 1.187.155 2.52.575 3.472 1.093.372.206.557.206.754.009.171-.172.193-.356.064-.57-.15-.245-1.444-.823-2.567-1.145-1.028-.3-2.417-.45-3.437-.381zM4.014 10.417c-.115.034-.171.094-.244.24-.223.454-.45 1.603-.527 2.67-.06.776-.03.93.188 1.063.206.124.395.107.562-.06.133-.133.137-.15.167-.609.06-1.007.176-1.714.394-2.481.12-.42.112-.566-.043-.707a.479.479 0 0 0-.497-.116zM4.314 16.293c-.574.167-.685.257-.685.548 0 .223.09.36.287.442.133.06.184.051.647-.073.66-.176.763-.223.84-.377.111-.214.09-.377-.077-.544-.189-.189-.347-.189-1.012.004zM5.321 18.607c-.484.283-.664.459-.664.652 0 .27.274.514.532.471.072-.013.351-.15.617-.309.373-.218.501-.317.553-.428a.45.45 0 0 0-.12-.553c-.215-.18-.373-.15-.918.167zM6.796 20.626c-.227.227-.442.467-.467.535-.129.3.107.639.437.639.163 0 .201-.03.578-.399.223-.214.433-.445.467-.51.103-.197.078-.368-.085-.531-.12-.12-.18-.146-.326-.146-.176 0-.206.022-.604.412zM9.089 21.71c-.09.056-.223.244-.42.604-.258.455-.292.54-.27.677.051.313.39.48.694.343.116-.051.651-.938.694-1.153.034-.175-.086-.398-.257-.48-.193-.094-.279-.09-.441.009zM23.574 10.481c-.227.142-.257.322-.128.763.218.746.33 1.466.394 2.477.03.459.034.476.167.609a.445.445 0 0 0 .737-.146c.146-.351-.09-2.25-.398-3.236-.163-.505-.433-.672-.772-.467zM22.674 16.289c-.167.167-.188.33-.077.544.077.154.18.201.84.377.463.124.514.133.647.073.198-.082.288-.219.288-.442 0-.295-.108-.381-.708-.548-.673-.193-.801-.193-.99-.004zM21.762 18.44a.45.45 0 0 0-.12.553c.05.111.18.21.552.428.266.159.545.296.617.309.258.043.532-.201.532-.467 0-.202-.15-.352-.651-.647-.566-.33-.716-.356-.93-.176zM20.274 20.36c-.163.163-.188.334-.085.531.034.065.244.296.467.51.377.369.415.399.578.399.33 0 .566-.339.437-.639-.025-.068-.24-.308-.467-.535-.398-.39-.428-.412-.604-.412-.146 0-.206.026-.326.146zM18.462 21.701c-.163.082-.283.309-.25.48.035.159.537 1.042.648 1.127.15.125.429.1.591-.047.228-.201.202-.385-.137-.981-.15-.27-.313-.514-.364-.549a.477.477 0 0 0-.488-.03z', fill='#292F44')

		main.container.main
			aside.sidebar-wr
				.sidebar-nav
					.sidebar-nav__item-wr(v-for="group in navItems")
						//- |{{group.name == 'none'}}
						.single-item(v-if="group.items.length == 1 || group.name == 'none'", v-for="navItem in group.items")
							router-link.sidebar-nav-item(:to="navItem.url", v-if="!navItem.private") {{navItem.name}}


						.sidebar-nav-group(v-if="group.name != 'none' && group.items.length > 1")
							.sidebar-nav-group__item
								.sidebar-nav-group__label(@click="group.open = !group.open")
									span.sidebar-nav-group__label-icon
										svg(width='7', height='13', viewBox='0 0 7 13', fill='none', xmlns='http://www.w3.org/2000/svg')
											path(d='M6.828 6.24L.695.109a.367.367 0 0 0-.52 0 .367.367 0 0 0 0 .52L6.045 6.5l-5.87 5.87a.37.37 0 1 0 .259.63.359.359 0 0 0 .258-.109l6.133-6.133a.366.366 0 0 0 .003-.517z', fill='#62677D')
									span.sidebar-nav-group__label-text
										|{{group.name}}

								.sidebar-nav-group__list(v-for="navItem of group.items", v-if="group.open")
									router-link.sidebar-nav-item.sidebar-nav-item_sub(:to="navItem.url", v-if="!navItem.private") {{navItem.name}}

			.content
				nuxt

			aside.sidebar-wr
				| всякие штуки
</template>

<script>
	import realStat from '~/components/real-stat.vue';
	export default {
		async asyncData ({$axtion}) {
			console.log('alah alah');
		},
		components: {
			realStat
		},
		data() {
			return {
				navItems: []
			}
		},
		mounted () {
			this.$axios.get('/api/menu').then((result, error) => {
				let menuArray = {withoutCategory: {name: 'none', items: []}};
				for(var link of result.data.data)
				{
					console.log(link);
					if(!link.private)
					{
						if(link.category == null)
							menuArray.withoutCategory.items.push(link)
						else
						{
							if(typeof menuArray[link.category.category] == 'undefined')
							{
								menuArray[link.category.category] = {name: link.category.category, open: false, items: []};
							}
							menuArray[link.category.category].items.push(link);
						}
					}
				}
				this.navItems = menuArray;
			}).catch((error) => {
				this.navItems = [];
			});
		}
	}
</script>

<style lang="scss" scoped="">
	@import '~/assets/style/variables.scss';
	.header-content,
	.header-stat-wr,
	.header-ext-link-wr
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header-ext-link-wr
	{
		display: inline-flex;
	}
	.header__left,
	.header__right
	{
		flex-basis: 19%;
		flex-shrink: 1;
	}
	.header__right
	{
		text-align: right;
	}
	.header-wr
	{
		box-shadow: 0px 1px 10px rgba(205, 205, 205, 0.25);
		background-color: #fff;
		position: sticky;
		top: 0;
	}
	.header-logo
	{
		font-weight: $light;
		font-size: 40px;
		line-height: normal;
		letter-spacing: 0.13em;
		text-decoration: none;
		color: $accent;
	}
	.header-ext-link-wr
	{
		text-decoration: none;
		color: $accent;
		justify-content: flex-end;
	}
	.header-ext-link__text
	{
		margin-top: 2px;
		margin-right: 10px;
		border-bottom: 1px solid $main;
		transition: border-color 0.2s;
	}
	.header-ext-link__icon
	{
		line-height: 0;
	}

	.main
	{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding-top: 16px;
	}
	.sidebar-wr,
	.content
	{
		background-color: #FFFFFF;
	}
	.sidebar-wr
	{
		height: calc(100vh - 91px);
		flex-basis: 19%;
		flex-shrink: 1;
		position: sticky;
		top: 91px;
	}
	.content
	{
		flex: 1;
		margin-left: 16px;
		margin-right: 16px;
		min-height: calc(100vh - 91px);
		max-width: 59%;
	}
	.content_popup
	{
		background-color: transparent;
	}

	.sidebar-nav-item
	{
		display: flex;
		align-items: center;
		padding-left: 24px;
		height: 50px;
		color: $main;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-decoration: none;
		transition: 0.2s;
		position: relative;
		&:before
		{
			position: absolute;
			content: '';
			left: 0;
			top: 0;
			height: 100%;
			width: 2px;
			background-color: transparent;
			transition: 0.2s;
		}

		&.nuxt-link-exact-active
		{
			color: $accent;
			&:before
			{
				background-color: $blue;
			}
		}
	}

	.sidebar-nav-group__label
	{
		padding-left: 24px;
		display: flex;
		align-items: center;
		min-height: 50px;
		cursor: pointer;
	}
	.sidebar-nav-group__label-icon
	{
		line-height: 0;
		margin-top: 1px;
		margin-right: 10px;
	}
	.sidebar-nav-group__list
	{

	}
	.sidebar-nav-item_sub
	{
		padding-left: 40px;
		height: 35px;
	}
</style>