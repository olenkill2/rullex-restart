import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3002/';

Vue.use(VueAxios, axios);

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