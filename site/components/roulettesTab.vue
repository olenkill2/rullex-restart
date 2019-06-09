<template lang="pug">
	.modes-wr
		.modes-header
			.modes-header__left
				|Всего рулеток - {{roulettesList.length}}
			.modes-header__right
				button.btn.btn_small(v-if="!rouletteFormShow", @click="rouletteFormShow = !rouletteFormShow", :class="{'btn_skin': rouletteFormShow}")
					|Добавить
				button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': rouletteFormShow}")
					|Отменить

		.roulette-form-wr(v-show="rouletteFormShow")
			.roulette-form-groups
				.roulette-form-groups__item
					.roulette-form__item-label Новая рулетка

					.roulette-form-groups-field-wr
						field(v-model="roulette.name", label="Название рулетки", type="text")

					.roulette-form-groups-field-wr
						field(v-model="roulette.host", label="Host", type="text")

					.roulette-form-groups-field-wr
						label.checkbox-label-wr
							checkbox(v-model="roulette.private")
							span.label-text
								|Приватная

					.roulette-form-groups-field-wr.roulette-form-groups-field-wr_select-mode
						dropdown(:list="modesListForDropDown", v-model="addModeName", label="Режим")
						button.btn.btn_small(@click="addMode") Добавить

					.roulette-form-groups-field-wr
						dropdown(:list="refTypesList", v-model="roulette.referal.refType", label="Тип рефералки")

					.roulette-form-groups-field-wr(v-if="roulette.referal.refType == 'url'")
						field(v-model="roulette.referal.url", label="Реф. ссылка", type="text")

					.roulette-form-groups-field-wr(v-else="")
						field(v-model="roulette.referal.code", label="Реф. код", type="text")

				.roulette-form-groups__item
					.roulette-form__item-label Функции

					.roulette-form-groups-field-wr
						text-field(v-model="roulette.authValidationRuleFunction", label="Функция валидации")

					.roulette-form-groups-field-wr
						text-field(v-model="roulette.balanceParseFunction", label="Функция получения баланса")

					.roulette-form-groups-field-wr
						text-field(v-model="roulette.referalChangeFunction", label="Функция получения подмены рефки")

					.roulette-form-groups-field-wr.roulette-form-groups-field-wr_modes(v-for="(modeGameFunction, index) in roulette.gameFunctionForMode")
						text-field(v-model="modeGameFunction.function", :label="'Игровая функция для ' + modeGameFunction.modeName")
						.remove-function(@click="removeMode(index)")

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
			.modes-message(v-if="roulettesList.length == 0")
				|Рулеток пока нет

			table.roulettes-list(v-else="")
				tbody
					tr
						th №
						th Название
						th Host
						th Ref
						th Режимы
						th Публичная
						th Редактирование
					tr(v-for="(roulette, index) in roulettesList")
						td {{index + 1}}
						td {{roulette.name}}
						td {{roulette.host}}
						td {{roulette.referal.refType}} - {{roulette.referal[roulette.referal.refType]}}
						td
							//- |{{roulette.gameFunctionForMode}}
							span(v-for="mode in roulette.gameFunctionForMode")
								|  {{mode.modeName}},
						td(v-if="roulette.private") Нет
						td(v-else="") Да
						td
							.edit-field.edit-field_roulette(@click="setRouletteForEdit(index)")

</template>
<script>
import field from '~/components/input';
import dropdown from '~/components/drop-down';
import checkbox from '~/components/checkbox';
import textField from '~/components/textarea';
export default {
	props: ['opened', 'editData', 'modesList', 'roulettesList'],
	components: {
		field,
		checkbox,
		dropdown,
		textField
	},
	data: () => ({
		// roulettesList: [],
		rouletteFormShow: false,
		roulette: {},
		// modesList: [],
		modesListForDropDown: [],
		dropDownListItem: '',
		addModeName: '',
		componentsList: ['field', 'dropdown'],
		refTypesList: ['url', 'code'],
		refType: 'url',
		edit: false,
	}),
	methods: {
		// getRoulettes () {
		// 	this.$axios.get('/api/roulettes').then((result) => {
		// 		this.roulettesList = result.data.data
		// 	}).catch((error) => { this.roulettesList = [];})
		// },
		getModesForDropdown () {
			this.addModeName = this.modesList[0].name;

			for(let mode of this.modesList) {
				this.modesListForDropDown.push(mode.name);
			}
			this.roulette.gameFunctionForMode[0].modeName = this.addModeName;
		},
		getRouletteSchema () {
			return {
				name: '',
				host: '',
				authValidationRuleFunction: '',
				balanceParseFunction: '',
				gameFunctionForMode: [
					{
						modeName: this.addModeName,
						function: '',
						mode_id: this.currentModeId
					}
				],
				referalChangeFunction: '',
				private: true,
				referal: {
					refType: 'url',
					url: '',
					code: '',
				}
			}
		},
		addMode () {
			let inArray = false;
			for(let modeFunction of this.roulette.gameFunctionForMode)
			{
				if(Object.values(modeFunction).indexOf(this.addModeName) > -1 )
				{
					inArray = true;
					break;
				}
			}

			if (!inArray)
			{
				this.roulette.gameFunctionForMode.push({
					modeName: this.addModeName,
					function: '',
					mode_id: this.currentModeId
				});
			}
		},
		addRoulette () {
			this.$axios.post('/api/roulettes', this.roulette).then((result, error) => {
				this.getRoulettes();
				this.cancelEdit();
			}).catch((error) => {
				this.error = true;
			})
		},
		setRouletteForEdit (index) {
			this.roulette = this.roulettesList[index];
			console.log(this.roulette);

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
		deleteRoulette () {
			this.$axios.delete('/api/roulettes/' + this.roulette._id).then((result, error) => {
				this.getRoulettes();
				this.cancelEdit();
			}).catch((error) => {
				this.error = true;
			})
		},
		updateRoulette () {
			this.$axios.put('/api/roulettes/' + this.roulette._id, this.roulette).then((result, error) => {
				this.getRoulettes();
				this.cancelEdit();
			}).catch((error) => {
				this.error = true;
			});
		}
	},
	watch:
	{
	},
	computed:
	{
		currentModeId () {
			const mode_id = this.modesList.filter(mode => mode.name == this.addModeName);
			return mode_id[0]._id;
		}
	},
	mounted () {
		// this.getRoulettes();
		this.addModeName = this.modesList[0].name;
		this.getModesForDropdown();
	},
	created () {
		this.addModeName = this.modesList[0].name;
		this.roulette = this.getRouletteSchema();
	}
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
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
		min-width: 20px;
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
		background-image: url('../assets/icons/edit.svg');
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
