<template lang="pug">
	.popup
		.popup-message(v-if="roulette.length == 0")
		.popup-roulettes(v-else="")
		.popup-roulettes-item(v-for="item in roulette")
			|{{item.name}}
</template>
<script>
import Field from '@/components/input.vue'

export default {
	name: 'Dashboard',
	components: {
		Field
	},
	data: () => ({
		roulette: [],
		result: 0,
		// gameFunctionStr: ''
	}),
	methods: {
		// gameFunction () {
		// 	// this.gameFunctionStr();
		// }
	},
	mounted () {
		this.axios.get('http://localhost:3002/public/roulettes').then((res) => {
			this.roulette = res.data.data;
			// this.gameFunctionStr = eval(this.roulette[0].authValidationRuleFunction).call(this);
		}).catch((err) => {
			this.roulette = [];
		});
	}
}
</script>
