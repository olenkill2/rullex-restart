<template lang="pug">
	.tactic-saved-wr
		.tactic-saved-top
			field(v-model="search", label="Поиск", placeholder="Название или режим")
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
