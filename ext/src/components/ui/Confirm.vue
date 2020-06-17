<template>
  <div class="confirm">
    <div class="confirm__box">
      <div class="confirm__title">
        {{ title }}
      </div>

      <button
        v-if="cancelLabel"
        @click.stop="$emit('cancel')"
        class="btn btn_small confirm__btn"
      >
        {{ cancelLabel }}
      </button>
      <button
        v-if="acceptLabel"
        @click.stop="$emit('accept')"
        class="btn btn_small btn_red confirm__btn"
      >
        {{ acceptLabel }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Confirm',
    props: {
      title: {
        type: String,
        required: true
      },
      cancelLabel: {
        type: String,
        default: 'Отменить'
      },
      acceptLabel: {
        type: String,
        default: 'Подвердить'
      },
      mode: {
        type: String,
        default: 'warning'
      }
    }
  }
</script>

<style lang="scss">
  .confirm {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($main, 0.2);

    &__box {
      display: grid;
      background: #fff;
      padding: 15px;
      grid-template-columns: 120px 120px;
      grid-row-gap: 20px;
      grid-column-gap: 10px;
      border-radius: 4px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__title {
      font-size: 17px;
      grid-column: 1/-1;
      font-weight: $medium;
    }
  }
</style>
