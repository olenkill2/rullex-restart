<template>
	<div class="tactic-add-wr">
    <div class="tactic-add-actions">
      <ValidationObserver
        ref="tacticName"
        tag="div"
        class="tactic-add-actions__left"
      >
        <field
          v-model="newTactic.name"
          rules="required"
          label="Название"
          placeholder="Насос бабла"
        />
      </ValidationObserver>

      <div class="tactic-add-actions__right">
        <DropDown
          :options="modesList"
          v-model="newTactic.mode"
          :value="newTactic.mode"
          label="Режим"
        />
      </div>
    </div>

    <div class="tactic-add-header">Параметры этапа</div>

    <ValidationObserver
      ref="form"
      v-slot="{ touched, invalid }"
    >
      <form
        v-if="tacticFields"
        ref="formReset"
        @submit.prevent=""
        @keyup.enter="addNewStage"
      >
        <div
          v-if="tacticFields"
          class="stage-form-wr"
        >
          <div
            v-for="(field, index) in tacticFields"
            :key="index"
            class="stage-form__item"
          >
            <Field
              v-if="field.component === 'field'"
              v-model="stageData[field.model].value"
              :name="field.name"
              :label="field.name"
              :placeholder="field.placeholder"
              rules="required"
            />
            <DropDown
              v-if="field.component === 'dropdown'"
              :ref="field.model"
              :options="field.dropDownList"
              :value="stageData[field.model].value"
              v-model="stageData[field.model].value"
              :label="field.name"
            />
          </div>
        </div>
        <div class="stage-actions">
          <template
            v-if="!editing"
          >
            <button
              @click="clearForm"
              :disabled="!touched"
              class="btn btn_red stage-form-actions__clear"
            >
              Очистить
            </button>
            <button
              @click="addNewStage"
              :disabled="invalid"
              class="btn stage-form-actions__add"
            >
              Добавить этап
            </button>
          </template>

          <template
            v-else
          >
            <button
              @click="cancelEdit"
              class="btn btn_skin stage-form-actions__clear"
            >
              Отменить
            </button>
            <button
              @click="saveStage"
              :disabled="invalid"
              class="btn stage-form-actions__add"
            >
              Сохранить
            </button>
          </template>
        </div>
      </form>
    </ValidationObserver>

    <TacticViewer
      v-if="newTactic.stages.length"
      :tactic="newTactic"
      label="Сохранить"
      @edit="editStage"
      @remove="removeStage"
      @accept="saveTactic"
    />
  </div>
</template>
<script>
  import { ValidationObserver } from 'vee-validate'
  import { mapGetters, mapActions } from 'vuex'
  import TacticViewer from "./TacticViewer"

  export default {
    name: 'tacticAdd',
    components: {
      ValidationObserver,
      TacticViewer
    },
    data() {
      return {
        newTactic: null,
        tacticFields: null,
        clearSchema: {},
        stageData: {},
        editing: false
      }
    },
    computed: {
      ...mapGetters({
        modes: 'getModesList',
        roulette: 'getRoulette',
        getMode: 'getModeById'
      }),
      modeName() {
        return this.getMode(this.newTactic.mode).name
      },
      modesList() {
        return this.modes.map((mode) => {
          return {
            label: mode.name,
            value: mode._id
          }
        })
      },
    },
    watch: {
      newTactic() {
        this.tacticFields = this.modes.filter(mode => mode._id === this.newTactic.mode.value)[0].fields

        this.tacticFields.map((field) => {
          this.clearSchema[field.model] = {
            name: field.name,
            type: field.component,
            value: ''
          }
        })

        this.stageData = JSON.parse(JSON.stringify(this.clearSchema))
      }
    },
    created() {
      this.newTactic = this.getTacticScheme()
    },
    methods: {
      ...mapActions({
        setTab: 'setTab',
        addTactic: 'addTactic'
      }),
      getTacticScheme() {
        return {
          name: '',
          mode: this.modesList[0],
          roulette: {
            name: this.roulette.name,
            _id: this.roulette._id,
          },
          stages: [],
        }
      },
      addNewStage() {
        this.newTactic.stages.push(JSON.parse(JSON.stringify(this.stageData)))

        this.clearForm()
      },
      removeStage({ index }) {
        this.newTactic.stages.splice(index, 1)
      },
      editStage(editStage) {
        this.editing = editStage

        this.stageData = JSON.parse(JSON.stringify(editStage.stage))
      },
      saveStage() {
        this.newTactic.stages[this.editing.index] = JSON.parse(JSON.stringify(this.stageData))
        this.editing = null

        this.clearForm()
      },
      clearForm() {
        this.stageData = JSON.parse(JSON.stringify(this.clearSchema))
        this.$refs.formReset.reset()
        this.$refs.form.reset()
      },
      cancelEdit() {
        this.clearForm()
        this.editing = null
      },
      saveTactic() {
        this.$refs.tacticName.validate()
          .then((valid) => {
            if (valid) {
              this.addTactic({
                roulette: this.roulette.name,
                mode: this.newTactic.mode.label,
                tactic: JSON.parse(JSON.stringify(this.newTactic))
              })

              this.setTab('TacticSaved')
              this.clearForm()

              this.newTactic = this.getTacticScheme()
              this.$refs.tacticName.reset()
            }
          })
      }
    }
  }
</script>
<style lang="scss">
  .slide-up-enter-active, .slide-up-leave-active
  {
    transition: all 0.3s;
    transform: translateY(-34px);
  }
  .slide-up-enter, .slide-up-leave-to
  {
    transform: translateY(0);
  }
  .tactic-add-wr
  {
    padding-bottom: 70px;
  }
  .tactic-add-actions
  {
    padding: 22px 10px 25px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
  }
  .tactic-add-header
  {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 18px;
    color: $main;
  }
  .stage-form-wr
  {
    padding-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 18px;
    transition: 0.2s;
    min-height: 100px;
    &:last-child
    {
      margin-bottom: 0;
    }
  }
  .stage-actions {
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 20px;
  }
</style>
