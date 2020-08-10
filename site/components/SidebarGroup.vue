<template>
  <div class="sidebar-nav-group">
    <div class="sidebar-nav-group__item">
      <div
        class="sidebar-nav-group__label"
        :class="{'sidebar-nav-group_open': opened }"
        @click="opened = !opened"
      >
        <span class="sidebar-nav-group__label-icon">
          <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.828 6.24L.695.109a.367.367 0 0 0-.52 0 .367.367 0 0 0 0 .52L6.045 6.5l-5.87 5.87a.37.37 0 1 0 .259.63.359.359 0 0 0 .258-.109l6.133-6.133a.366.366 0 0 0 .003-.517z" fill="#62677D"></path></svg>
        </span>
        <span class="sidebar-nav-group__label-text">
          {{ label }}
        </span>
      </div>

      <div class="sidebar-nav-group__list" v-for="subItem of items">
        <router-link
          :to="subItem.url"
          @click.native="$emit('change')"
          class="sidebar-nav-item sidebar-nav-item_sub"
        >
          {{ subItem.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['label', 'items'],
    data () {
        return {
            opened: false,
        }
    },
    computed: {
        // childIsCurrentRoute() {
        //     return
        // }
    },
    created() {
        this.opened = this.items.some(item => item.url == this.$route.path);
    }
}
</script>

<style lang="scss">

</style>
