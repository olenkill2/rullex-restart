<template>
  <button
    @click="toogle"
  >
    <slot/>
  </button>
</template>

<script>
  export default {
    name: "tooltip",
    props: {
      opened: {
        type: Boolean
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    watch: {
      opened() {
        this.isOpen = this.opened
      }
    },
    methods: {
      toogle() {
        this.isOpen = !this.isOpen
        this.$emit('update', this.isOpen)
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
