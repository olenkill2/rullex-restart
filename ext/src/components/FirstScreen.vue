<template>
	<div class="first-screen">
    <Block
      v-if="status === 'noAuth'"
      title="Ничего не работает"
      spoiler="Почему не работает?"
      :isOpen="true"
    >
      <template v-slot:spoiler>
        <p>
          Мы ничего не можем сделать Необходимо&nbsp;авторизоваться <a href="#">на сайте</a>
        </p>
        <p>
          Получи бонус при регистрации <a href="#">по ссылке</a>
        </p>
      </template>
    </Block>

    <Block
      v-if="status === 'noBalance'"
      title="Денег нет"
      spoiler="Как так?"
      :isOpen="true"
    >
      <template v-slot:spoiler>
        <p>И что ты собираешься ставить? <br> Даже {{ roulette.minBet }}{{ currency.symbol }} нет (</p>
        <p>Можешь получить бонус по коду <span class="code">*код*</span></p>
        <p class="freebie-wr"><a href="#" class="freebie-link">Больше халявы здесь</a></p>
      </template>
    </Block>

    <Block
      v-if="status === 'ready' && !userTactics.length"
      title="Пора начинать!"
      spoiler="Как начать?"
    >
      <template v-slot:spoiler>
        <p>
          Для работы нужны тактики игр <br>Их можно создать самому или взять тактики других пользователей
        </p>

        <a href="#">Детальная инструкция</a>
      </template>

      <template v-slot:content>
        <div class="actions-box">
          <button
            @click="createTactic"
            class="btn btn_skin"
          >
            Создать тактику
          </button>
        </div>
      </template>
    </Block>

    <Block
      v-if="status === 'ready' && userTactics.length"
      title="Пора начинать"
      spoiler="Что? Как? АААА!?"
    >
      <template v-slot:spoiler>
        <p>
          Выбриай режим и&nbsp;тактику для него. <br />
          Выбранная тактика отобразится внизу.
        </p>
        <p>
          Если нет нужного режима, то&nbsp;для него нет и&nbsp;тактики... Либо мы&nbsp;еще не&nbsp;поддерживаем этот режим)
        </p>
        <p>
          Не&nbsp;забудь настроить автостоп! <br />
          Параметры автостопа появятся после выбора режима и&nbsp;тактики
        </p>

        <a href="#">Детальная инструкция</a>
      </template>

      <template v-slot:content>
        <div class="actions-box actions-box--group">
          <button
            @click="createTactic"
            class="btn btn_skin"
          >
            Создать тактику
          </button>
          <button
            @click="selectTactic"
            class="btn"
          >
            Выбрать тактику
          </button>
        </div>

        <button
          @click="selectTactic"
          class="btn-row add-tactic-btn"
        >
          Управление тактиками
        </button>
      </template>
    </Block>
  </div>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Block from './ui/Block'

  export default {
    name: 'FirstScreen',
    components: {
      Block
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        status: 'getGlobalStatus',
        roulette: 'getRoulette',
        currency: 'getCurrency',
        userTactics: 'getSavedTactics',
      })
    },
    mounted () {
    },
    methods: {
      ...mapActions({
        setTab: 'setTab'
      }),
      createTactic() {
        this.routeTo('tactics')
        this.setTab('TacticAdd')
      },
      selectTactic() {
        this.routeTo('tactics')
        this.setTab('TacticSaved')
      }
    },
  }
</script>

<style lang="scss">
  .actions-box {
		padding-top: 24px;
    justify-content: flex-end;
    display: flex;

    &--group {
      justify-content: space-between;
      align-items: center;
    }
  }
  .add-tactic-btn {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
</style>
