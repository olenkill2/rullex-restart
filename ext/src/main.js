import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import App from './App.vue';
import store from './store';

if(process.env.NODE_ENV === 'production')
	Sentry.init({
		dsn: 'http://1bd2d9c09f1747d0bb239e733e589077@82.202.236.184:9000/2',
		integrations: [
			new Integrations.Vue({
				Vue,
				attachProps: true,
			}),
		],
		debug: true,
		beforeSend(event) {
			console.log(event);
			return event;
		}
	});

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3002/';
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