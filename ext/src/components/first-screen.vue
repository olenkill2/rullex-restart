<template lang="pug">
	.first-screen
		.first-wr(v-if="$store.state.stateName == 'need-auth'")
			.first__content
				h2.first__header
					|Ничего не работает
				p Мы ничего не можем сделать Необходимо&nbsp;авторизоваться <a href="#">на nvuti</a>
				p Получи бонус при регистрации <a href="#">по ссылке</a>
		.first-wr(v-if="$store.state.stateName == 'need-balance'")
			.first__content
				h2.first__header
					|Денег нет
				p И что ты собираешься ставить? <br> Даже {{$store.state.minBet}} {{$store.state.currency}} нет (
				p Можешь получить бонус по коду <span class="code">*код*</span>
				p.freebie-wr <a href="#" class="freebie-link">Больше халявы здесь</a>
		.first-wr(v-if="$store.state.stateName == 'ready'")
			.first__content
				h2.first__header
					|Пора начинать
				p Для работы нужны тактики игр <br>Их можно создать самому или взять тактики других пользователей
				p <a href="#">Детальная инструкция</a>
			.first-screen-actions-wr
				button.btn.btn_add-tactic(@click="$store.commit('setRoute', 'tactics')")
					|Создать тактику
</template>
<script>
export default {
	name: 'first-screen',
	data: () => ({
	}),
	methods: {
	}
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
		padding-top: 24px;
		padding-left: 24px;
		padding-right: 22px;
		padding-bottom: 28px;
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
	}
	.btn_add-tactic
	{
		width: 100%;
	}
</style>
