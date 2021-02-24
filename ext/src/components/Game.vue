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
        Сыграли {{ `${iteration} ${getWord(iteration, 'time')}` }}
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
      <button
        v-if="globalStatus === 'play'"
        class="btn btn_skin"
        @click="pause"
      >
        Поставить на паузу
      </button>

      <button
        v-if="globalStatus === 'ready'"
        class="btn btn_accent game__play"
        @click="pause"
      >
        Начать играть
      </button>

      <button
        v-if="globalStatus === 'pause'"
        class="btn btn_skin"
        @click="play"
      >
        Продолжить игру
      </button>

      <button
        v-if="globalStatus === 'play'"
        class="btn btn_full-red"
        @click="stop"
      >
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
  import { mapGetters, mapMutations } from 'vuex'

  import GameStat from './GameStat'

  export default {
    name: 'Game',
    components: {
      GameStat
    },
    data() {
      return {
        count: 0,
        startBalance: 0,
        currentBalance: 0,
        loseMoney: 0,
        wins: 0,
        loses: 0,
        stage: 0,
        currentBet: 0,
        stat: [],
        gameFunction: null,
        iteration: 0,
        loseInStage: 0,
        timeout: null
      }
    },
    computed: {
      ...mapGetters({
        tactic: 'getTactic',
        currency: 'getCurrency',
        autoStop: 'getAutoStop',
        functions: 'getGameFunctions',
        userBalance: 'getBalance',
        globalStatus: 'getGlobalStatus'
      }),
      profit() {
        return this.currentBalance - this.startBalance
      },
      currentStage() {
        return this.tactic.stages[this.stage]
      }
    },
    mounted() {
      this.gameFunction = this.functions[this.tactic.mode.label]()
      this.startBalance = this.userBalance
    },
    methods: {
      ...mapMutations({
        setGlobalStatus: 'setGlobalStatus',
        setGameStat: 'setGameStat'
      }),
      play() {
        this.setGlobalStatus('play')
        this.gameing(this.iteration)
      },
      pause() {
        this.setGlobalStatus('pause')
      },
      stop() {
        clearTimeout(this.timeout)
        this.setGlobalStatus('ready')
      },
      gameing() {
        if (this.globalStatus !== 'play') {
          return false;
        }

        clearTimeout(this.timeout)

        this.timeout = setTimeout(async () => {
          const result = await this.gameFunction()

          this.updateGameStat(result)

          if (this.checkAutostop()) {
            this.gameing(++this.iteration)

            this.stat.unshift(result)
          } else {
            this.stop()
          }
        }, this.currentStage.delay.value)
      },
      checkAutostop() {
        const params = this.autoStop

        if (params) {
          return Object.keys(params).every((param) => {
            return this[param](params[param])
          })
        } else {
          return true
        }
      },
      gamesCount(maxCount) {
        return this.count !== Number(maxCount)
      },
      gamesLose(maxLoseGames) {
        return this.loses !== Number(maxLoseGames)
      },
      maxLose(maxLoseMoney) {
        return Number(this.loseMoney) < Number(maxLoseMoney)
      },
      maxProfit(maxProfit) {
        return this.profit < Number(maxProfit);
      },
      updateGameStat(result) {
        this.count++

        if(result.isWin) {
          this.wins++
          this.loseInStage = 0
          this.stage = 0
          this.currentBet = this.currentStage.betSize.value
        } else {
          this.loses++
          this.loseInStage++
          this.loseMoney += this.currentStage.betSize.value

          // if (this.loseInStage === this.currentStage.toNext) {
          //   this.stage++
          // }
        }

        // this.updateGameStat({
        //   wins: this.wins,
        //   loses: this.loses,
        //   balance: this.currentBalance
        // })
      }
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
    grid-template-columns: auto;
    grid-gap: 20px;
    margin-bottom: 30px;
  }

  .game__play {
    width: 100%;
  }

  .game-stat__header {
    margin-bottom: 20px;
  }

  .game__stat-block {
    flex: 1;
    overflow: hidden;
  }
</style>
