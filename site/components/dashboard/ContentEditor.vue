<template>
  <editor
    class="editor-js-box-wr"
    ref="editor"
    holder-id="codex-editor"
    save-button-id="save-button"
    placeholder="Контент статьи"
    :init-data="initData"
    v-bind="config"
    :customTools="customTools"
    @change="save"
    @save="onSave"
  />
</template>

<script>
  let linkTool = {};
  let image = {};
  if (process.client) {
    linkTool = require('@editorjs/link')
    image = require('@editorjs/image')
  }
  export default {
    name: "ContentEditor",
    props: {
      initData: {
        type: Object
      }
    },
    data() {
      return {
        config: {
          header: {
            inlineToolbar: true
          },
          text: {
            inlineToolbar: ['link']
          },
          list: {
            inlineToolbar: true
          },
          checklist: {
            inlineToolbar: true
          },
          table: {
            inlineToolbar: true
          },
          rawHtml: {
            inlineToolbar: true
          },
          linkTool: {
            inlineToolbar: true
          },
          code: {
            inlineToolbar: true
          },
          inlineCode: {
            inlineToolbar: true
          },
          marker: {
            inlineToolbar: true
          },
          delimiter: {
            inlineToolbar: true
          },
          quote: {
            inlineToolbar: true
          }
        },
        customTools: {}
      }
    },
    methods: {
      save() {
        this.$refs.editor.save()
      },
      onSave (response) {
        this.$emit('updateContent', response)
      }
    },
    created() {
      if(process.browser)
      {
        this.customTools.linkTool = {
          class: linkTool,
          config: {
            endpoint: 'http://localhost:3002/api/v1/uploads/url',
            additionalRequestHeaders: {
              'Authorization': `Bearer ${this.$store.state.user.access_token}`
            },
          }
        }
        this.customTools.images = {
          class: image,
          config: {
            endpoints: {
              byFile: `${process.env.baseUrl}/api/v1/uploads/img`,
              byUrl: `${process.env.baseUrl}/api/v1/uploads/img-by-url`,
            },
            additionalRequestHeaders: {
              'Authorization': `Bearer ${this.$store.state.user.access_token}`
            },
            field: 'image',
            types: 'image/*',
          }
        }
        // this.config.images = {
        //   endpoints: {
        //     byFile: `${process.env.baseUrl}/api/v1/uploads/img`,
        //     byUrl: `${process.env.baseUrl}/api/v1/uploads/img-by-url`,
        //   },
        //   additionalRequestHeaders: {
        //     'Authorization': `Bearer ${this.$store.state.user.access_token}`
        //   },
        //   field: 'image',
        //   types: 'image/*',
        // }
      }
    }
  }
</script>

<style scoped>

</style>
