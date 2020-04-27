import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import store from './store'
import Field from './components/ui/Field'
import DropDown from './components/ui/DropDown'
import Checkbox from './components/ui/Checkbox'
import { clickOutside } from './utils/directives'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3002/api/v1/'
Vue.use(VueAxios, axios)

const components = {
    Field,
    DropDown,
    Checkbox
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})

Vue.directive('click-outside', clickOutside)

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
