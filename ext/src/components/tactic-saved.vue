<template lang="pug">
	.tactic-saved-wr
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
					button.btn-str.btn-str_remove
						|Удалить
					button.btn-str
						|Изменить
					button.btn.btn_accent()
						|Сохранить

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
	}),
	methods: {
		declOfNum(n, titles) {
			return n + ' ' + titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
		},
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
</style>
