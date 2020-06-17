<template>
  <div class="stage">
    <div class="stage__top">
      <div class="stage__number">
        {{ number }}
      </div>

      <div class="stage__data">
        <div
          v-for="item in data"
          class="stage__data-row"
        >
          {{ item.name }}:
          <span class="stage__data-row-value">
            {{ item.type === 'dropdown' ? item.value.label : item.value }};
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="edit"
      class="tv-stages-actions"
    >
      <button
        @click="isShowConfirm = true"
        class="btn-str btn-str_remove"
      >
        Удалить
      </button>

      <button
        @click="$emit('edit')"
        class="btn-str"
      >
        Изменить
      </button>
    </div>

    <Confirm
      v-if="isShowConfirm"
      @cancel="isShowConfirm = false"
      @accept="$emit('remove'); isShowConfirm = false"
      :title="`Удалить этап №${number}`"
    />
  </div>
</template>

<script>
  import Confirm from '@/components/ui/Confirm'
  export default {
    name: 'Stage',
    props: {
      number: {
        type: Number,
        required: true
      },
      data: {
        type: Object,
        required: true
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Confirm
    },
    data() {
      return {
        isShowConfirm: false
      }
    }
  }
</script>

<style lang="scss">
  .stage
	{
    position: relative;
    padding: 25px 10px 15px;
    border-bottom: 1px solid #E1EEF6;
	}
	.stage__top
	{
		display: flex;
		justify-content: space-between;
	}
	.stage__data
	{
		flex: 1;
	}
	.stage__number
	{
		font-weight: 300;
		font-size: 48px;
		line-height: 57px;
		color: rgba(41, 47, 68, 0.5);
		padding-right: 23px;
		flex-basis: 30px;
		text-align: center;
	}
	.stage__data-row
	{
		font-size: 14px;
		line-height: 29px;
		color: $main;
	}
	.stage__data-row-value
	{
		color: $accent;
	}
	.tv-stages-actions
	{
		display: flex;
		justify-content: flex-end;
	}
</style>
