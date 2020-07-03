<template>
  <div class="ui-block">
    <h3 class="ui-block__header">
      {{ title }}
    </h3>

    <div
      v-if="spoiler"
      class="ui-block__spoiler"
    >
      <div
        class="ui-block__spoiler-title"
        @click="isOpened = !isOpened"
      >
        {{ spoiler }}

        <div class="ui-block__spoiler-icon" />
      </div>

      <div
        v-if="isOpened"
        class="ui-block__spoiler-content"
      >
        <slot name="spoiler" />
      </div>
    </div>

    <slot name="content" />
  </div>
</template>

<script>
  export default {
    name: 'Block',
    props: {
      title: {
        type: String,
        required: true
      },
      spoiler: {
        type: String,
        default: ''
      },
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isOpened: false
      }
    },
    watch: {
      isOpen() {
        this.isOpened = this.isOpen
      }
    },
    created() {
      this.isOpened = this.isOpen
    }
  }
</script>

<style lang="scss">
  .ui-block {
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(98, 103, 125, 0.1);
    border-radius: 4px;
    padding: 25px 20px 40px;
    margin-left: 10px;
		margin-right: 10px;
    margin-top: 26px;
    margin-bottom: 20px;
  }

  .ui-block__header {
    margin-top: 0;
  }

  .ui-block__spoiler-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: $medium;
  }

  .ui-block__spoiler-icon {
    position: relative;
    width: 10px;

    &:before,
    &:after {
      position: absolute;
      content: '';
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 10px;
      height: 1px;
      background-color: $main;
    }
  }

  .ui-block__spoiler-content {
    padding-top: 8px;

    p
		{
			color: $main;
			font-size: 14px;
			line-height: 20px;

			&:last-child
			{
				margin-bottom: 0;
			}

		}

    a
    {
      color: $main;
    }
  }
</style>
