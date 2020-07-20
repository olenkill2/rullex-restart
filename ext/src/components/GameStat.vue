<template>
  <div class="game-stat">
    <h2 class="game-stat__header">
      Игровая статистика
    </h2>

    <table class="game-stat__table">
      <thead>
        <tr>
          <th class="game-stat__table-event">
            <span class="game-stat__event game-stat__event--lose game-stat__event--position-1" />
            <span class="game-stat__event game-stat__event--position-2" />
          </th>
          <th>
            №
          </th>
          <th>
            Поставили {{ currency }}
          </th>
          <th>
            Выпало
          </th>
          <th>
            Профит
          </th>
          <th>
            Этап
          </th>
        </tr>
      </thead>
      <tbody ref="body" class="game-stat__table-body">
        <tr
          v-for="(event, key) in stat" :key="key"
        >
          <td>
            <span
              :class="{'game-stat__event--lose': !event.isWin}"
              class="game-stat__event"
            />
          </td>
          <td>
            {{ key + 1 }}
          </td>
          <td>
            {{ event.bet }}
          </td>
          <td>
            {{ event.event }}
          </td>
          <td>
            {{ event.profit }}

            <Currency
              :is-lose="Number(event.profit) < 0"
              class="game-stat__currency"
            >
              {{ currency }}
            </Currency>
          </td>
          <td>
            {{ event.stage }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Currency from '@/components/ui/Currency'

  export default {
    name: 'GameStat',
    props: {
      stat: {
        type: Array,
        required: true
      },
      currency: {
        type: String,
        required: true
      }
    },
    components: {
      Currency
    },
    watch: {
      stat() {
        this.$refs.body.scrollTo({
          top: this.$refs.body.scrollHeight,
          behavior: 'smooth'
        })
      }
    }
  }
</script>

<style lang="scss">
  .game-stat {
    /*display: flex;*/
    /*flex-direction: column;*/
  }

  .game-stat__table {
    height: calc(100% - 38px);
    width: 100%;
    overflow: hidden;

    th, td {
      position: relative;

      &:nth-child(1) {
        width: 20px;
      }

      &:nth-child(2) {
        width: 30px;
      }

      &:nth-child(3) {
        width: 100px;
      }

      &:nth-child(6) {
        width: 40px;
      }
    }

    tbody {
        display: block;
        height: calc(100% - 30px);
        overflow: auto;
    }
    thead, tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    thead {
      width: calc( 100% - 4px );
      margin-bottom: 10px;
    }

    tr:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  .game-stat__table-body {
    overflow: auto;
    height: 100%;
  }

  .game-stat__event {
    width: 8px;
    height: 8px;
    display: block;
    margin-left: 2px;
    border-radius: 100%;
    background-color: $green;

    &--lose {
      background-color: $red;
    }

    &--position-1 {
      margin-left: 0;
    }

    &--position-2 {
      position: absolute;
      margin-left: 1px;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
    }
  }

  .game-stat__table-event {
    padding-right: 5px;
  }

</style>
