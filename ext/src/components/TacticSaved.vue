<!--suppress JSUnfilteredForInLoop -->
<template>
  <div class="saved-tactics">
    <div
      v-if="!userTactics.length"
      class="saved-tactics__no"
    >
      Тактик нет, добавьте тактику
    </div>

    <div
      v-else
      class="saved-tactics__box"
    >
      <div class="saved-tactics__top">
        <field
          v-model="search"
          label="Поиск"
          placeholder="Название или режим"
        />
      </div>

      <div class="saved-tactics__list">
        <template v-if="filteredTactics.length">
          <Tactic
            v-for="(tactic, index) in filteredTactics"
            :key="index"
            :tactic="tactic"
            class="saved-tactics__item"
            :disabled="tactic.disabled"
            @remove="remove(tactic)"
            @select="select(tactic)"
            @show-tactic="tacticToView = tactic"
          />
        </template>

        <div
          v-else
          class="saved-tactics__not-found"
        >
          <h3 class="saved-tactics__not-found-header">
            Пусто!
          </h3>
          <p class="saved-tactics__not-found-text">
            Чет нет ничего похоже, может ты ошибся?)
          </p>
        </div>
      </div>
    </div>

    <TacticViewer
      v-if="tacticToView"
      :tactic="tacticToView"
      :isExpand="Boolean(tacticToView)"
      @accept="editTactic(tacticToView)"
      label="Изменить"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import Tactic from '@/components/Tactic/Tactic.vue'
  import TacticViewer from '@/components/TacticViewer.vue'

  export default {
    name: 'tacticSaved',
    components: {
      TacticViewer,
      Tactic
    },
    data() {
      return {
        search: '',
        tacticToView: null
      }
    },
    computed: {
      ...mapGetters({
        userTactics: 'getSavedTactics',
        rouletteName: 'getRouletteName'
      }),
      savedTactics() {
        return this.userTactics.sort((tactic) => {
          tactic.disabled = tactic.roulette.name !== this.rouletteName

          return !tactic.disabled ? -1 : 1
        })
      },
      filteredTactics() {
        return this.savedTactics.filter((tactic) => {
          return tactic.name.includes(this.search)
                  || tactic.mode.label.includes(this.search)
                  || tactic.roulette.name.includes(this.search)
        })
      }
    },
    methods: {
      ...mapMutations({
        setTactic: 'setTactic'
      }),
      ...mapActions({
        remove: 'removeTactic',
        setEditTactic: 'editTactic',
        selectTactic: 'selectTactic'
      }),
      editTactic(index) {
        this.setEditTactic(index)
        this.$emit('open-tab', 'TacticAdd')
      },
      select(tactic) {
        this.setTactic(tactic)
        this.routeTo('AutoStop')
      }
    }
  }
</script>
<style lang="scss">
  .saved-tactics {
    padding-bottom: 56px;
  }
  .saved-tactics__top
  {
    padding-top: 22px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .saved-tactics__list
  {
    padding-top: 28px;
    padding-bottom: 20px;
  }

  .saved-tactics__not-found {
    padding-left: 10px;
    padding-right: 10px;

  }

  .saved-tactics__not-found-header {
    margin-top: 0;
  }

  .saved-tactics__no {
    padding-top: 40px;
    text-align: center;
  }
</style>
