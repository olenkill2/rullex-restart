<template>
	<div
    :class="{'dashboard_opened': expand}"
    class="dashboard"
  >
    <template>
      <AppHeader
        @expand="expand = $event"
        :is-expand="expand"
        :status="status"
        :balance="balance"
      />

      <div class="main">
        <keep-alive>
          <transition name="list" mode="out-in">
            <component :is="$store.state.router.current" />
          </transition>
        </keep-alive>
      </div>
    </template>
  </div>
</template>
<script>
  import { mapActions, mapMutations, mapState } from 'vuex'
  import AppHeader from '@/components/header.vue'
  import FirstScreen from '@/components/FirstScreen.vue'
  import Tactics from '@/components/Tactics.vue'

  export default {
    name: 'Dashboard',
    components: {
      AppHeader,
      FirstScreen,
      Tactics
    },
    data() {
      return {
        expand: true
      }
    },
    mounted () {
    },
    async created () {
      this.setStatus('load')

      try {
        const roulette = await this.$axios.get('/roulettes/public/one', { params: { host: window.location.origin } })
        await this.setRoulette(roulette.data)

        if (!this.baseFunctions.authCheck()) {
          return this.setStatus('noAuth')
        } else {
          const userBalance = this.baseFunctions.parseBalance()

          // TODO проаверка на минимальный баланс для рулетки.
          // т.к. разные рулетки и разные валюты
          if (!userBalance || userBalance < roulette.data.minBet) {
            return this.setStatus('noBalance')
          } else {
            this.setBalance(userBalance)
            this.setStatus('ready')
            this.fetchTactics()
          }
        }
      } catch (e) {
        this.setStatus('error')
        console.log(e)
      }
    },
    computed: {
      ...mapState({
        baseFunctions: 'functions',
        status: 'globalStatus',
        balance: 'balance'
      })
    },
    methods: {
      ...mapActions({
        setRoulette: 'setRoulette',
        fetchTactics: 'fetchTactics'
      }),
      ...mapMutations({
        setStatus: 'setGlobalStatus',
        setBalance: 'setBalance'
      })
    }
  }
</script>

<style lang="scss">
	.dashboard
	{
		width: 350px;
		height: 100vh;
		position: fixed;
		transform: translateY(calc(100% - 60px));
		left: 0;
		transition: 0.2s;
		background: #FFFFFF;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
		overflow: hidden;
	}
	.dashboard_opened
	{
		transform: translateY(0);
	}
	.main
	{
		height: 100%;
		max-height: calc(100vh - 60px);
		overflow-y: auto;
		overflow-x: hidden;
	}
	.load-message
	{
		display: flex;
		justify-content: center;
		align-items: center;
		color: $accent;
		font-size: 16px;
		padding-top: 22px;
	}
</style>
