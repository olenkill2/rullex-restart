<template>
  <div
    class="tactic"
  >
    <div class="tactic__top">
      <div class="tactic__name">
        {{ tactic.name }}
      </div>
    </div>
    <div class="tactic__body">
      <div class="tactic__body-item">
        Рулетка - {{ tactic.roulette.name }}
      </div>
      <div class="tactic__body-item">
        Режим - {{ tactic.mode.label }}
      </div>
      <div class="tactic__body-item">
        {{ declOfNum(tactic.stages.length, ['этап', 'этапа', 'этапов']) }}
      </div>
    </div>
    <div class="tactic__footer">
      <button
        class="btn-str btn-str_remove"
        @click="isShowConfirm = true"
      >
        Удалить
      </button>
      <button
        class="btn-str"
        @click.stop="$emit('show-tactic')"
      >
        Подробнее
      </button>
      <button
        @click="$emit('select')"
        class="btn btn_accent tactic__select"
      >
        Выбрать
      </button>
    </div>

    <Confirm
      v-if="isShowConfirm"
      :title="`Удалить тактику для ${tactic.roulette.name} - режим ${tactic.mode.label}?`"
      @accept="$emit('remove'); isShowConfirm = false"
      @cancel="isShowConfirm = false"
    />

    <div
      v-if="disabled"
      class="tactic__disabled"
    >
      Тактика не для этой рулетки)
    </div>
  </div>
</template>

<script>
  import Confirm from '@/components/ui/Confirm'

  export default {
    name: 'Tactic',
    props: {
      tactic: {
        type: Object,
        required: true
      },
      disabled: {
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
    },
    methods: {
      declOfNum(n, titles) {
        return n + ' ' + titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
      }
    }
  }
</script>

<style lang="scss">
  .tactic {
    padding: 20px 10px 28px;
    border-bottom: 1px solid #E1EEF6;
    position: relative;

    &:first-child
    {
      padding-top: 0;
    }

    &:last-child
    {
      border-bottom: none;
    }
  }
  .tactic__name {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
  }
  .tactic__body {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 18px;
  }
  .tactic__body-item {
    flex-basis: 48%;
    color: $main;
  }
  .tactic__footer {
    display: flex;
    justify-content: flex-end;
  }

  .tactic__disabled {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#fff, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .btn.tactic__select {
    max-width: 120px;
    min-width: 120px;
    margin-left: 10px;
  }
</style>
