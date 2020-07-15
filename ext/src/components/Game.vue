<template>
  <div class="game">
    <h2 class="game__header">
      Игровая статистика
    </h2>
    <div class="game__info">
      Режим <span>"{{ tactic.mode.label }}"</span>, тактика <span>"{{ tactic.name }}"</span>
    </div>
    <div class="game__stat">
      <div class="game__stat-item">
        Сыграли {{ `${count} ${getWord(count, 'time')}` }}
      </div>

      <div
        :class="{'game__stat-item--lose': profit < 0}"
        class="game__stat-item game__stat-item--profit"
      >
        {{ profit < 0 ? 'Проиграли' : 'Выиграли' }}
        <span class="game__profit">
          {{ profit }}
        </span>
        <span class="game_currency">
          {{ currency.symbol }}
        </span>
      </div>

      <div
        class="game__stat-item game__stat-item--profit"
      >
        Побед: <span>{{ wins }}</span>
      </div>

      <div
        class="game__stat-item game__stat-item--profit"
      >
        Поражений: {{ loses }}
      </div>

      <div
        class="game__stat-item game__stat-item--profit"
      >
        Текущий этап: {{ stage }}
      </div>

      <div
        class="game__stat-item game__stat-item--profit"
      >
        Ставка: {{ currentBet }} {{ currency.symbol }}
      </div>
    </div>

    <div class="game__actions">
      <button class="btn btn_skin">
        Поставить на паузу
      </button>

      <button class="btn btn_full-red">
        СТОП
      </button>
    </div>

    <GameStat
      :stat="stat"
      :currency="currency.symbol"
      class="game__stat-block"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import GameStat from './GameStat'

  export default {
    name: 'Game',
    components: {
      GameStat
    },
    data() {
      return {
        count: 0,
        startBalance: 33,
        currentBalance: 22,
        wins: 0,
        loses: 0,
        stage: 1,
        currentBet: 0,
        stat: []
      }
    },
    computed: {
      ...mapGetters({
        tactic: 'getTactic',
        currency: 'getCurrency',
        autoStop: 'getAutoStop',
        functions: 'getFunctions'
      }),
      profit() {
        return this.currentBalance - this.startBalance
      }
    },
    mounted() {
      for (let i = 0; i < 99; i++) {
        this.stat.push(
          {
            bet: 1,
            isWin: true,
            event: 'Больше',
            profit: -1,
            stage: 3
          }
        )
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .game {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 28px 10px;
  }
  .game__header {
    margin-bottom: 20px;
  }
  .game__info {
    margin-bottom: 23px;
    font-size: 16px;
    color: $main;

    span {
      color: $accent;
    }
  }

  .game__stat {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;
  }

  .game__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;
  }

  .game__stat-block {
    flex: 1;
    overflow: hidden;
  }
</style>
