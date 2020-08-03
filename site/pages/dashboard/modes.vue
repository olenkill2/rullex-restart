<template>
	<div class="page-content">
    <div
      v-if="modes"
      class="modes-wr"
    >
      <page-header
        :title="`Всего режимов - ${modes.length}`"
        :isOpened="modeFormShow"
        @close="cancelEdit"
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
              <radio
                v-model="field.component"
                value="field"
                name="component-type"
              >
                Поле
              </radio>

              <radio
                v-model="field.component"
                value="dropdown"
                name="component-type"
              >
                Выпадающий список
              </radio>
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
                  class="btn btn_skin btn_small add-dropdown-button"
                >
                  Добавить
                </button>

                <div class="field-droplist-items-added">
                  <div class="field-droplist-item" v-for="(dropItem, index) in field.dropDownList">
                    {{ dropItem.label }}

                    <ButtonEditItem
                      class="edit-mode-item"
                      isButton="remove"
                      @remove="removeDropListItem(index)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mode-form-groups-field-wr mode-form-groups-field-wr--controls">
              <button
                v-if="!editingField"
                @click="addField"
                class="btn btn_small btn_full"
              >
                Добавить
              </button>

              <template v-else>
                <button
                  @click="updateField"
                  class="btn btn_small btn_full"
                >
                  Сохранить
                </button>

                <button
                  @click="cancelEditField"
                  class="btn btn_small btn_red"
                >
                  Отменить
                </button>
              </template>
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

                <ButtonEditItem
                  class="edit-mode-item"
                  @edit="editField(index)"
                  @remove="removeField(index)"
                />
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
            <td>{{index + 1}}</td>
            <td>{{mode.name}}</td>
            <td>
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
            </td>
            <td>
              <div v-for="(field, index) in mode.fields">{{field.name}}, {{field.model}}</div>
            </td>
            <td>
              <div class="edit-field edit-field_mode" @click="editMode(index)"></div>
            </td>
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
  import ButtonEditItem from '~/components/UI/ButtonEditItem'
  import FormControls from '~/components/dashboard/FormControls'
  export default {
    layout (context) {
      return 'dashboard'
    },
    components: {
      PageHeader,
      DashboardTable,
      ButtonEditItem,
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
            label: 'Поле',
            value: 'field'
          },
          {
            label: 'Выпадющий список',
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
        getModesFromStore: 'dashboard/getModes'
      }),
      modes() {
        return JSON.parse(JSON.stringify(this.getModesFromStore))
      },
      fieldsOrder() {
        return this.mode.fields.length
      }
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
          order: this.fieldsOrder
        }
      },

      addField () {
        this.mode.fields.push(this.field)
        this.field = this.getFieldSchema()
      },

      editField (index) {
        this.editingField = true;
        this.editFieldIndex = index;
        this.field = JSON.parse(JSON.stringify(this.mode.fields[this.editFieldIndex]));
      },

      cancelEditField() {
        this.editingField = null
        this.field = this.getFieldSchema()
      },

      updateField () {
        this.mode.fields[this.editFieldIndex] = this.field
        this.cancelEditField()
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
        this.$axios.post('/api/v1/modes/', this.mode).then((result, error) => {
          this.cancelEdit();
          this.getModes();
        }).catch((error) => {
          this.error = true;
        })
      },

      editMode (index) {
        this.editingMode = true;
        this.modeFormShow = true;
        this.mode = JSON.parse(JSON.stringify(this.modes[index]))
      },

      removeMode () {
        this.$axios.delete('/api/v1/modes/' + this.mode._id).then((result, error) => {
          this.getModes();
          this.cancelEdit();
        }).catch((error) => {
          this.error = true;
        })
      },

      updateMode () {
        this.$axios.put('/api/v1/modes/' + this.mode._id, this.mode).then((result, error) => {
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

  .mode-form-groups-field-wr--controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }

  .add-dropdown-button {
    margin-top: 20px;
  }

  .edit-mode-item {
    display: grid;
    margin-left: 15px;
    grid-template-columns: 1fr 1fr;
    column-gap: 14px;
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

</style>
