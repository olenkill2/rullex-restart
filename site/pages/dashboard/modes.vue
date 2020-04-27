<template>
	<div class="page-content">
    <div
      v-if="modes"
      class="modes-wr"
    >
      <page-header
        :title="`Всего режимов - ${modes.length}`"
        @close="modeFormShow = false"
        @open="modeFormShow = true"
      />

      <div
        v-if="modeFormShow"
        class="mode-form-wr"
      >
        <div class="mode-form-groups">
          <div class="mode-form-groups__item">
            <div class="mode-form__item-label">Новый режим</div>
            <field
              v-model="mode.name" l
              abel="Название режима"
              type="text"
            />
          </div>
          <div class="mode-form-groups__item">
            <div class="mode-form__item-label">Добавление полей</div>

            <div class="mode-form-groups-field-wr">
              <field
                v-model="field.name"
                label="Название поля"
                type="text"
              />
            </div>
            <div class="mode-form-groups-field-wr">
              <field
                v-model="field.placeholder"
                label="Плейсхолдер поля"
                type="text"
              />
            </div>
            <div class="mode-form-groups-field-wr">
              <field
                v-model="field.model"
                label="Название модели"
                type="text"
              />
            </div>
            <div class="mode-form-groups-field-wr">
              {{field.component}}
              <dropdown
                :options="componentsList"
                v-model="field.component"
                :value="field.component"
                label="Тип компонента"
              />
            </div>
            <div
              v-if="field.component === 'dropdown'"
              class="mode-form-groups-field-wr"
            >
              <div class="field-droplist-items-wr">
                <field
                  v-model="dropDownListItem.label"
                  label="Название параметра"
                  type="text"
                />
                <field
                  v-model="dropDownListItem.value"
                  label="Значение для параметра"
                  type="text"
                />
                <button
                  @click="addDropListItem"
                  class="btn btn_skin btn_small"
                >
                  Добавить
                </button>

                <div class="field-droplist-items-added">
                  <div class="field-droplist-item" v-for="(dropItem, index) in field.dropDownList">
                    {{ dropItem }}
<!--                    {{ dropItem.label }} {{ dropItem.value }}-->
                    <div class="field-droplist-item_remove" @click="removeDropListItem(index)"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mode-form-groups-field-wr">
              <button class="btn btn_small btn_full" v-if="!editingField" @click="addField">Добавить</button>
              <button class="btn btn_small btn_full" v-else="" @click="updateField">Изменить</button>
            </div>
          </div>
          <div class="mode-form-groups__item">
            <div class="mode-form__item-label">Список полей</div>

            <div class="mode-fields">
              <div
                v-for="(modeField, index) in mode.fields"
                class="mode-field-item"
              >
                <field
                  v-if="modeField.component === 'field'"
                  :label="modeField.name"
                  :placeholder="modeField.placeholder"
                />
                <dropdown
                  v-else
                  :options="modeField.dropDownList"
                  :label="modeField.name"
                />

                <div class="remove-field" @click="removeField(index)"></div>
                <div class="edit-field" @click="editField(index)"></div>
              </div>
            </div>
          </div>
        </div>
        <FormControls
          :isEdit="editingMode"
          @add="addMode"
          @delete="removeMode"
          @update="updateMode"
          @clear="clearForm"
        />

<!--        <div class="mode-form-actions" v-if="!editingMode">-->
<!--          <div class="mode-form-actions__item">-->
<!--            <button class="btn btn_small btn_red">Очистить</button>-->
<!--          </div>-->
<!--          <div class="mode-form-actions__item">-->

<!--          </div>-->
<!--        </div>-->
<!--        <div class="mode-form-actions" v-else="">-->
<!--          <div class="mode-form-actions__item">-->
<!--          </div>-->
<!--          <div class="mode-form-actions__item">-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div
        class="pages-message"
        v-if="!modes.length"
      >
        Режимов пока нет
      </div>
      <DashboardTable
        v-else
        :headers="tableHeaders"
      >
        <template v-slot:body>
          <tr v-for="(mode, index) in modes">
            <th>{{index + 1}}</th>
            <th>{{mode.name}}</th>
            <th>
              <div
                v-if="showModeFieldsList !== index"
                @click="showModeFieldsList = index"
              >
                Показать
              </div>
              <div
                v-else
                @click="showModeFieldsList = false"
              >
                Свернуть
              </div>
              <pre v-if="showModeFieldsList === index">{{mode.fields}}</pre>
            </th>
            <th>
              <div v-for="(field, index) in mode.fields">{{field.name}}, {{field.model}}</div>
            </th>
            <th>
              <div class="edit-field edit-field_mode" @click="editMode(index)"></div>
            </th>
          </tr>
        </template>
      </DashboardTable>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import PageHeader from '~/components/dashboard/PageHeader'
  import DashboardTable from '~/components/dashboard/DashboardTable'
  import FormControls from '~/components/dashboard/FormControls';
  export default {
    layout (context) {
      return 'dashboard'
    },
    components: {
      PageHeader,
      DashboardTable,
      FormControls
    },
    data() {
      return {
        showModeEditForm: false,
        modeFormShow: false,
        tableHeaders: ['№', 'Название', 'Список полей', 'Схема', 'Редактирование'],
        mode: {
          name: '',
          fields: [],
        },
        field: {},
        showModeFieldsList: [],
        dropDownListItem: {
          label: '',
          value: ''
        },
        componentsList: [
          {
            label: 'field',
            value: 'field'
          },
          {
            label: 'dropdown',
            value: 'dropdown'
          }
        ],
        editingMode: null,
        editingField: null,
        editFieldIndex: 0
      }
    },
    async fetch({ store }) {
      await store.dispatch('dashboard/fetchModes')
    },
    computed: {
      ...mapGetters({
        modes: 'dashboard/getModes'
      })
    },
    methods: {
      ...mapActions({
        getModes: 'dashboard/fetchModes'
      }),

      getFieldSchema () {
        return {
          name: '',
          placeholder: '',
          model: '',
          component: this.componentsList[0].value,
          dropDownList: [],
        }
      },

      addField () {
        this.mode.fields.push(this.field);
        this.field = this.getFieldSchema();
      },

      editField (index) {
        this.editingField = true;
        this.editFieldIndex = index;
        this.field = JSON.parse(JSON.stringify(this.mode.fields[this.editFieldIndex]));
      },

      updateField () {
        this.mode.fields[this.editFieldIndex] = this.field;
        this.editingField = null;
        this.field = this.getFieldSchema();
      },

      removeField (index) {
        this.mode.fields.splice(index, 1);
      },

      addDropListItem () {
        this.field.dropDownList.push(this.dropDownListItem);
        this.dropDownListItem = {
          label: '',
          value: ''
        };
      },

      removeDropListItem (index) {
        this.field.dropDownList.splice(index, 1);
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

      clearForm() {
        this.field = this.getFieldSchema();
        this.mode = {
          name: '',
          fields: [],
        }
      },

      cancelEdit () {
        this.editingMode = null;
        this.modeFormShow = false;
        this.clearForm()
      },
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
