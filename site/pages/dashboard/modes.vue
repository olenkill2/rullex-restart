<template lang="pug">
	.page-content
		.modes-wr(v-if="modes")
			.pages-header
				.pages-header__left
					|Всего режимов - {{modes.length}}
				.pages-header__right
					button.btn.btn_small(v-if="!modeFormShow", @click="modeFormShow = !modeFormShow", :class="{'btn_skin': modeFormShow}")
						|Добавить
					button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': modeFormShow}")
						|Отменить

			.mode-form-wr(v-show="modeFormShow")
				.mode-form-groups
					.mode-form-groups__item
						.mode-form__item-label Новый режим
						field(v-model="mode.name", label="Название режима", type="text")
					.mode-form-groups__item
						.mode-form__item-label Добавление полей

						.mode-form-groups-field-wr
							field(v-model="field.name", label="Название поля", type="text")

						.mode-form-groups-field-wr
							field(v-model="field.placeholder", label="Плейсхолдер поля", type="text")

						.mode-form-groups-field-wr
							field(v-model="field.model", label="Название модели", type="text")

						.mode-form-groups-field-wr
							dropdown(:list="componentsList", v-model="field.component", label="Тип компонента")

						.mode-form-groups-field-wr(v-if="field.component == 'dropdown'")
							.field-droplist-items-wr
								.field-droplist-items-top
									field(v-model="dropDownListItem", label="Параметр", type="text")
									button.btn.btn_skin.btn_small(@click="addDropListItem") Добавить
								.field-droplist-items-added
									.field-droplist-item(v-for="(dropItem, index) in field.dropDownList")
										|{{dropItem}}
										.field-droplist-item_remove(@click="removeDropListItem(index)")

						.mode-form-groups-field-wr
							button.btn.btn_small.btn_full(v-if="!editingField", @click="addField") Добавить
							button.btn.btn_small.btn_full(v-else="", @click="updateField") Изменить

					.mode-form-groups__item
						.mode-form__item-label Список полей
						.mode-fields
							.mode-field-item(v-for="(modeField, index) in mode.fields")
								field(v-if="modeField.component == 'field'", :label="modeField.name", :placeholder="modeField.placeholder")
								dropdown(v-else="modeField.component == 'dropdown'", :list="modeField.dropDownList", :label="modeField.name")
								.remove-field(@click="removeField(index)")
								.edit-field(@click="editField(index)")

				.mode-form-actions(v-if="!editingMode")
					.mode-form-actions__item
						button.btn.btn_small.btn_red Очистить
					.mode-form-actions__item
						button.btn.btn_small.btn_accent(@click="addMode") Добавить

				.mode-form-actions(v-else="")
					.mode-form-actions__item
						button.btn.btn_small.btn_red(@click="removeMode") Удалить
					.mode-form-actions__item
						button.btn.btn_small.btn_accent(@click="updateMode") Сохранить изменения


			.pages-message(v-if="modes.length == 0")
				|Режимов пока нет

			table.dashboard-table(v-else="")
				tbody
					tr
						th №
						th Название
						th Список полей
						th Схема
						th Редактирование
					tr(v-for="(mode, index) in modes")
						th {{index + 1}}
						th {{mode.name}}
						th
							div(v-if="showModeFieldsList !== index", @click="showModeFieldsList = index") Показать
							div(v-else="", @click="showModeFieldsList = false") Свернуть
							pre(v-if="showModeFieldsList === index") {{mode.fields}}
						th
							div(v-for="(field, index) in mode.fields") {{field.name}}, {{field.model}}
						th
							.edit-field.edit-field_mode(@click="editMode(index)")
</template>
<script>
export default {
	layout (context) {
		return 'dashboard'
	},
	async asyncData (req) {
		try {
			const modes = await req.$axios.get(process.env.baseUrl + '/modes');
			return await { modes: modes.data.data};
		} catch (err) {
			return { modes: []};
		}
	},
	middleware: ['authenticated'],
	data: () => ({
		// modes: [],
		showModeEditForm: false,
		modeFormShow: false,
		mode: {
			name: '',
			fields: [],
		},
		field: {},
		showModeFieldsList: false,
		dropDownListItem: '',
		componentsList: ['field', 'dropdown'],
		editingMode: false,
		editingField: false,
		editFieldIndex: 0,
	}),
	methods: {
		getFieldSchema () {
			return {
				name: '',
				placeholder: '',
				model: '',
				component: this.field.component,
				dropDownList: [],
			}
		},
		removeDropListItem (index) {
			this.field.dropDownList.splice(index, 1);
		},
		addField () {
			this.mode.fields.push(this.field);
			this.field = this.getFieldSchema();
		},
		editField (index) {
			this.editingField = true;
			this.editFieldIndex = index;
			this.field = {...this.mode.fields[this.editFieldIndex]};
		},
		updateField () {
			this.mode.fields[this.editFieldIndex] = this.field;
			this.editingField = false;
			this.field = this.getFieldSchema();
		},
		removeField (index) {
			this.mode.fields.splice(index, 1);
		},
		addDropListItem () {
			this.field.dropDownList.push(this.dropDownListItem);
			this.dropDownListItem = '';
		},
		addMode () {
			this.$axios.post('/api/modes/', this.mode).then((result, error) => {
				this.cancelEdit();
				this.getModes();
			}).catch((error) => {
				this.error = true;
			})
		},
		editMode (index) {
			this.editingMode = true;
			this.modeFormShow = true;
			this.mode = this.modes[index];
		},
		removeMode () {
			this.$axios.delete('/api/modes/' + this.mode._id).then((result, error) => {
				this.getModes();
				this.cancelEdit();
			}).catch((error) => {
				this.error = true;
			})
		},
		updateMode () {
			this.$axios.put('/api/modes/' + this.mode._id, this.mode).then((result, error) => {
				this.getModes();
				this.cancelEdit();
			}).catch((error) => {
				this.error = true;
			})
		},
		cancelEdit () {
			this.editingMode = false;
			this.modeFormShow = false;
			this.field = this.getFieldSchema();
			this.mode = {
				name: '',
				fields: [],
			}
		},
		getModes () {
			this.$axios.get('/api/modes').then((result) => {
				this.modes = result.data.data;
			})
		}
	},
	mounted () {
		this.field = this.getFieldSchema();
	}
}
</script>
<style lang="scss">
	.modes-list
	{
		width: 100%;
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
	.mode-form-wr
	{
		padding-bottom: 60px;
	}
	.mode-form-groups
	{
		display: flex;
		justify-content: space-between;
	}
	.mode-form-groups__item
	{
		flex-basis: calc(33.333333% - 17px);
	}
	.mode-form-groups-field-wr
	{
		margin-bottom: 16px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
	.mode-form-actions
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
		flex-wrap: wrap;
	}
	.field-droplist-item
	{
		display: flex;
		align-items: center;
		padding-right: 10px;
		padding-bottom: 8px;
	}
	.mode-form-actions__item
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
	.field-droplist-item_remove,
	.remove-field,
	.edit-field
	{
		max-width: 20px;
		width: 100%;
		height: 20px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		cursor: pointer;
		margin-left: 15px;
	}
	.field-droplist-item_remove
	{
		margin-left: 5px;
		min-width: 15px;
		height: 15px;
		background-size: cover;
	}
	.remove-field,
	.field-droplist-item_remove
	{
		background-image: url('../../assets/icons/close.svg');
	}
	.edit-field
	{
		background-image: url('../../assets/icons/edit.svg');
		background-size: 80%;
		&.edit-field_mode
		{
			margin-left: 0;
		}
	}
</style>
