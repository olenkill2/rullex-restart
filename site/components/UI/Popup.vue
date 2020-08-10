<template>
  <div
    v-bsl="isBlockScroll"
    class="popup-wr"
    @click="$emit('close')"
  >
    <div
      @click.stop
      class="popup-content"
    >
      <button
        class="popup-close"
        @click="$emit('close')"
      >
        X
      </button>

      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Popup",
    props: {
      isBlockScroll: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss">
  .popup-wr {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($main, 0.2);
    z-index: 20;
  }

  .popup-content {
    position: relative;
    background-color: #fff;

    @media (max-width: $tablet) {
      max-width: 480px;
      width: 100%;
      padding-top: 45px;
    }
  }

  .popup-close {
    @include inpres;

    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    top: -40px;
    background-color: #fff;
    border-radius: 50%;

    @media (max-width: $tablet) {
      top: 15px;
      right: 15px;
      border: 1px solid $main;
    }
  }
</style>
