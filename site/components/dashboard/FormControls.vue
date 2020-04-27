<template>
  <div
    v-if="!isEdit"
    class="form-controls"
  >
    <button
      @click="$emit('clear')"
      class="btn btn_small btn_red form-controls__item"
    >Очистить</button>
    <button
      @click="$emit('add')"
      class="btn btn_small btn_accent form-controls__item"
    >
      Добавить
    </button>
  </div>
  <div
    v-else
    class="form-controls"
  >
    <button
      @click="$emit('delete')"
      class="btn btn_small btn_red form-controls__item"
    >
      Удалить
    </button>
    <button
      @click="$emit('update')"
      class="btn btn_small btn_accent form-controls__item"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
  export default {
    name: 'FormControls',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
  .form-controls {
    display: flex;
    justify-content: flex-end;
    padding-top: 40px;
  }
  .form-controls__item {
    margin-left: 20px;
    &:first-child {
      margin-left: 0;
    }
  }
</style>
