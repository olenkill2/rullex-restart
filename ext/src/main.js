import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3002/api/v1/';
axios.interceptors.response.use((response) => response, (error) => {
	Sentry.captureException(error);
	return Promise.reject(error);
});

Vue.use(VueAxios, axios);

const dictionary = {
	en: {
		messages:{
			required: () => 'Поле не заполнено'
		}
	},
};

Validator.localize(dictionary);
Vue.use(VeeValidate);

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');

Vue.directive('click-outside',{
	bind: function (el, binding, vnode)
	{
		el.fisrtClick = true;
		el.clickOutsideEvent = function(event)
		{
			if(el.fisrtClick === true)
			{
				el.fisrtClick = false;
				return false;
			}
			if(!(el == event.target || el.contains(event.target)))
			{
				el.fisrtClick = false;
				vnode.context[binding.expression](event);
			}
		};
		document.body.addEventListener('click', el.clickOutsideEvent);
	},
	unbind:function(el)
	{
		document.body.removeEventListener('click', el.clickOutsideEvent);
	},
});