<template>
  <div class="button-edit-wr">

    <button
      v-if="isButton === 'all' || isButton === 'remove'"
      class="button-edit button-edit--remove"
      @click="$emit('remove')"
    >
    </button>
    <button
      v-if="isButton === 'all' || isButton === 'edit'"
      class="button-edit"
      @click="$emit('edit')"
    >
    </button>
  </div>
</template>

<script>
  export default {
    name: 'ButtonEditItem',
    props: {
      isButton: {
        type: String,
        default: 'all'
      }
    }
  }
</script>

<style lang="scss">
  .button-edit-wr {
    display: flex;
  }

  .button-edit {
    @include inpres;

    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: 0.2s;
    opacity: 0.7;
    position: relative;

    &:hover
    {
      opacity: 1;
    }

    &:before {
      position: absolute;
      width: 14px;
      height: 14px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url('../../assets/icons/edit.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      content: '';
    }
  }

  .button-edit--remove {
    &:before {
      background-image: url('../../assets/icons/remove.svg');
    }
  }
</style>
