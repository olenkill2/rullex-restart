<template>
	<div>
    <headerTop/>

    <main class="container main">
      <aside
        v-if="$store.state.user.user.role === 'admin'"
        class="sidebar-wr"
      >
        <div class="sidebar-nav">
          <router-link class="sidebar-nav-item" to="/dashboard">Админка</router-link>
          <router-link class="sidebar-nav-item" to="/dashboard/menu">Меню</router-link>
          <router-link class="sidebar-nav-item" to="/dashboard/posts">Статьи</router-link>
          <router-link class="sidebar-nav-item" to="/dashboard/seo">SEO</router-link>
          <router-link class="sidebar-nav-item" to="/dashboard/roulettes">Рулетки</router-link>
          <router-link class="sidebar-nav-item" to="/dashboard/modes">Режимы</router-link>
          <router-link class="sidebar-nav-item" to="/dashboard/freebie">Халява</router-link>
        </div>
      </aside>
      <div class="content-wr">
        <div class="content">
          <nuxt></nuxt>
        </div>
      </div>
      <aside class="sidebar-wr" v-if="$store.state.user.user.role === 'admin'">всякие штуки</aside>
    </main>
  </div>
</template>

<script>
	import headerTop from '~/components/Header.vue'

	export default {
		components: {
			headerTop
		},
    middleware: ['isAdmin'],
		data() {
			return {
			}
		}
	}
</script>

<style lang="scss">

</style>
