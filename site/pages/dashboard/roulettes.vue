<template lang="pug">
	.page-content
		.modes-wr
		.modes-header
			.modes-header__left
				|Всего рулеток - {{roulettes.length}}
			.modes-header__right
				button.btn.btn_small(v-if="!rouletteFormShow", @click="rouletteFormShow = !rouletteFormShow", :class="{'btn_skin': rouletteFormShow}")
					|Добавить
				button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': rouletteFormShow}")
					|Отменить

		.roulette-form-wr(v-if="rouletteFormShow")
			.roulette-form-groups
				.roulette-form-groups__item
					.roulette-form__item-label Новая рулетка

					.roulette-form-groups-field-wr
						field(v-model="roulette.name", label="Название рулетки", type="text")

					.roulette-form-groups-field-wr
						text-field(v-model="roulette.description", label="Описание", type="text")

					.roulette-form-groups-field-wr
						field(v-model="roulette.host", label="Host", type="text")

					.roulette-form-groups-field-wr
						label.checkbox-label-wr
							checkbox(v-model="roulette.private")
							span.label-text
								|Приватная

					.roulette-form-group(v-if="modes.length")
						.roulette-form-group-label
							|Поддерживаемые режимы
						.roulette-form-group-item.roulette-form-groups-field-wr_select-mode(:key="key", v-for="(mode, key) in modes")
							checkbox(v-model="roulette.modes", name="modes", :value="mode", :label="mode.name")
							.roulette-form-group-add-function(@click="addMode(mode)", v-if="modeIsNotAdded(mode)")
								|Добавить функцию
							.roulette-form-group-add-function(@click="removeMode(mode)", v-else="")
								|Удалить функцию

					.roulette-form-groups-field-wr(v-else="")
						|Доступных режимов нет
						button.btn.btn_small(@click="$emit('changeTab', 1)") Создать

					.roulette-form-groups-field-wr
						.roulette-form-modes
							.roulette-form-mode(v-for="")

					.roulette-form-groups-field-wr
						dropdown(:list="refTypesList", v-model="roulette.referal.refType", label="Тип рефералки")

					.roulette-form-groups-field-wr(v-if="roulette.referal.refType == 'url'")
						field(v-model="roulette.referal.url", label="Реф. ссылка", type="text")

					.roulette-form-groups-field-wr(v-else="")
						field(v-model="roulette.referal.code", label="Реф. код", type="text")

				.roulette-form-groups__item
					.roulette-form__item-label Функции

					.roulette-form-groups-field-wr
						text-field(v-model="roulette.functions.authValidationRuleFunction", label="Функция валидации")

					.roulette-form-groups-field-wr
						text-field(v-model="roulette.functions.balanceParseFunction", label="Функция получения баланса")

					.roulette-form-groups-field-wr
						text-field(v-model="roulette.functions.referalChangeFunction", label="Функция получения подмены рефки")

					.roulette-form__item-label Игровые функции

					.roulette-form-groups-field-wr.roulette-form-groups-field-wr_modes(v-if="roulette.functions.gameFunctionForMode.length", v-for="(modeGameFunction, index) in roulette.functions.gameFunctionForMode")
						text-field(v-model="modeGameFunction.function", :label="'Игровая функция для ' + modeGameFunction.modeName")
						.remove-function(@click="removeMode(index)")

			div(v-if="addRouletteErrors")
				|{{addRouletteErrors}}

			.roulette-form-actions(v-if="!edit")
				.roulette-form-actions__item
					button.btn.btn_small.btn_red(@click="clearForm") Очистить
				.roulette-form-actions__item
					button.btn.btn_small.btn_accent(@click="addRoulette") Добавить

			.roulette-form-actions(v-else="")
				.roulette-form-actions__item
					button.btn.btn_small.btn_red(@click="deleteRoulette") Удалить рулетку
				.roulette-form-actions__item
					button.btn.btn_small.btn_accent(@click="updateRoulette") Сохранить

		.page-data-container
			.modes-message(v-if="!roulettes.length")
				|Рулеток пока нет

			table.roulettes-list(v-else="")
				tbody
					tr
						th №
						th Название
						th Host
						th Ref
						th Режимы
						th Приватная
						th Редактирование
					tr(v-for="(roulette, index) in roulettes")
						td {{index + 1}}
						td {{roulette.name}}
						td {{roulette.host}}
						td {{roulette.referal.refType}} - {{roulette.referal[roulette.referal.refType]}}
						td(v-if="roulette.functions")
							span(v-if="roulette.functions.gameFunctionForMode" v-for="mode in roulette.functions.gameFunctionForMode")
								|  {{mode.modeName}},
						td
							span(v-if="roulette.private")
								|Да
							span(v-else="")
								|Нет
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
		textField
	},
	data: () => ({
		roulettes: [],
		rouletteFormShow: true,
		roulette: {},
		modes: [],
		modesForDropDown: [],
		dropDownListItem: '',
		currentMode: '',
		componentsList: ['field', 'dropdown'],
		refTypesList: ['url', 'code'],
		refType: 'url',
		edit: false,
		addRouletteErrors: false,
	}),
	computed: {
	},
	methods: {
		modeIsNotAdded (mode) {
			for(let gameFunctionForMode of this.roulette.functions.gameFunctionForMode)
				if(gameFunctionForMode.mode_id.indexOf(mode._id) != -1)
				{
					console.log(gameFunctionForMode, mode);
					return false
				}
			return true;
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
				supportedModes: [],
				functions: {
					authValidationRuleFunction: '',
					balanceParseFunction: '',
					referalChangeFunction: '',
					gameFunctionForMode: [],
				},
				referal: {
					refType: this.refType,
					url: '',
					code: '',
				}
			}
		},
		addMode (mode) {
			this.roulette.supportedModes.push(mode);
			this.roulette.functions.gameFunctionForMode.push({
				modeName: mode.name,
				function: '',
				mode_id: mode._id
			});
		},

		setRouletteForEdit (index) {
			this.roulette = this.roulettes[index];
			this.edit = true;
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
	.roulettes-list
	{
		width: 100%;
		td,th
		{
			padding-right: 15px;
			white-space: nowrap;
			&:last-child
			{
				padding-right: 0;
			}
		}
	}
	.modes-header
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 40px;
	}
	.modes-header
	{
		font-size: 28px;
		color: $accent;
	}
	.modes-message
	{
		text-align: center;
		font-size: 20px;
		text-transform: uppercase;
	}
	.roulette-form-wr
	{
		padding-bottom: 60px;
	}
	.roulette-form-groups
	{
		display: flex;
		justify-content: space-between;
	}
	.roulette-form-group
	{
		margin-bottom: 20px;
	}
	.roulette-form-group-label
	{
		margin-bottom: 10px;
	}
	.roulette-form-group-item
	{
		margin-bottom: 15px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
	.roulette-form-groups__item
	{
		flex-basis: calc(50% - 17px);
	}
	.roulette-form-groups-field-wr
	{
		margin-bottom: 16px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
	.roulette-form-groups-field-wr_select-mode
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.btn
		{
			margin-left: 15px;
		}
	}
	.roulette-form-actions
	{
		display: flex;
		justify-content: flex-end;
		padding-top: 40px;
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
	.roulette-form-actions__item
	{
		margin-left: 20px;
		&:first-child
		{
			margin-left: 0;
		}
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
	.edit-field
	{
		max-width: 20px;
		height: 20px;
		max-width: 20px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		cursor: pointer;
		margin-left: 20px;
	}
	.edit-field
	{
		background-image: url('../../assets/icons/edit.svg');
		background-size: 80%;
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
