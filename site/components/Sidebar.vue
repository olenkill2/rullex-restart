<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <slot>
        <div
          class="sidebar-nav"
        >
          <div
            v-for="(group, index) in menu"
            :key="index"
            class="sidebar-nav__item-wr"
          >
            <div
               v-if="group.items.length === 1 || group._id === ''"
               v-for="navItem in group.items"
              class="single-item"
            >
              <router-link
                class="sidebar-nav-item"
                :to="navItem.url"
                @click.native="$emit('change')"
              >
                <span v-if="group.items.length === 1 && group._id !== ''">{{group._id}} –</span>
                <span> {{navItem.label}}</span>
              </router-link>
            </div>

            <sidebar-group
              v-if="group._id !== '' && group.items.length > 1"
              :label="group._id"
              :items="group.items"
              @change="$emit('change')"
            />
          </div>
        </div>
      </slot>
    </div>
  </aside>
</template>

<script>
import SidebarGroup from '~/components/SidebarGroup.vue';
export default {
  name: "Sidebar",
  components: {
    SidebarGroup
  },
  props: {
    menu: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-content-element {
    padding: 20px;
  }

  .sidebar-nav-item {
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

  .sidebar-nav-group__label {
    padding-left: 24px;
    display: flex;
    align-items: center;
    min-height: 50px;
    cursor: pointer;
  }

  .sidebar-nav-group__label-icon {
    line-height: 0;
    margin-top: 1px;
    margin-right: 10px;
  }

  .sidebar-nav-item_sub {
    padding-left: 40px;
    height: 35px;
  }
</style>
