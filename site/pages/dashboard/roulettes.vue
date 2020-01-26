<template lang="pug">
	.page-content
		.pages-wr
		.pages-header
			.pages-header__left
				|Всего рулеток - {{roulettes.length}}
			.pages-header__right
				button.btn.btn_small(v-if="!rouletteFormShow", @click="rouletteFormShow = !rouletteFormShow", :class="{'btn_skin': rouletteFormShow}")
					|Добавить
				button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': rouletteFormShow}")
					|Отменить

		.pages-form-wr(v-if="rouletteFormShow")
			.pages-form-groups
				.pages-form-groups__item
					.pages-form__item-label Новая рулетка

					.pages-form-groups-field-wr
						field(v-model="roulette.name", label="Название рулетки", type="text", rules="required")

					.pages-form-groups-field-wr
						text-field(v-model="roulette.description", label="Описание", type="text", rules="required")

					.pages-form-groups-field-wr
						field(v-model="roulette.host", label="Host", type="text", rules="required")

					.pages-form-groups-field-wr
						field(v-model="roulette.currency.symbol", label="Символ валюты", placeholder="$", type="text", rules="required")

					.pages-form-groups-field-wr
						field(v-model="roulette.currency.name", label="Название валюты", placeholder="Доллар", type="text", rules="required")

					.pages-form-groups-field-wr
						checkbox(v-model="roulette.private", label="Приватная")

					.pages-form-group(v-if="modes.length")
						.pages-form-group-label
							|Поддерживаемые режимы

						.pages-form-group-item.pages-form-groups-field-wr_select-mode(:key="key", v-for="(mode, key) in modes")
							checkbox(type="checkbox", v-model="roulette.modes", name="modes", :value="mode", :key="key", :label="mode.name")
							.pages-form-group-add-function-wr
								.pages-form-group-add-function(@click="addMode(mode)" v-if="!modeSupported(mode)")
									|Добавить функцию
								.pages-form-group-add-function(@click="removeMode(mode)", v-else="")
									|Удалить функцию

					.pages-form-groups-field-wr(v-else="")
						|Доступных режимов нет
						button.btn.btn_small(@click="$emit('changeTab', 1)") Создать

					.pages-form-groups-field-wr
						.pages-form-modes
							.pages-form-mode(v-for="")

					.pages-form-groups-field-wr
						dropdown(:list="refTypesList", v-model="roulette.referal.refType", label="Тип рефералки")

					.pages-form-groups-field-wr(v-if="roulette.referal.refType == 'url'")
						field(v-model="roulette.referal.url", label="Реф. ссылка", type="text")

					.pages-form-groups-field-wr(v-else="")
						field(v-model="roulette.referal.code", label="Реф. код", type="text")

				.pages-form-groups__item
					.pages-form__item-label Функции

					.pages-form-groups-field-wr
						text-field(v-model="roulette.functions.authValidationRuleFunction", label="Функция валидации")

					.pages-form-groups-field-wr
						text-field(v-model="roulette.functions.balanceParseFunction", label="Функция получения баланса")

					.pages-form-groups-field-wr
						text-field(v-model="roulette.functions.referalChangeFunction", label="Функция получения подмены рефки")

					.pages-form__item-label Игровые функции

					.pages-form-groups-field-wr.pages-form-groups-field-wr_modes(v-if="roulette.gameFunctionForMode.length", v-for="(func, index) in roulette.gameFunctionForMode", :key="index")
						text-field( v-model="func.gameFunc", :label="'Игровая функция для ' + func.mode.name")

			div(v-if="addRouletteErrors")
				|{{addRouletteErrors}}

			.pages-form-actions(v-if="!edit")
				.pages-form-actions__item
					button.btn.btn_small.btn_red(@click="clearForm") Очистить
				.pages-form-actions__item
					button.btn.btn_small.btn_accent(@click="addRoulette") Добавить

			.pages-form-actions(v-else="")
				.pages-form-actions__item
					button.btn.btn_small.btn_red(@click="deleteRoulette") Удалить рулетку
				.pages-form-actions__item
					button.btn.btn_small.btn_accent(@click="updateRoulette") Сохранить

		.page-data-container
			.pages-message(v-if="!roulettes.length")
				|Рулеток пока нет

			table.dashboard-table(v-else="")
				tbody
					tr
						th №
						th Название
						th Host
						th Ref
						th Режимы
						th Доступные режимы
						th Приватная
						th Редактирование

					tr(v-for="(roulette, index) in roulettes")
						td {{index + 1}}
						td {{roulette.name}}
						td {{roulette.host}}
						td
							span(v-if="roulette.referal[roulette.referal.refType]") {{roulette.referal.refType}} - {{roulette.referal[roulette.referal.refType]}}
							span(v-else) Не задана
						td(v-if="roulette.modes")
							nuxt-link(v-for="(mode, index) in roulette.modes", :key="index", :to="'/dashboard/modes?id=' + mode._id")
								|  {{mode.name}};
						td(v-if="roulette.gameFunctionForMode")
							nuxt-link(v-for="(gameFunction, index) in roulette.gameFunctionForMode", :key="index", :to="'/dashboard/modes?id=' + gameFunction.mode._id")
								|{{gameFunction.mode.name}}
						td
							span(v-if="roulette.private") Да
							span(v-else="") Нет
						td
							.edit-field.edit-field_roulette(@click="setRouletteForEdit(index)")
