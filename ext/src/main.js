import Vue from 'vue'
import axios from 'axios'
import App from '@/App.vue'
import store from '@/store/index'
import Field from '~UI/components/UI/Field'
import DropDown from '~UI/components/UI/DropDown'
import Checkbox from '~UI/components/UI/Checkbox'
import { clickOutside } from '@/utils/directives'
import { extend, ValidationProvider } from 'vee-validate'
import { required, alpha, numeric, min_value } from 'vee-validate/dist/rules'


extend('required', {
	...required,
	message: 'Обязательное поле'
});

extend('alpha', {
	...alpha,
	message: 'Только буквы'
});

extend('numeric', {
	...numeric,
	message: 'Только цифры'
});

extend('min_value', {
	...min_value,
	message: 'Минус низя('
});

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3002/api/v1/'
Vue.prototype.$axios = axios

const CustomRouter = {
  install: function (Vue, options) {
    Vue.prototype.routeTo = function (route, params) {
      this.$store.commit('setRoute', { route, params })
    }
    Vue.prototype.routeBack = function () {
      this.$store.dispatch('routerBack')
    }
  }
}

const components = {
  Field,
  DropDown,
  Checkbox,
  ValidationProvider
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})

Vue.directive('click-outside', clickOutside)
Vue.use(CustomRouter)

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
