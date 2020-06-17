<template>
	<div class="tactics-wr">
    <div class="tactics">
      <h2 class="tactics-header">
        Управление тактиками
        <span class="tactics-header__name">
          {{$store.state.currentRoulette.name}}
        </span>
      </h2>
    </div>

    <div class="tabs-nav-wr">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{'tabs-nav__item_active': currentTab === tab.component}"
        @click="setTab(tab.component)"
        class="tabs-nav__item"
      >
        {{ tab.name }}
        <span
          v-if="tab.component === 'tacticSaved' && savedTacticsCount"
        >
          ({{ savedTacticsCount }})
        </span>
      </div>
    </div>

    <div class="tabs-container">
      <div
        v-for="(tab, index) in tabs"
        v-show="currentTab === tab.component"
        :key="index"
        class="tab"
      >
        <component
          :is="tab.component"
          @open-tab="setTab($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import TacticAdd from '@/components/TacticAdd.vue'
  import TacticSaved from '@/components/TacticSaved.vue'

  export default {
    name: 'tactics',
    components: {
      TacticAdd,
      TacticSaved
    },
    data: () => ({
      tabs: [
        {
          name: 'Новая',
          component: 'TacticAdd',
        },
        {
          name: 'Сохраненные',
          component: 'TacticSaved',
        }
      ],
    }),
    computed: {
      ...mapGetters({
        currentTab: 'currentTab'
      }),
      savedTacticsCount () {
        return this.$store.state.userSavedTacticsCount;
      }
    },
    methods: {
      ...mapActions({
        setTab: 'setTab'
      })
    }
  }
</script>

<style lang="scss">
	.tactics-header
	{
		font-size: 20px;
    margin: 0 10px;
    padding-top: 35px;
		padding-bottom: 26px;
		font-weight: 400;
	}
	.tactics-header__name
	{
		font-weight: 600;
	}
	.tabs-nav-wr
	{
		background-color: $light-gray;
		display: flex;
		justify-content: space-between;
	}
	.tabs-nav__item
	{
		flex-basis: 50%;
		text-align: center;
		padding-top: 13px;
		padding-bottom: 14px;
		border-bottom: 1px solid transparent;
		transition: 0.2s;
		cursor: pointer;
		color: $main;
	}
	.tabs-nav__item_active
	{
		border-color: $blue;
		cursor: default;
		color: $accent;
	}
	.tab
	{
		display: inline-block;
		width: 100%;
	}
</style>
