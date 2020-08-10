<template>
	<div>
    <headerTop @open-menu="showMenu = true"/>

    <div class="container main">
      <Sidebar
        :menu="menu"
        class="sidebar-wr sidebar-wr_main"
      />

      <main class="content-wr">
        <nuxt></nuxt>
      </main>

      <Popup
        v-if="showMenu"
        @close="showMenu = false"
      >
        <Sidebar
          :menu="menu"
          class="mobile-menu"
          @change="showMenu = false"
        />
      </Popup>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Sidebar from '~/components/Sidebar.vue'
	import headerTop from '~/components/Header.vue'
	import Popup from '~/components/UI/Popup.vue'

	export default {
		components: {
			headerTop,
      Sidebar,
      Popup
		},
    data() {
		  return {
		    showMenu: false
      }
    },
		computed: {
			...mapGetters({
        menu: 'menu/getMenu'
      })
		}
	}
</script>

<style lang="scss" scoped>
  .main
  {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .sidebar-wr
  {
    background-color: #FFFFFF;
    height: calc(100vh - 97px);
    position: sticky;
    top: 94px;
    flex-basis: 15%;
    flex-shrink: 0;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  .content-wr
  {
    flex: 1;
    margin-left: 20px;
    background-color: #FFFFFF;
    overflow-x: hidden;

    @media (max-width: $tablet) {
      margin-left: 0;
    }
  }

  .mobile-menu {
    max-width: 480px;
    height: 100%;
    display: block;
    padding-bottom: 30px;
  }
</style>
