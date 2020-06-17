<template lang="pug">
	#app
		extension
</template>
<script>
import extension from '@/views/extension.vue'
import Popup from '@/views/Popup.vue'
// import dayjs from 'dayjs';
// import 'dayjs/locale/ru'
export default {
	name: 'app',
	components: {
		extension,
		Popup
	},
	created () {
	}
}
</script>
<style lang="scss">

</style>
