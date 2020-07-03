<template>
	<div
    v-click-outside="close"
    :class="{'tv_expand': expand}"
    class="tv"
  >
    <div class="tv-layout"></div>

    <div
      :class="{'tv-header_expand': expand}"
      class="tv-header"
    >
      <div class="tv-header__left">
        <div class="tv-name">
          {{ tactic.name }}
        </div>
        <div class="tv-info">Режим {{ tactic.mode.label }}, {{ stagesCount }}</div>
      </div>

      <div class="tv-header__right">
        <button
          @click="expand = !expand"
          class="tv-change"
        >
          {{ expand ? 'Свернуть' : 'Подробнее' }}
        </button>
        <button
          @click="$emit('accept')"
          class="btn btn_accent tv-save"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <div class="tv-body">
      <div class="tv-stages">
        <Stage
          v-for="(stage, index) in tactic.stages"
          :number="index + 1"
          :key="index"
          :data="stage"
          :edit="isEditing"
          @remove="remove({ index })"
          @edit="edit({ index, stage })"
          class="tv-stages-item"
        >
        </Stage>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Stage from '@/components/Tactic/Stage';
  export default {
    props: {
      tactic: {
        type: Object,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      isEditing: {
        type: Boolean,
        default: false
      },
      isExpand: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Stage,
    },
    data() {
      return {
        expand: false
      }
    },
    computed: {
      ...mapGetters({
        getMode: 'getModeById'
      }),
      stagesCount () {
        return this.declOfNum(this.tactic.stages.length, ['этап', 'этапа', 'этапов']);
      }
    },
    watch: {
      tactic() {
        console.log(this.expand)
        this.expand = this.isExpand
        console.log(this.expand)
      },
      isExpand() {
        this.expand = this.isExpand
      }
    },
    mounted() {
      this.expand = this.isExpand
    },
    methods: {
      declOfNum(n, titles) {
        return n + ' ' + titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
      },
      remove(data) {
        this.$emit('remove', data)
      },
      edit(data) {
        this.$emit('edit', data)
        this.expand = false
      },
      close() {
        this.expand = false
      }
    }
  }
</script>
<style lang="scss">
	.list-enter-active, .list-leave-active {
		transition: all 0.3s;
	}
	.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
		opacity: 0;
		transform: translateX(30px);
	}

	.tv
	{
		position: absolute;
		top: calc(100% - 54px);
		left: 0;
		max-width: 350px;
		width: 100%;
		background-color: #fff;
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-height: 56px;
		transition: 0.2s;
	}
	.tv_expand
	{
		max-height: 65%;
		transform: translateY(calc(-100% + 54px));
	}
	.tv-header
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
    padding: 10px 10px 12px;
    box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.05);
		background-color: #fff;
		transition: 0.2s;
	}
	.tv-header_expand
	{
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
	}
	.tv-header__right
	{
		display: flex;
	}
	.tv-name
	{
		font-weight: 500;
		font-size: 12px;
		line-height: 17px;
		color: $accent;
	}
	.tv-info
	{
		font-size: 10px;
		color: $main;
	}
	.tv-change
	{
		border: none;
		background-color: #fff;
		box-shadow: none;
		font-weight: 500;
		font-size: 12px;
		color: $blue;
		cursor: pointer;
		width: 80px;
	}
	.btn.tv-save
	{
		min-width: auto;
		width: 100px;
		height: 34px;
		padding-left: 10px;
		padding-right: 10px;
		font-size: 14px;
		margin-left: 10px;
	}
	.tv-body
	{
		overflow: auto;
	}

	.tv-stages
	{
		padding-bottom: 30px;
		overflow: hidden;
	}
</style>
