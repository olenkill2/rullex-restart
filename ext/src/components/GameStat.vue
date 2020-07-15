<template>
  <div class="game-stat">
    <h2 class="game-stat__header">
      Игровая статистика
    </h2>

    <table class="game-stat__table">
      <tr>
        <th class="game-stat__table-event">
          <span class="game-stat__event game-stat__event--lose" />
          <span class="game-stat__event game-stat__event--position" />
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

          <span
            :class="{'game-stat__currency--lose': Number(event.profit) < 0}"
            class="game-stat__currency"
          >
            {{ currency }}
          </span>
        </td>
        <td>
          {{ event.stage }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
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
    }
  }
</script>

<style lang="scss">
  .game-stat {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .game-stat__table {
    width: 100%;
    height: 100%;
    overflow: hidden;

    th {
      position: relative;
    }
  }
  .game-stat__event {
    width: 8px;
    height: 8px;
    display: block;
    border-radius: 100%;
    background-color: $green;

    &--lose {
      background-color: $red;
    }

    &--position {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
    }
  }

  .game-stat__table-event {
    padding-right: 5px;
  }

</style>
