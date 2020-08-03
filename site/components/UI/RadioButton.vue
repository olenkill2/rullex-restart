<template>
  <label class="radio-button">
    <input
      v-model="model"
      :name="name"
      :value="$attrs.value"
      :disabled="disabled"
        type="radio"
      class="radio-button__input sr-only"
    >

    <span class="radio-button__value">
      <slot />
    </span>
  </label>
</template>

<script>
  export default {
    name: 'RadioButton',
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      name: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: [String, Number],
        required: true
      }
    },
    computed: {
      model: {
        get() {
          return this.checked
        },
        set(val) {
          this.$emit('change', val)
        }
      }
    }
  }
</script>

<style lang="scss">
  .radio-button {
    display: block;
  }

  .radio-button__value {
    position: relative;
    display: block;
    padding-left: 20px;
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 13px;
      height: 13px;
      border: 1px solid $dark-gray;
      border-radius: 50%;
      background-color: #fff;
      transform: translateY(-50%);
      content: '';
    }
  }

  .radio-button__input:checked ~ .radio-button__value {
    &::before {
      border-color: $blue;
      border-width: 4px;
    }
  }

  .radio-button__input:hover ~ .radio-button__value,
  .radio-button__input:focus ~ .radio-button__value {
    &::before {
      border-color: $blue;
    }
  }

  .radio-button__input:disabled ~ .radio-button__value {
    cursor: default;

    &::before {
      border-color: $dark-gray;
      background-color: $dark-gray;
    }
  }

  .radio-button__input:checked:disabled ~ .radio-button__value {
    &::before {
      background-color: #fff;
    }
  }
</style>
