<template>
  <div class="page-content">
    <div class="pages-wr">
      <page-header
        :title="`Всего страниц - ${seoItems.length}`"
        :isOpened="seoFormShow"
        @close="cancelEdit"
        @open="seoFormShow = true"
      />

      <div
        v-if="seoFormShow"
        class="pages-form-wr"
      >
        <div class="pages-form-groups">
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field
                v-model="seo.slug"
                label="Page slug"
                type="text"
                rules="required"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <field
                v-model="seo.title"
                label="Title"
                type="text"
                rules="required"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <text-field v-model="seo.description" label="Description" type="text" rules="required"></text-field>
            </div>
            <div class="pages-form-groups-field-wr">
              <field v-model="seo.ogImg" label="img url" type="text"></field>
            </div>
            <div class="pages-form-groups-field-wr">
              <checkbox v-model="seo.private" label="Приватная" name="private"></checkbox>
            </div>
          </div>
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <text-field v-model="seo.keywords" label="keywords" type="text"></text-field>
            </div>
            <div class="pages-form-groups-field-wr">
              <field v-model="seo.ogTitle" label="og title" type="text"></field>
            </div>
            <div class="pages-form-groups-field-wr">
              <text-field v-model="seo.ogDescription" label="og description" type="text"></text-field>
            </div>
            <div class="pages-form-groups-field-wr">
              <field v-model="seo.pageType" label="Тип страницы" type="text"></field>
            </div>
          </div>
        </div>

        <FormControls
          :isEdit="edit"
          @add="addSeo"
          @delete="deleteSeo"
          @update="updateSeo"
          @clear="clearForm"
        />
      </div>
      <div class="page-data-container">
        <div class="pages-message" v-if="!seoItems.length">seo пока нет</div>
        <DashboardTable
          v-else
          :headers="tableHeaders"
        >
          <template v-slot:body>
            <tr v-for="(seo, index) in seoItems">
              <td>{{index + 1}}</td>
              <td>{{seo.title}}</td>
              <td>{{seo.description}}</td>
              <td>{{seo.pageType}}</td>
              <td><span v-if="seo.private">Да</span><span v-else="">Нет</span></td>
              <td>
                <div class="edit-field edit-field_roulette" @click="setSeoForEdit(index)"></div>
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
  import FormControls from '~/components/dashboard/FormControls'
export default {
  layout (context) {
    return 'dashboard'
  },
  name: 'seo',
  components: {
    PageHeader,
    DashboardTable,
    FormControls
  },
  data() {
    return {
      seoFormShow: false,
      seo: {},
      tableHeaders: ['№','Заголовок','Описание','Тип','Приватная','Редактирование'],
      edit: false,
      error: false,
    }
  },
  computed: {
    ...mapGetters({
      seoItems: 'dashboard/getSeoItems'
    })
  },
  async fetch({ store }) {
    await store.dispatch('dashboard/fetchSeoItems')
  },
  methods: {
    ...mapActions({
      'getSeoItems': 'dashboard/fetchSeoItems'
    }),
    getSeoSchema () {
      return {
        slug: '',
        title: '',
        description: '',
        pageType: '',
        keywords: '',
        ogTitle: '',
        ogDescription: '',
        ogImg: '',
        private: true
      }
    },

    setSeoForEdit (index) {
      this.edit = true;
      this.seo = JSON.parse(JSON.stringify(this.seoItems[index]));
      this.seoFormShow = true;
    },

    clearForm () {
      this.seo = this.getSeoSchema();
    },

    cancelEdit () {
      this.seo = this.getSeoSchema();
      this.edit = false;
      this.seoFormShow = false;
    },

    addSeo () {
      this.$axios.post('/api/v1/seo', this.seo).then((response, error) => {
        this.getSeoItems();
        this.cancelEdit();
      }).catch((error, res) => {
        // this.addseoErrors = error;
      })
    },

    deleteSeo () {
      this.$axios.delete('/api/v1/seo/' + this.seo._id).then((response, error) => {
        this.getSeoItems();
        this.cancelEdit();
      }).catch((error, res) => {
        this.error = true;
      })
    },

    updateSeo () {
      this.$axios
      .put('/api/v1/seo/' + this.seo._id, this.seo)
      .then((response, error) => {
        this.getSeoItems();
        this.cancelEdit();
      })
      .catch((error) => {
        console.log(error);

        this.error = true;
      });
    }
  },
  created () {
    this.seo = this.getSeoSchema();
  }
}
</script>

<style lang="scss">

</style>
