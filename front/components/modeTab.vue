<template lang="pug">
	.modes-wr
		.modes-header
			.modes-header__left
				|Всего режимов - 0
			.modes-header__right
				button.btn.btn_small
					|Добавить

		.mode-form-wr
			//- .mode-form__header Добавление режима
			.mode-form-groups
				.mode-form-groups__item
					.mode-form__item-label Новый режим
					field(v-model="mode.name", label="Название режима", type="text")
				.mode-form-groups__item
					.mode-form__item-label Добавление полей
					.mode-form-groups-field-wr
						field(v-model="fieldObject.name", label="Название поля", type="text")
					.mode-form-groups-field-wr
						field(v-model="fieldObject.placeholder", label="Плейсхолдер поля", type="text")
					.mode-form-groups-field-wr
						field(v-model="fieldObject.model", label="Название модели", type="text")
					.mode-form-groups-field-wr
						dropdown(:list="componentsList", @select="setType", label="Тип компонента")
					.mode-form-groups-field-wr
						.field-droplist-items-wr(v-if="fieldObject.type == 'dropdown'")
							.field-droplist-items-top
								field(v-model="dropDownListItem", label="Параметр", type="text")
								button.btn.btn_skin.btn_small(@click="addDropListItem") Добавить
							.field-droplist-items-added
								.field-droplist-item(v-for="(dropItem, index) in fieldObject.dropDownList")
									|{{dropItem}}
									.field-droplist-item_remove(@click="removeDropListItem(index)")

					.mode-form-groups-field-wr
						button.btn.btn_small(@click="addField") Добавить

				.mode-form-groups__item
					.mode-form__item-label Список полей
					.mode-fields
						.mode-field-item(v-for="(modeField, index) in mode.fields")
							field(v-if="modeField.type == 'field'", :label="modeField.name", v-model="modeField.model", :placeholder="modeField.placeholder")
							dropdown(v-else="modeField.type == 'dropdown'", :list="modeField.dropDownList", @select="setType", :label="modeField.placeholder")
							.remove-field(@click="removeField(index)")
							.edit-field(@click="editField(index)")
			.mode-form-actions
				.mode-form-actions__item
					button.btn.btn_small.btn_red Очистить
				.mode-form-actions__item
					button.btn.btn_small.btn_accent Добавить


		.modes-message(v-if="modesList.length == 0")
			|Режимов пока нет
		table.modes-list(v-else="")
			tbody
				tr
					th №
					th Название
					th Список полей
					th Схема
					th Редактирование


</template>
<script>
import field from '~/components/input';
import dropdown from '~/components/drop-down';
import checkbox from '~/components/checkbox';

export default {
	props: ['opened', 'editData'],
	components: {
		field,
		checkbox,
		dropdown
	},
	data: () => ({
		modesList: [],
		showModeEditForm: false,
		mode: {
			name: '1',
			fields: [],
		},
		fieldObject: {
			name: '1',
			placeholder: '1',
			model: 'a',
			type: 'field',
			dropDownList: []
		},
		dropDownListItem: '',
		componentsList: ['field', 'dropdown']
	}),
	methods: {
		setType (type) {
			this.fieldObject.type = type;
		},
		removeDropListItem (index) {
			console.log(index);
			console.log(this.fieldObject.dropDownList);
			this.fieldObject.dropDownList = this.fieldObject.dropDownList.splice(index, 1);
		},
		addField () {
			this.mode.fields.push(this.fieldObject);
			this.fieldObject = {
				name: '',
				placeholder: '',
				model: '',
				type: 'field',
				dropDownList: []
			};
		},
		addDropListItem () {
			this.fieldObject.dropDownList.push(this.dropDownListItem);
			this.dropDownListItem = '';
		},
		removeField (index) {
			this.mode.fields.splice(index, 1);
			console.log(this.mode.fields);
		}
		// close () {
		// 	this.$emit('close');
		// },
		// addNewItem () {
		// 	this.$axios.post('/api/menu', this.linkData).then((result, error) => {
		// 		this.$emit('update');
		// 		this.close();
		// 	}).catch((error) => {
		// 		this.error = true;
		// 	})
		// },
		// selectCategory (category) {
		// 	if(category != null)
		// 		this.linkData.category = category;
		// 	else
		// 		this.linkData.category = null
		// },
		// updateItem () {
		// 	this.$axios.put('/api/menu', {link: this.linkData}).then((result, error) => {
		// 		this.$emit('update');
		// 		this.close();
		// 	}).catch((error) => {
		// 		this.error = true;
		// 	});
		// },
		// removeItem () {
		// 	this.$axios.delete('/api/menu', {data: {link: this.linkData}}).then((result, error) => {
		// 		this.$emit('update');
		// 		this.close();
		// 	}).catch((error) => {
		// 		this.error = true;
		// 	})
		// },
	},
	computed:
	{
		// edit () {
		// 	if(this.editData)
		// 	{
		// 		this.linkData = {...this.editData};
		// 		return true;
		// 	}
		// 	return false;
		// }
	},
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
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
	}
	.field-droplist-item
	{
		display: flex;
		align-items: center;
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
		min-width: 20px;
		height: 20px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		cursor: pointer;
		margin-left: 20px;
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
		background-image: url('../assets/icons/close.svg');
	}
	.edit-field
	{
		background-image: url('../assets/icons/edit.svg');
		background-size: 80%;
	}
</style>
