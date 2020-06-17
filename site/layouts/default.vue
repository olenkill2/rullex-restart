<template>
	<div>
    <headerTop/>

    <div class="container main">
      <aside class="sidebar-wr sidebar-wr_main" :class="{'move-sidebar': openedSidebar}">
        <div class="sidebar-content">
          <div class="sidebar-nav-mob-actions">
            <div
              @click="openSidebar('menu')" :class="{'active': openSidebarName == 'menu'}"
              class="sidebar-nav-mob-action sidebar-nav-mob-action__burger"
            >
              <div class="sidebar-nav-mob-action__chart"></div>
              <div class="sidebar-nav-mob-action__chart"></div>
              <div class="sidebar-nav-mob-action__chart"></div>
            </div>
            <div
              @click="openSidebar('sub-sidebar')" :class="{'active': openSidebarName == 'sub-sidebar'}"
              class="sidebar-nav-mob-action sidebar-nav-mob-action__more"
            >
              <div class="sidebar-nav-mob-action__chart"></div>
              <div class="sidebar-nav-mob-action__chart"></div>
              <div class="sidebar-nav-mob-action__chart"></div>
            </div>
          </div>
          <div
            class="sidebar-nav"
            :class="{'showed': openedSidebar && openSidebarName == 'menu'}"
          >
            <div
              v-for="(group, index) in menu"
              class="sidebar-nav__item-wr"
            >
              <div
                 v-if="group.items.length == 1 || group._id == ''"
                 v-for="navItem in group.items"
                class="single-item"
              >
                <router-link class="sidebar-nav-item" :to="navItem.url">
                  <span v-if="group.items.length == 1 && group._id != ''">{{group._id}} –</span>
                  <span> {{navItem.label}}</span>
                </router-link>
              </div>
              <sidebar-group
                v-if="group._id != '' && group.items.length > 1"
                :label="group._id"
                :items="group.items"
              />
            </div>
          </div>
        </div>
      </aside>

      <main class="content-wr">
        <div class="content" :class="{'move-content': openedSidebar}">
          <nuxt></nuxt>
        </div>
      </main>

      <aside
        class="sidebar-wr sidebar-wr_secondary"
        :class="{'move-sidebar': openedSidebar, 'showed': openedSidebar && openSidebarName == 'sub-sidebar'}"
      >
        <div class="sidebar-content">
          <div class="sidebar-content-element">всякие штуки</div>
        </div>
      </aside>
    </div>
  </div>
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
				openSidebarName: '',
				openedSidebar: false,
			}
		},
		methods: {
			openSidebar(sidebarName) {
				if(this.openSidebarName === sidebarName) {
					this.openSidebarName = '';
					this.openedSidebar = false;
				} else {
					this.openSidebarName = sidebarName;
					this.openedSidebar = true;
				}
			},
			itsActiveGroup(group, index) {
				return group.items.some(item => item.url === this.$route.path);
			},
		},
		computed: {
			menu() {
				return this.$store.state.menu.menu
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
	}
	.sidebar-nav-group__list
	{
		overflow-y: hidden;
		transition: 0.2s;
		max-height: 0;
	}
</style>
