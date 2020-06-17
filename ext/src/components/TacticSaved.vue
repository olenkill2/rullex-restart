<!--suppress JSUnfilteredForInLoop -->
<template>
  <div class="tactic-saved-wr">
    <div
      v-if="!savedTactics"
      class="tactic-saved-no"
    >
      Тактик нет, добавьте тактику
    </div>
    <div
      v-else
      class="tactic-saved-box"
    >
      <div class="tactic-saved-top">
        <field
          v-model="search"
          label="Поиск"
          placeholder="Название или режим"
        />
      </div>
      <div class="tactic-saveds">
        <Tactic
          v-for="(tactic, index) in filteredTactics"
          :key="index"
          :tactic="tactic"
          @remove="remove(tactic)"
          class="tactic-saved"
        />
      </div>
    </div>

    <TacticViewer
      v-if="tacticToView"
      :tactic="tacticToView"
      :isExpand="true"
      label="Изменить"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
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
        tacticToView: null,
      }
    },
    computed: {
      ...mapGetters({
        userTactics: 'getSavedTactics',
        rouletteName: 'getRouletteName'
      }),
      savedTactics() {
        const tactics = []

        for (const roulette in this.userTactics) {
          for (const mode in this.userTactics[roulette]) {
            tactics.push(...this.userTactics[roulette][mode])
          }
        }

        return tactics.sort((tactic) => {
          if (tactic.roulette.name === this.rouletteName) {
            return -1
          } else {
            return 1
          }
        })
      },
      filteredTactics() {
        return this.savedTactics
      }
    },
    methods: {
      ...mapActions({
        remove: 'removeTactic'
      }),
      // removeTactic(id) {
      //   // let userTactics = JSON.parse(localStorage.getItem('userTactics'));
      //   // delete userTactics[this.$store.state.currentRoulette.name][id];
      //   // localStorage.setItem('userTactics', JSON.stringify(userTactics));
      //   // this.$store.dispatch('getUserSavedTactics');
      // },
      viewTactic(id) {
        // this.tacticToEdit = this.$store.state.userSavedTactics[id];
        // console.log(this.tacticToEdit);
      },
      editStage() {

      },
      tacticSaved() {

      }
    }
  }
</script>
<style lang="scss">
.tactic-saved-top
{
	padding-top: 22px;
	padding-left: 10px;
	padding-right: 10px;
}
.tactic-saveds
{
	padding-top: 28px;
	padding-bottom: 20px;
}
</style>
