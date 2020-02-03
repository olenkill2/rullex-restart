<template lang="pug">
	div
		headerTop
		.container.main
			aside.sidebar-wr.sidebar-wr_main(:class="{'move-sidebar': openedSidebar}")
				.sidebar-content
					.sidebar-nav-mob-actions
						.sidebar-nav-mob-action.sidebar-nav-mob-action__burger(@click="openSidebar('menu')", :class="{'active': openSidebarName == 'menu'}")
							.sidebar-nav-mob-action__chart
							.sidebar-nav-mob-action__chart
							.sidebar-nav-mob-action__chart
						.sidebar-nav-mob-action.sidebar-nav-mob-action__more(@click="openSidebar('sub-sidebar')", :class="{'active': openSidebarName == 'sub-sidebar'}")
							.sidebar-nav-mob-action__chart
							.sidebar-nav-mob-action__chart
							.sidebar-nav-mob-action__chart

					.sidebar-nav(:class="{'showed': openedSidebar && openSidebarName == 'menu'}")
						.sidebar-nav__item-wr(v-for="(group, index) in menu")
							.single-item(v-if="group.items.length == 1 || group._id == ''", v-for="navItem in group.items")
								router-link.sidebar-nav-item(:to="navItem.url")
									span(v-if="group.items.length == 1") {{group._id}} –
									span  {{navItem.label}}

							sidebar-group(
								v-if="group._id != '' && group.items.length > 1",
								:label="group._id",
								:items="group.items"
							)

			main.content-wr
				.content(:class="{'move-content': openedSidebar}")
					nuxt

			aside.sidebar-wr.sidebar-wr_secondary(:class="{'move-sidebar': openedSidebar, 'showed': openedSidebar && openSidebarName == 'sub-sidebar'}")
				.sidebar-content
					.sidebar-content-element
						| всякие штуки
</template>

<script>
	import SidebarGroup from '~/components/SidebarGroup.vue';
	import headerTop from '~/components/Header.vue';
	export default {
		components: {
			headerTop,
			SidebarGroup
		},
		data() {
			return {
				navItems: [],
				openSidebarName: '',
				openedSidebar: false,
			}
		},
		methods: {
			openSidebar(sidebarName) {
				if(this.openSidebarName == sidebarName) {
					this.openSidebarName = '';
					this.openedSidebar = false;
				} else {
					this.openSidebarName = sidebarName;
					this.openedSidebar = true;
				}
			},
			itsActiveGroup(group, index) {
				return group.items.some(item => item.url == this.$route.path);
			},
		},
		computed: {
			menu() {
				return this.$store.state.menu.items;
			},

		},
		mounted() {
		}
	}
</script>

<style lang="scss">
	.sidebar-nav-group_open ~ .sidebar-nav-group__list
	{
		max-height: 399px;
		// overflow-y: auto;
	}
	.sidebar-nav-group__list
	{
		overflow-y: hidden;
		transition: 0.2s;
		max-height: 0;
	}
</style>