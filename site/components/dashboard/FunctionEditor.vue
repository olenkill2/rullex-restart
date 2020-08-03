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
      <codemirror
        class="codemirror"
        v-model="localCode"
        :options="cmOption"
        @blur="onCmBlur"
      />
    </Popup>

    <pre v-else class="function-code">{{ localCode }}</pre>
  </div>
</template>

<script>
  import Popup from "@/components/UI/Popup"
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/monokai.css'

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
        edit: false,
        cmOption: {
          tabSize: 2,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/javascript',
          theme: 'monokai'
        }
      }
    },
    methods: {
      onCmBlur() {
        console.log(this.localCode)
        this.$emit('change', this.localCode)
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
    font-size: 14px;
  }

  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .codemirror {
    height: 100%;
    margin: 0;
    overflow: auto;
  }
</style>
