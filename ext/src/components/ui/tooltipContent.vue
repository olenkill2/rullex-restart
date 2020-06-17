<template>
  <div class="tooltip-content">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "tooltipContent"
  }
</script>

<style lang="scss">
  .tooltip-content {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: $main;
    color: #fff;
    font-size: 12px;
    padding: 20px;
  }
</style>
