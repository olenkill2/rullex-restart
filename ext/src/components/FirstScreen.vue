<template>
	<div class="first-screen">
    <div
      v-if="status === 'noAuth'"
      class="first-wr"
    >
      <div class="first__content">
        <h2 class="first__header">Ничего не работает</h2>
        <p>Мы ничего не можем сделать Необходимо&nbsp;авторизоваться <a href="#">на сайте</a></p>
        <p>Получи бонус при регистрации <a href="#">по ссылке</a></p>
      </div>
    </div>

    <div
      v-if="status === 'noBalance'"
      class="first-wr"
    >
      <div class="first__content">
        <h2 class="first__header">Денег нет</h2>
        <p>И что ты собираешься ставить? <br> Даже {{ roulette.minBet }}{{ currency.symbol }} нет (</p>
        <p>Можешь получить бонус по коду <span class="code">*код*</span></p>
        <p class="freebie-wr"><a href="#" class="freebie-link">Больше халявы здесь</a></p>
      </div>
    </div>

    <div
      v-if="status === 'ready' && !userTactics.length"
      class="first-wr"
    >
      <div class="first__content">
        <h2 class="first__header">Пора начинать</h2>
        <p>Для работы нужны тактики игр <br>Их можно создать самому или взять тактики других пользователей</p>
        <p><a href="#">Детальная инструкция</a></p>
      </div>
      <div class="first-screen-actions-wr">
        <button
          @click="routeTo('tactics')"
          class="btn btn_add-tactic"
        >
          Создать тактику
        </button>
      </div>
    </div>

    <div
      v-if="status === 'ready' && userTactics.length"
      class="first-wr"
    >
      <div class="first__content">
        <h2 class="first__header">Пора начинать</h2>
        <p>Выберу одну из своих тактик или создай новый "Насос бабла 3 000"!</p>
        <p><a href="#">Детальная инструкция</a></p>
      </div>
      <div class="first-screen-actions-wr first-screen-actions-wr_tactics">
        <button
          @click="createTactic"
          class="btn btn_add-tactic"
        >
          Создать тактику
        </button>
        <button
          @click="selectTactic"
          class="btn btn_add-tactic btn_accent"
        >
          Выбрать тактику
        </button>
      </div>
    </div>
  </div>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'FirstScreen',
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
	.first-wr
	{
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(98, 103, 125, 0.1);
		border-radius: 4px;
		margin-left: 10px;
		margin-right: 10px;
    padding: 24px 22px 28px 24px;
    margin-top: 26px;
		p
		{
			color: $main;
			font-size: 14px;
			line-height: 20px;
			&:last-child
			{
				margin-bottom: 0;
			}
			a
			{
				color: $main;
			}
		}
	}
	.first__header
	{
		margin-bottom: 14px;
	}
	.freebie-link
	{
		font-size: 12px;
	}
	.first-screen-actions-wr
	{
		padding-top: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.btn_add-tactic
	{
		width: 100%;
	}
	.first-screen-actions-wr_tactics
	{
		.btn_add-tactic
		{
			flex-basis: 47%;
			font-size: 12px;
			padding-left: 0;
			padding-right: 0;
			min-width: auto;
		}
	}
</style>
