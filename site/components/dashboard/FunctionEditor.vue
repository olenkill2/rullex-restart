<template>
  <div class="function">
    <div class="code-block-header">
      {{ label }}

      <button @click="edit = true">
        Изменить
      </button>
    </div>

    <Popup
      v-if="edit"
      @close="edit = false"
    >
      <!-- <MonacoEditor
        class="editor"
        v-model="localCode"
        @change="$emit('change', $event)"
        language="javascript"
      /> -->
    </Popup>

    <pre v-else class="function-code">
{{ localCode }}
    </pre>
  </div>
</template>

<script>
  import Popup from "@/components/UI/Popup"

  export default {
    name: 'FunctionEditor',
    props: {
      label: {
        type: String,
        required: true,
      },
      code: {
        type: String
      },
    },
    components: {
      Popup
    },
    data() {
      return {
        localCode: '',
        options: {},
        edit: false
      }
    },
    watch: {
      code: {
        immediate: true,
        handler(newValue) {
          this.localCode = newValue || ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .function {
    margin-top: 15px;
  }
  .function-code {
    max-height: 200px;
    overflow-y: auto;
    margin-top: 10px;
  }

  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .editor {
    width: 600px;
    height: 600px;
    margin-top: 40px;
  }
</style>
