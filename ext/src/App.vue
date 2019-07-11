<template lang="pug">
	#app
		extension
</template>
<script>
import extension from '@/views/extension.vue'
import Popup from '@/views/Popup.vue'
import dayjs from 'dayjs';
import 'dayjs/locale/ru'
export default {
	name: 'app',
	components: {
		extension,
		Popup
	},
	created () {
		console.log(dayjs('12.28.2019').format('DD.MM.YY'));
	}
}
</script>
<style lang="scss">

</style>
