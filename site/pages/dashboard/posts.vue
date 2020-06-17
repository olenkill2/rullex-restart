<template>
	<div class="page-content">
    <div class="pages-wr">
      <page-header
        :title="`Всего статей - ${posts.length}`"
        :isOpened="postFormShow"
        @close="postFormShow = false"
        @open="postFormShow = true"
      />
      <div
        v-if="postFormShow"
        class="pages-form-wr"
      >
        <div class="pages-form-groups">
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field
                v-model="post.slug"
                label="slug"
                type="text"
                rules="required"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <field
                v-model="post.title"
                label="Заголовок"
                type="text"
                rules="required"
              />
            </div>
            <div class="pages-form-groups-field-wr">
              <checkbox
                v-model="post.private"
                label="Приватная"
                name="private"
              />
            </div>
          </div>
        </div>

        <client-only>
          <ContentEditor
            :initData="initData"
            @updateContent="post.content = $event"
          />
        </client-only>

        <FormControls
          :isEdit="edit"
          @add="addPost"
          @delete="deletePost"
          @update="updatePost"
          @clear="clearForm"
        />
      </div>
      <div class="page-data-container">
        <div v-if="!posts.length" class="pages-message">Статей пока нет</div>
        <DashboardTable
          v-else
          :headers="tableHeaders"
        >
          <template v-slot:body>
            <tr v-for="(post, index) in posts">
              <td>{{index + 1}}</td>
              <td>{{post.title}}</td>
              <td>{{post.description}}</td>
              <td>{{post.pageType}}</td>
              <td>
                {{ post.private ? 'Да' : 'Нет' }}
              </td>
              <td>
                <div class="edit-field edit-field_roulette" @click="setPostForEdit(index)"></div>
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
  import ContentEditor from '~/components/dashboard/ContentEditor'

  export default {
    layout: 'dashboard',
    components: {
      PageHeader,
      DashboardTable,
      FormControls,
      ContentEditor
    },
    data() {
      return {
        postFormShow: false,
        post: {},
        tableHeaders: ['#', 'Заголовок', 'Описание', 'Тип', 'Приватная', 'Редактирование'],
        edit: false,
        error: false,
        initData: {}
      }
    },
    async fetch({ store }) {
      await store.dispatch('dashboard/fetchPosts')
    },
    computed: {
      ...mapGetters({
        posts: 'dashboard/getPosts'
      })
    },
    methods: {
      ...mapActions({
        getPosts: 'dashboard/fetchPosts'
      }),

      getPostSchema () {
        return {
          slug: '',
          title: '',
          content: '',
          private: true
        }
      },

      setPostForEdit (index) {
        this.edit = true
        this.post = JSON.parse(JSON.stringify(this.posts[index]))
        this.initData = JSON.parse(JSON.stringify(this.post.content))
        this.postFormShow = true
      },

      clearForm () {
        this.post = this.getPostSchema()
      },

      cancelEdit () {
        this.post = this.getPostSchema()
        this.initData = {}
        this.edit = false
        this.postFormShow = false
      },

      addPost () {
        this.$axios.post('/api/post', this.post).then((response, error) => {
          this.getPosts()
          this.cancelEdit()
        }).catch((error, res) => {
        })
      },

      deletePost () {
        this.$axios.delete('/api/post/' + this.post._id).then((response, error) => {
          this.getPosts()
          this.cancelEdit()
        }).catch((error, res) => {
          this.error = true
        })
      },

      updatePost () {
        this.$axios.put('/api/post/' + this.post._id, this.post)
          .then(() => {
            this.getPosts()
            this.cancelEdit()
          }).catch((error) => {
            this.error = true
          })
      }
    },
    created() {
      this.post = this.getPostSchema()
    },
    mounted() {
    }
  }
</script>
<style lang="scss">
	.editor-js-box-wr
	{
		border: 1px solid $dark-gray;
		margin-top: 45px;
		padding-top: 20px;
	}
</style>
