<template lang="pug">


</template>
<script>

export default {
	props: ['opened', 'editData', 'modes', 'roulettes'],

	data: () => ({

	}),
	methods: {

	},
	watch:
	{
	},
	computed:
	{
		currentModeId () {
			const mode_id = this.modes.filter(mode => mode.name == this.addModeName);
			return mode_id[0]._id;
		}
	},
	mounted () {
		this.addModeName = this.modes[0].name;
		this.getModesForDropdown();
	},
	created () {
		this.addModeName = this.modes[0].name;
		this.roulette = this.getRouletteSchema();
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';

</style>
