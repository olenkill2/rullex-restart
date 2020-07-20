<template>
  <span
    :class="{'currency-symbol--lose': isLose}"
    class="currency-symbol"
  >
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'Currency',
    props: {
      isLose: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .currency-symbol {
    color: $green;

    &--lose {
      color: $red;
    }
  }
</style>
