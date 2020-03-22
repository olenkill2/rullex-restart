import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';

function getRedirectUri(uri) {
  try {
    return (!isUndefined(uri))
      ? `${$window.location.origin}${uri}`
      : $window.location.origin
  } catch (e) {}

  return uri || null;
}
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  tokenName: 'access_token',
  baseUrl: 'https://rullex.ru/',
  tokenPrefix: '',
  providers: {
    vk: {
        name: 'vk',
        url: '/api/v1/users/oauth/vk/cb',
        authorizationEndpoint: 'https://rullex.ru/api/v1/users/oauth/vk/',
        redirectUri: 'https://rullex.ru/',
        requiredUrlParams: ['scope', 'display'],
        scope: ['email'],
        display: 'popup',
        responseType: 'code',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633, top: '50%', left: '50%' },
        clientId: '7101695',
    },
    google: {
        name: 'google',
          url: '/oauth/google',
          authorizationEndpoint: 'http://localhost:3002/api/v1/users/oauth/vk/',
          redirectUri: 'http://localhost:3334/',
          optionalUrlParams: ['display'],
          requiredUrlParams: ['scope'],
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          responseType: 'code',
          scopeDelimiter: ' ',
          oauthType: '2.0',
          popupOptions: { width: 452, height: 633 },
          clientId: '48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com'
    },
  }
})
