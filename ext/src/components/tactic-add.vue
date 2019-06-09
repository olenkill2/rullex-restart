<template lang="pug">
	.tactic-add-wr
		.tactic-add-top-actions
			.tactic-add-top-actions__left
				field(v-model="newTatic.name", label="Название", placeholder="Насос бабла")
			.tactic-add-top-actions__right
				dropdown(:list="rouletteModesList", v-model="currentMode", label="Режим")

		.tactic-add-header
			|Параметры этапа

		.etap-form-wr(v-if="!load")
			.etap-form__item(v-for="field in modeFields")
				|{{currentModeScheme[currentMode]}}
				|{{clearChema[currentMode]}}
				field(v-if="field.component == 'field'", v-model="currentModeScheme[currentMode][field.model]", :label="field.name", :placeholder="field.placeholder")
				dropdown(v-if="field.component == 'dropdown'", :list="field.dropDownList", v-model="currentModeScheme[currentMode][field.model]", :label="field.name")

		.etap-form-actions
			button.btn.btn_red.etap-form-actions__clear(@click="clearForm")
				|Очистить
			button.btn.etap-form-actions__add(@click="addNewStage")
				|Добавить этап
</template>
<script>
import field from '@/components/input.vue';
import dropdown from '@/components/drop-down.vue';
export default {
	name: 'tacticAdd',
	components: {
		field,
		dropdown
	},
	data: () => ({
		newTatic: {
			name: '',
			mode: '',
			stages: [],
		},
		modeFields: [],
		currentMode: '',
		currentModeScheme: {},
		clearChema: {},
		rouletteModesList: [],
		rouletteModes: {},
		load: false,
	}),
	computed: {
		roulette () {
			return this.$store.state.currentRoulette;
		},
		currentModeId () {
			return this.rouletteModes[this.currentMode];
		}
	},
	watch: {
		currentMode() {
			this.getModeScheme();
		}
	},
	methods: {
		setRate (rate) {
			this.newStage.rate = rate;
		},
		getModeScheme () {
			this.load = true;
			this.axios.get('/modes/' + this.currentModeId).then((res) => {
				this.modeFields = res.data.data.fields;
				let schema = {};
				for (let field of res.data.data.fields) {
					schema[field.model] = '';
				}

				this.$set(this.currentModeScheme, this.currentMode, schema);
				this.clearChema[this.currentMode] = Object.assign({}, this.currentModeScheme[this.currentMode], schema);
				this.load = false;
			}).catch((err) => {
				this.load = false;
				console.log(err.message);
			})
		},
		addNewStage () {
			this.newTatic.stages.push({ ...this.currentModeScheme[this.currentMode] });
			this.clearForm();
		},
		clearForm () {
			const mode = this.currentMode;
			this.currentModeScheme[mode] = Object.assign({}, this.currentModeScheme[mode], this.clearChema[mode]);
		}
	},
	mounted () {
	},
	created: function (params) {
		this.currentMode = this.roulette.gameFunctionForMode[0].modeName;
		for(let mode of this.roulette.gameFunctionForMode)
		{
			this.rouletteModesList.push(mode.modeName)
			this.rouletteModes[mode.modeName] = mode.mode_id;
		}
	}
}
</script>
<style lang="scss">
.tactic-add-top-actions
{
	padding-top: 22px;
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 25px;
	display: flex;
	justify-content: space-between;
}
.tactic-add-top-actions__left
{
	flex: 1;
	margin-right: 20px;
}
.tactic-add-header
{
	padding-left: 10px;
	padding-right: 10px;
	font-size: 18px;
	color: $main;
}
.etap-form-wr
{
	padding-top: 20px;
	margin-left: 10px;
	margin-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 18px;
	&:last-child
	{
		margin-bottom: 0;
	}
}
.etap-form__item
{
	flex-basis: 45%;
	margin-bottom: 25px;
}
.etap-form-actions
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 40px;
}
.btn.etap-form-actions__clear
{
	padding-left: 10px;
	padding-right: 10px;
	min-width: 120px;
}
.etap-form-actions__add
{
	flex: 1;
	margin-left: 20px;
}
</style>
