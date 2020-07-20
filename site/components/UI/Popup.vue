<template>
  <div
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
    name: "Popup"
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
  }

  .popup-close {
    position: absolute;
    background: none;
    border: none;
    box-shadow: none;
    right: 10px;
    top: 10px;
  }
</style>
