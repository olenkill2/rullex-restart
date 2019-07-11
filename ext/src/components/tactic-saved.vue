<template lang="pug">
	.tactic-saved-wr
		.tactic-saved-no(v-if="!$store.state.userSavedTacticsCount")
			|Тактик нет, добавьте тактику
		.tactic-saved-box(v-else="")
			.tactic-saved-top
				field(v-model="search", label="Поиск", placeholder="Название или режим")
			.tactic-saveds
				.tactic-saved(v-for="(tactic, index) in userSavedTactics")
					.tactic-saved__top
						.tactic-saved__name
							|{{tactic.name}}
					.tactic-saved__body
						.tactic-saved__body-item
							|Режим - {{tactic.mode}}
						.tactic-saved__body-item
							|{{declOfNum(tactic.stages.length, ['этап', 'этапа', 'этапов'])}}
					.tactic-saved__footer
						button.btn-str.btn-str_remove(@click="removeTactic(index)")
							|Удалить
						button.btn-str(@click="editUserTactic(index)")
							|Подробнее
						button.btn.btn_accent.tactic-saved__select()
							|Выбрать
		tactcViewer(v-if="tacticToEdit", :tactic="tacticToEdit", @remove="removeStage", @edit="editStage", :stagesLength="tacticToEdit.stages.length", @tacticSaved="tacticSaved")
</template>
<script>
import field from '@/components/input.vue';
import tactcViewer from '@/components/tactic-viewer.vue';
export default {
	name: 'tacticSaved',
	components: {
		field,
		tactcViewer
	},
	data: () => ({
		search: '',
		tacticToEdit: false,
	}),
	methods: {
		declOfNum(n, titles) {
			return n + ' ' + titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
		},
		removeTactic(id) {
			let userTactics = JSON.parse(localStorage.getItem('userTactics'));
			delete userTactics[this.$store.state.currentRoulette.name][id];
			localStorage.setItem('userTactics', JSON.stringify(userTactics));
			this.$store.dispatch('getUserSavedTactics');
		},
		editUserTactic(id) {
			this.tacticToEdit = this.$store.state.userSavedTactics[id];
			console.log(this.tacticToEdit);
		},
		removeStage() {

		},
		editStage() {

		},
		tacticSaved() {

		}
	},
	computed: {
		userSavedTactics () {
			return this.$store.state.userSavedTactics;
		},
	}
}
</script>
<style lang="scss">
.tactic-saved-top
{
	padding-top: 22px;
	padding-left: 10px;
	padding-right: 10px;
}
.tactic-saveds
{
	padding-top: 28px;
	padding-bottom: 20px;
}
.tactic-saved
{
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 28px;
	padding-top: 20px;
	border-bottom: 1px solid #E1EEF6;
	&:first-child
	{
		padding-top: 0;
	}
	&:last-child
	{
		border-bottom: none;
	}
}
.tactic-saved__name
{
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
}
.tactic-saved__body
{
	display: flex;
	justify-content: space-between;
	padding-top: 15px;
	padding-bottom: 18px;
}
.tactic-saved__body-item
{
	flex-basis: 48%;
	color: $main;
}
.tactic-saved__footer
{
	display: flex;
	justify-content: flex-end;
}
.btn.tactic-saved__select
{
	max-width: 120px;
	min-width: 120px;
	margin-left: 10px;
}
</style>
