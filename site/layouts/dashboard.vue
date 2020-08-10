<template>
	<div>
    <headerTop/>

    <main class="container main">
      <aside
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

<style lang="scss" scoped>
  .main
  {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  // TODO вынести
  .sidebar-wr,
  .content
  {
    background-color: #FFFFFF;
  }

  .sidebar-wr
  {
    height: calc(100vh - 97px);
    position: sticky;
    top: 94px;
    flex-basis: 15%;
    flex-shrink: 0;
  }

  .sidebar-content-element
  {
    padding: 20px;
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

  .sidebar-nav-item_sub
  {
    padding-left: 40px;
    height: 35px;
  }

  .sidebar-nav-mob-actions
  {
    display: none;
  }

  .content-wr
  {
    flex: 1;
    margin-left: 20px;
  }

  .content
  {
    min-height: calc(100vh - 106px);
    flex: 1;
    overflow-x: hidden;
  }
</style>
