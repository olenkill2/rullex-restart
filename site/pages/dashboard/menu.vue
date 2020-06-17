<template>
	<div class="page-content">
    <div class="pages-wr">
      <page-header
        :title="`Всего в меню - ${menuItems.length} пунктов`"
        @close="menuFormShow = false"
        @open="menuFormShow = true"
      />

      <div
        v-if="menuFormShow"
        class="pages-form-wr"
      >
        <div class="pages-form-groups">
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field
                v-model="menu.url"
                label="Url"
                type="text"
                rules="required"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <field
                v-model="menu.label"
                label="Заголовок"
                type="text"
                rules="required"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <checkbox
                v-model="menu.private"
                label="Приватная"
                name="private"
              />
            </div>
          </div>
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field
                v-model="menu.order"
                label="Порядковый номер"
                type="text"
                rules="required"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <field
                v-model="menu.category"
                label="Категория"
                type="text"
              />
            </div>
          </div>
        </div>

        <FormControls
          :isEdit="edit"
          @add="addMenu"
          @delete="deleteMenu"
          @update="updateMenu"
          @clear="clearForm"
        />
      </div>

      <div class="page-data-container">
        <div class="pages-message" v-if="!menuItems.length">Меню пустое</div>
        <DashboardTable
          v-else
          :headers="tableHeaders"
        >
          <template v-slot:body>
            <tr v-for="(menuItem, index) in menuItems">
              <td>{{index + 1}}</td>
              <td>{{menuItem.url}}</td>
              <td>{{menuItem.label}}</td>
              <td>{{menuItem.category}}</td>
              <td>{{menuItem.order}}</td>
              <td> {{ menuItem.private ? 'Да' : 'Нет' }} </td>
              <td>
                <div class="edit-field edit-field_roulette" @click="setMenuForEdit(index)"></div>
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
  import PageHeader from '~/components/dashboard/PageHeader'
  import DashboardTable from '~/components/dashboard/DashboardTable'
  import FormControls from '~/components/dashboard/FormControls';
  export default {
    layout (context) {
      return 'dashboard'
    },
    name: 'menu-manager',
    components: {
      PageHeader,
      DashboardTable,
      FormControls
    },
    data() {
      return {
        menu: {},
        menuFormShow: false,
        tableHeaders: ['#', 'URL', 'Заголовок', 'Категория', 'Порядковый номер', 'Приватная', 'Редактирование'],
        edit: false,
        error: false
      }
    },
    async fetch({ store }) {
      await store.dispatch('dashboard/fetchFullMenu')
    },
    computed: {
      ...mapGetters({
        menuItems: 'dashboard/getMenu'
      })
    },
    methods: {
      ...mapActions({
        getMenuItems: 'dashboard/fetchFullMenu'
      }),

      getMenuSchema () {
        return {
          slug: '',
          title: '',
          url: '',
          order: '',
          category: '',
          private: true
        }
      },

      setMenuForEdit (index) {
        this.edit = true;
        this.menu = JSON.parse(JSON.stringify(this.menuItems[index]));
        this.menuFormShow = true;
      },

      clearForm () {
        this.menu = this.getMenuSchema();
      },

      cancelEdit () {
        this.menu = this.getMenuSchema();
        this.edit = false;
        this.menuFormShow = false;
      },

      addMenu () {
        this.$axios.post('/api/menu', this.menu).then((response, error) => {
          this.getMenuItems();
          this.cancelEdit();
        }).catch((error, res) => {
          // this.addseoErrors = error;
        })
      },

      deleteMenu () {
        this.$axios.delete('/api/menu/' + this.menu._id).then((response, error) => {
          this.getMenuItems();
          this.cancelEdit();
        }).catch((error, res) => {
          this.error = true;
        })
      },

      updateMenu () {
        this.$axios.put('/api/menu/' + this.menu._id, this.menu).then((response, error) => {
          this.getMenuItems();
          this.cancelEdit();
        }).catch((error) => {
          this.error = true;
        });
      }
    },
    created () {
      this.menu = this.getMenuSchema();
    }
  }
</script>

<style lang="scss">

</style>
