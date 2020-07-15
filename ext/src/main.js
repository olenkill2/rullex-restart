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
	message: 'Не, не подходит'
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

const wordInducement = {
  install: function (Vue, options) {
    const words = {
      time: ['раз', 'раза', 'раз']
    }

    Vue.prototype.getWord = function (count, word) {
      const num = count % 100
      const mod = num % 10

      if (num !== 11 && mod === 1) {
        return words[word][0]
      } else if (mod >= 2 && mod <= 4 && (num < 10 || num > 20)) {
        return words[word][1]
      } else {
        return words[word][2]
      }
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
Vue.use(wordInducement)

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
