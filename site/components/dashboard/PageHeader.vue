<template>
  <div class="pages-header">
    <div class="pages-header__left">{{ title }}</div>
    <slot>
      <div class="pages-header__right">
        <button
          @click="setState('open')"
          class="btn btn_small"
          v-if="!opened"
        >Добавить</button>

        <button
          @click="setState('close')"
          class="btn btn_small btn_skin"
          v-else=""
        >Отменить</button>
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "PageHeader",
    props: {
      title: {
        type: String,
        default: ''
      },
      isOpened: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        opened: false
      }
    },
    watch: {
      isOpened() {
        this.opened = this.isOpened
      }
    },
    methods: {
      setState(state) {
        this.opened = !this.opened
        this.$emit(state, this.opened)
      },
    }
  }
</script>

<style lang="scss">
  .pages-header
  {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 40px;
    font-size: 28px;
    color: $accent;
  }
</style>
