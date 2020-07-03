<template>
  <Block
    title="Настройка автостопа"
    class="auto-stop"
    spoiler="А это что такое?"
  >
    <template v-slot:spoiler>
      <p>
        Автостоп поможет вовремя остановитьс и не слить весь баланс.
      </p>
      <p>
        Работает это очень просто, достаточно задать один или несколько параметров для остановки
      </p>
    </template>

    <template v-slot:content>
      <form
        class="auto-stop__form"
        @submit.prevent
      >
        <field
          v-model="settings.gamesCount"
          rules="numeric"
          label="Кол-во игр"
          placeholder="5 игр"
        />
        <field
          v-model="settings.gamesLose"
          rules="numeric"
          label="Кол-во поражений"
          placeholder="5 поражений"
        />
        <field
          v-model="settings.maxLose"
          rules="numeric"
          label="Максимальный слив"
          placeholder="433 p"
        />
        <field
          v-model="settings.maxProfit"
          rules="numeric"
          label="Если выграли"
          placeholder="666 р"
        />
      </form>

      <div class="auto-stop__actions">
        <button
          @click="routeTo('Game')"
          class="btn btn_skin"
        >
          Пропустить
        </button>

        <button
          @click="setAutoStop"
          class="btn"
        >
          Применить
        </button>
      </div>

      <div class="auto-stop__navigation">
        <button
          class="btn-row btn-row--black"
          @click="routeTo('tactics')"
        >
          Вернуться
        </button>

        <button
          @click="routeTo('tactics')"
          class="btn-row"
        >
          Управление тактиками
        </button>
      </div>
    </template>
  </Block>
</template>

<script>
  import Block from './ui/Block'

  export default {
    name: 'AutoStop',
    components: {
      Block
    },
    data() {
      return {
        settings: {}
      }
    },
    methods: {
      setAutoStop() {
        for (const key in this.settings) {
          console.log(key)
          if (!this.settings[key]) {
            delete this.settings[key]
          }
        }

        if (Object.keys(this.settings[key]).length) {
          console.log('set auto stop settings')
        }

        this.routeTo('Game')
      }
    }
  }
</script>

<style lang="scss">
  .auto-stop__form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .auto-stop__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;
  }
  .auto-stop__navigation {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 57px 126px;
    grid-auto-columns: min-content;
    grid-gap: 20px;
  }
</style>