</template>

<script>
import field from '~/components/input';
import dropdown from '~/components/drop-down';
import checkbox from '~/components/checkbox';
import textField from '~/components/textarea';

export default {
	async asyncData ({$axios, redirect, res, route}) {
		try {
			let roulettes = await $axios.get(process.env.baseUrl + '/roulettes');
			let modes = await $axios.get(process.env.baseUrl + '/modes');
			return await { roulettes: roulettes.data.data, modes: modes.data.data};
		} catch (err) {
			return await { roulettes: [], modes: []};
		}
	},
	layout (context) {
		return 'dashboard'
	},
	name: 'roulettes',
	middleware: ['authenticated'],
	components: {
		field,
		checkbox,
		dropdown,
		textField,
	},
	data: () => ({
		roulette: {},
		modes: [],
		roulettes: [],
		modesForDropDown: [],
		dropDownListItem: '',
		currentMode: '',
		refType: 'url',
		refTypesList: ['url', 'code'],
		componentsList: ['field', 'dropdown'],
		edit: false,
		rouletteFormShow: false,
		addRouletteErrors: false
	}),
	computed: {
	},
	methods: {
		modeSupported (mode) {
			const index = this.roulette.gameFunctionForMode.findIndex(supportedMode => supportedMode.mode._id == mode._id);
			return this.roulette.gameFunctionForMode[index] ? true : false;
		},

		getRoulettes () {
			this.$axios.get('/api/roulettes').then((response) => {
				this.roulettes = response.data.data
			}).catch((error) => { this.roulettes = [];})
		},

		getRouletteSchema () {
			return {
				name: '',
				host: '',
				description: '',
				private: true,
				color: '#333333',
				modes: [],
				currency: {
					symbol: '',
					name: ''
				},
				functions: {
					authValidationRuleFunction: '',
					balanceParseFunction: '',
					referalChangeFunction: '',
				},
				gameFunctionForMode: [],
				referal: {
					refType: this.refType,
					url: '',
					code: '',
				}
			}
		},

		addMode (supportedMode) {
			this.roulette.gameFunctionForMode.push({mode: {...supportedMode}, gameFunc: ''});
		},

		removeMode (mode) {
			const index = this.roulette.gameFunctionForMode.findIndex(addModed => addModed._id == mode._id);
			this.roulette.gameFunctionForMode.splice(index, 1);
		},

		setRouletteForEdit (index) {
			this.edit = true;
			this.roulette = JSON.parse(JSON.stringify(this.roulettes[index]));
			this.rouletteFormShow = true;
		},

		clearForm () {
			this.roulette = this.getRouletteSchema();
		},

		cancelEdit () {
			this.roulette = this.getRouletteSchema();
			this.edit = false;
			this.rouletteFormShow = false;
		},

		addRoulette () {
			this.$axios.post('/api/roulettes', this.roulette).then((response, error) => {
				this.getRoulettes();
				this.cancelEdit();
			}).catch((error, res) => {
				this.addRouletteErrors = error;
			})
		},

		deleteRoulette () {
			this.$axios.delete('/api/roulettes/' + this.roulette._id).then((response, error) => {
				this.getRoulettes();
				this.cancelEdit();
			}).catch((error, res) => {
				this.error = true;
			})
		},

		updateRoulette () {
			this.$axios.put('/api/roulettes/' + this.roulette._id, this.roulette).then((response, error) => {
				this.getRoulettes();
				this.cancelEdit();
			}).catch((error) => {
				this.error = true;
			});
		}
	},
	created () {
		this.roulette = this.getRouletteSchema();
	}
}
</script>

<style lang="scss">
	.page-data-container
	{
		padding-bottom: 40px;
		width: 100%;
		overflow-x: auto;

	}


	.field-droplist-items-top
	{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		.btn
		{
			min-width: 60px;
			margin-left: 10px;
		}
	}
	.field-droplist-items-added
	{
		padding-top: 15px;
		font-size: 14px;
		color: $main;
		display: flex;
		vertical-align: top;
	}
	.field-droplist-item
	{
		display: flex;
		align-items: center;
	}

	.mode-field-item
	{
		margin-bottom: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
	.roulettes-list
	{
		vertical-align: top;
		th
		{
			vertical-align: top;
		}
	}
	.edit-field_roulette
	{
		margin-left: 0;
	}
</style>
