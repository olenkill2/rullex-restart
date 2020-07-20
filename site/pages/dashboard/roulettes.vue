<template>
	<div class="page-content">
    <div class="pages-wr"></div>
    <page-header
        :title="`Всего рулеток - ${roulettes.length}`"
        :isOpened="rouletteFormShow"
        @close="cancelEdit"
        @open="rouletteFormShow = true"
      />
    <div
      v-if="rouletteFormShow"
      class="pages-form-wr"
    >
      <div class="pages-form-groups">
        <div class="pages-form-groups__item">
          <div class="pages-form__item-label">Новая рулетка</div>

          <div class="pages-form-groups-field-wr">
            <field
              v-model="roulette.name"
              label="Название рулетки"
              type="text"
              rules="required"
            />
          </div>
          <div class="pages-form-groups-field-wr">
            <text-field
              v-model="roulette.description"
              label="Описание"
              type="text"
              rules="required"
            />
          </div>
          <div class="pages-form-groups-field-wr">
            <field
              v-model="roulette.host"
              label="Host"
              type="text"
              rules="required"
            />
          </div>
          <div class="pages-form-groups-field-wr">
            <field
              v-model="roulette.currency.symbol"
              label="Символ валюты"
              placeholder="$"
              type="text"
              rules="required"
            />
          </div>

          <div class="pages-form-groups-field-wr">
            <field
              v-model="roulette.minBet"
              label="Минимальная ставка"
              placeholder="0.01"
              type="text"
              rules="required"
            />
          </div>

          <div class="pages-form-groups-field-wr">
            <field
              v-model="roulette.currency.name"
              label="Название валюты"
              placeholder="Доллар"
              type="text"
              rules="required"
            />
          </div>

          <div class="pages-form-groups-field-wr">
            <checkbox
              v-model="roulette.private"
              label="Приватная"
            />
          </div>
          <div
            v-if="modes.length"
            class="pages-form-group"
          >
            <div class="pages-form-group-label">Поддерживаемые режимы</div>
              <div
                v-for="(mode, key) in modes"
                :key="key"
                class="pages-form-group-item pages-form-groups-field-wr_select-mode"
              >
                <checkbox
                  v-model="roulette.modes"
                  :value="mode"
                  :key="key"
                  type="checkbox"
                  name="modes"
                  :label="mode.name"
                />
                <div class="pages-form-group-add-function-wr">
                  <div
                    v-if="!modeSupported(mode)"
                    @click="addMode(mode)"
                    class="pages-form-group-add-function"
                  >
                    Добавить функцию
                  </div>
                  <div
                    v-else
                    @click="removeMode(mode)"
                    class="pages-form-group-add-function"
                  >
                    Удалить функцию
                  </div>
                </div>
            </div>
          </div>

          <div
            v-else
            class="pages-form-groups-field-wr"
          >
            Доступных режимов нет
            <button class="btn btn_small">Создать</button>
          </div>

          <div class="pages-form-groups-field-wr">
            <dropdown
              :options="refTypesList"
              v-model="roulette.referal.refType"
              :value="roulette.referal.refType"
              label="Тип рефералки"
            />
          </div>

          <div
            v-if="roulette.referal.refType === 'url'"
            class="pages-form-groups-field-wr"
          >
            <field
              v-model="roulette.referal.url"
              label="Реф. ссылка"
              type="text"
            />
          </div>

          <div
            v-else
            class="pages-form-groups-field-wr"
          >
            <field
              v-model="roulette.referal.code"
              label="Реф. код"
              type="text"
            />
          </div>
        </div>
        <div class="pages-form-groups__item">
          <div class="pages-form__item-label">Функции</div>

          <div class="pages-form-groups-field-wr">
            <text-field
              v-model="roulette.functions.authValidationRuleFunction"
              label="Функция валидации"
            />
          </div>

          <div class="pages-form-groups-field-wr">
            <text-field
              v-model="roulette.functions.balanceParseFunction"
              label="Функция получения баланса"
            />
          </div>

          <div class="pages-form-groups-field-wr">
            <text-field
              v-model="roulette.functions.referalChangeFunction"
              label="Функция получения подмены рефки"
            />
          </div>

          <div class="pages-form__item-label">Игровые функции</div>

          <div
            v-if="roulette.gameFunctionForMode.length"
            v-for="(func, index) in roulette.gameFunctionForMode"
            :key="index"
            class="pages-form-groups-field-wr pages-form-groups-field-wr_modes"
          >
            <client-only>
              <FunctionEditor
                :label="`Игровая функция для ${func.mode.name}`"
                :code="func.gameFunc"
                @change="func.gameFunc = $event"
              />
            </client-only>
          </div>
        </div>
      </div>

      <FormControls
        :isEdit="edit"
        @add="addRoulette"
        @delete="deleteRoulette"
        @update="updateRoulette"
        @clear="clearForm"
      />
    </div>

    <div class="page-data-container">
      <div class="pages-message" v-if="!roulettes.length">Рулеток пока нет</div>
      <DashboardTable
        v-else
        :headers="tableHeaders"
      >
        <template v-slot:body>
          <tr v-for="(roulette, index) in roulettes">
            <td>{{index + 1}}</td>
            <td>{{roulette.name}}</td>
            <td>{{roulette.host}}</td>
            <td>
              <template v-if="roulette.referal[roulette.referal.refType]">
                {{roulette.referal.refType}} - {{roulette.referal[roulette.referal.refType]}}
              </template>
              <template v-else>Не задана</template>
            </td>
            <td> {{ roulette.minBet }} </td>
            <td>
              <template
                v-if="roulette.modes.length"
              >
                <span
                  v-for="(mode, index) in roulette.modes"
                  :key="index">
                    {{ mode.name }};
                </span>
              </template>
            </td>
            <td v-if="roulette.gameFunctionForMode">
              <span
                v-for="(gameFunction, index) in roulette.gameFunctionForMode"
                :key="index"
              >
                {{gameFunction.mode.name}}
              </span>
            </td>
            <td>
              {{ roulette.private ? 'Да' : 'Нет' }}
            <td>
              <button class="edit-field edit-field_roulette" @click="setRouletteForEdit(index)"></button>
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
  import FormControls from '~/components/dashboard/FormControls'
  import FunctionEditor from '~/components/dashboard/FunctionEditor'

  export default {
    components: {
      PageHeader,
      DashboardTable,
      FormControls,
      FunctionEditor
    },
    layout (context) {
      return 'dashboard'
    },
    name: 'roulettes',
    data: () => ({
      roulette: {},
      tableHeaders: ['№', 'Название', 'Host', 'Ref', 'Минимальная ставка', 'Режимы', 'Доступные режимы', 'Приватная', 'Редактирование' ],
      modesForDropDown: [],
      dropDownListItem: '',
      currentMode: '',
      refType: 'url',
      refTypesList: [
        {
          label: 'Регистрация по ссылке',
          value: 'url'
        },
        {
          label: 'Реф. код',
          value: 'code'
        }
      ],
      edit: false,
      rouletteFormShow: false,
      addRouletteErrors: false
    }),
    computed: {
      ...mapGetters({
        roulettes: 'dashboard/getRoulettes',
        modes: 'dashboard/getModes'
      }),
      roulettesList() {
        return this.roulettes ? this.roulettes.map((roulette) => {
          return {
            label: roulette.name,
            value: roulette._id,
          }
        }) : []
      }
    },
    async fetch({ store }) {
      await store.dispatch('dashboard/fetchModes')
      await store.dispatch('dashboard/fetchRoulettes')
    },
    methods: {
      ...mapActions({
        getRoulettes: 'dashboard/fetchRoulettes'
      }),

      modeSupported (mode) {
        const index = this.roulette.gameFunctionForMode.findIndex(supportedMode => supportedMode.mode._id == mode._id);
        return this.roulette.gameFunctionForMode[index] ? true : false;
      },

      getRouletteSchema () {
        return {
          name: '',
          host: '',
          description: '',
          private: true,
          color: '#333333',
          minBet: 0.01,
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
        this.$axios.post('/api/v1/roulettes', this.roulette).then((response, error) => {
          this.getRoulettes();
          this.cancelEdit();
        }).catch((error, res) => {
          this.addRouletteErrors = error;
        })
      },

      deleteRoulette () {
        this.$axios
          .delete('/api/v1/roulettes/' + this.roulette._id)
          .then((response, error) => {
            this.getRoulettes();
            this.cancelEdit();
          })
          .catch((error, res) => {
            this.error = true;
        })
      },

      updateRoulette () {
        this.$axios
          .put('/api/v1/roulettes/' + this.roulette._id, this.roulette)
          .then((response, error) => {
            this.getRoulettes();
            this.cancelEdit();
          })
          .catch((error) => {
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
