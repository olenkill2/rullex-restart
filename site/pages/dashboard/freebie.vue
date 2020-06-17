<template>
	<div class="page-content">
    <div class="pages-wr">
      <page-header
        :title="`Всего акций или халяв - ${freebies.length}`"
        :isOpened="freebieFormShow"
        @close="freebieFormShow = false"
        @open="freebieFormShow = true"
      />

      <div class="pages-form-wr" v-if="freebieFormShow">
        <div class="pages-form-groups">
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field
                v-model="freebie.title"
                label="Заголовок"
                type="text"
                rules="required"
              />
            </div>

            <div class="pages-form-groups-field-wr">
              <text-field
                v-model="freebie.description"
                label="Описание"
                type="text"
                rules="required"
              />
            </div>

            <div class="pages-form-groups-field-wr">
              <field
                v-model="freebie.type"
                label="Тип бонуса"
                type="text"
                rules="required"
              />
            </div>

            <div class="pages-form-groups-field-wr">
              <field
                v-model="freebie.profit"
                label="Размер бонуса"
                type="text"
                rules="required"
              />
            </div>
          </div>

          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field
                v-model="freebie.timeToEnd"
                label="Дата окончания"
                type="text"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <dropdown
                v-model="freebie.status"
                :options="statusList"
                :value="freebie.status"
                label="Состояние"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <dropdown
                v-model="freebie.roulette"
                :options="roulettesList"
                :value="freebie.roulette"
                label="Рулетка"
              />
            </div>
          </div>
        </div>

        <FormControls
          :isEdit="edit"
          @add="addFreebie"
          @delete="deleteFreebie"
          @update="updateFreebie"
          @clear="clearForm"
        />
      </div>

      <div class="page-data-container">
        <div
          v-if="!freebies.length"
          class="pages-message"
        >
          Акций пока нет
        </div>
        <DashboardTable
          v-else
          :headers="tableHeaders"
        >
          <template v-slot:body>
            <tr v-for="(freebie, index) in freebies">
              <td>{{index + 1}}</td>
              <td>{{freebie.title}}</td>
              <td>{{freebie.description}}</td>
              <td>{{freebie.roulette.name}}</td>
              <td>{{freebie.type}}</td>
              <td>{{freebie.profit}} {{freebie.roulette.currency.symbol}}</td>
              <td>{{freebie.timeToEnd}}</td>
              <td>{{freebie.status}}</td>
              <td>
                <div class="edit-field edit-field_roulette" @click="setFreebieForEdit(index)"></div>
              </td>
            </tr>
          </template>
        </DashboardTable>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import PageHeader from '~/components/dashboard/PageHeader';
  import DashboardTable from '~/components/dashboard/DashboardTable';
  import FormControls from '~/components/dashboard/FormControls';

  export default {
    components: {
      PageHeader,
      DashboardTable,
      FormControls
    },
    layout (context) {
      return 'dashboard'
    },
    name: 'freebie',
    data: () => ({
      freebieFormShow: false,
      freebie: {},
      statusList: [
        {
          label: 'private',
          value: 'private'
        },
        {
          label: 'work',
          value: 'work'
        },
        {
          label: 'end',
          value: 'end'
        },
      ],
      tableHeaders: ['№', 'Заголовок', 'Описание', 'Рулетка', 'Тип', 'Профит', 'Время окончания', 'Статус', 'Редактирование'],
      edit: false,
      error: false,
    }),
    computed: {
      ...mapGetters({
        roulettes: 'dashboard/getRoulettes',
        freebies: 'dashboard/getFreebies'
      }),
      roulettesList() {
        return this.roulettes.map((roulette) => {
          return {
            label: roulette.name,
            value: roulette._id,
          }
        })
      }
    },
    async fetch({ store }) {
      await store.dispatch('dashboard/fetchFreebies')
      await store.dispatch('dashboard/fetchRoulettes')
    },
    methods: {
      ...mapActions({
        getFreebies: 'dashboard/fetchFreebies'
      }),
      getFreebieSchema () {
        return {
          title: '',
          description: '',
          type: '',
          profit: '',
          roulette: {},
          timeToEnd: '',
          status: '',
        }
      },

      setFreebieForEdit (index) {
        this.edit = true;
        this.freebie = JSON.parse(JSON.stringify(this.freebies[index]));
        this.freebieFormShow = true;
      },

      clearForm () {
        this.freebie = this.getFreebieSchema();
      },

      cancelEdit () {
        this.freebie = this.getFreebieSchema();
        this.edit = false;
        this.freebieFormShow = false;
      },

      addFreebie () {
        this.$axios.post('/api/freebies', this.freebie)
          .then((response, error) => {
            this.getFreebies()
            this.cancelEdit()
          }).catch((error, res) => {
            // this.addfreebieErrors = error;
          })
      },

      deleteFreebie () {
        this.$axios.delete('/api/freebies/' + this.freebie._id).then((response, error) => {
          this.getFreebies();
          this.cancelEdit();
        }).catch((error, res) => {
          this.error = true;
        })
      },

      updateFreebie () {
        this.$axios.put(`/api/freebies/${this.freebie._id}`, this.freebie)
          .then(async (response, error) => {
            await this.getFreebies();
            this.cancelEdit();
          }).catch((error) => {
            this.error = true;
          });
      }
    },
    created () {
      this.freebie = this.getFreebieSchema();
    }
  }
</script>

<style lang="scss">

</style>
