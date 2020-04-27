import VueAuthenticate from 'vue-authenticate'
import Vue from 'vue'
import axios from 'axios';

const getPopupOptions = (width, height) => {
    const top = (window.screen.height - height) / 2
    const left = (window.screen.width - width) / 2

    return {
        width,
        height,
        top,
        left
    }
}

const getRedirectUrl = () => window.location.origin

const vueAuth = VueAuthenticate.factory(axios, {
    tokenName: 'access_token',
    baseUrl: 'http://localhost:3002/api/v1/users/oauth/',
    tokenPrefix: '',
    storageType: 'cookieStorage',
    bindRequestInterceptor() {
      this.$http.interceptors.request.use((config) => {
        config.method = 'get'
        config.params = {
          code: config.data.code
        }
        config.data = {}
        return config
      })
    },
    providers: {
        vk: {
            name: 'vk',
            url: '/vk/cb',
            authorizationEndpoint: 'https://oauth.vk.com/authorize',
            redirectUri: getRedirectUrl(),
            requiredUrlParams: ['scope', 'display', 'userId'],
            scope: ['email'],
            display: 'popup',
            responseType: 'code',
            oauthType: '2.0',
            popupOptions: getPopupOptions(660, 400),
            clientId: '7101695',
        },
        google: {
            name: 'google',
            url: '/google/cb',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            redirectUri: getRedirectUrl(),
            optionalUrlParams: ['display'],
            requiredUrlParams: ['scope'],
            scope: ['profile', 'email'],
            responseType: 'code',
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: getPopupOptions(460, 600),
            clientId: '48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com'
        }
    }
})

Vue.prototype.$auth = vueAuth


//
// const getPopupOptions = (width, height) => {
//     const top = (window.screen.height - height) / 2
//     const left = (window.screen.width - width) / 2
//
//     return {
//         width,
//         height,
//         top,
//         left
//     }
// }
//
// const getRedirectUrl = () => window.location.origin
//
// import VueAuthenticate from 'vue-authenticate'
// import Vue from 'vue'
// import axios from 'axios';
//
// const vueAuth = VueAuthenticate.factory(axios, {
//     tokenName: 'access_token',
//     baseUrl: 'http://localhost:3002/api/v1/users/oauth/',
//     tokenPrefix: '',
//     storageType: 'cookieStorage',
//     providers: {
//         vk: {
//             name: 'vk',
//             url: '/vk/cb',
//             authorizationEndpoint: 'https://oauth.vk.com/authorize',
//             redirectUri: getRedirectUrl(),
//             requiredUrlParams: ['scope', 'display', 'userId'],
//             scope: ['email'],
//             display: 'popup',
//             responseType: 'code',
//             oauthType: '2.0',
//             popupOptions: getPopupOptions(660, 400),
//             clientId: '{{CLIENT_ID}}',
//         },
//         google: {
//             name: 'google',
//             url: '/google/cb',
//             authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//             redirectUri: getRedirectUrl(),
//             optionalUrlParams: ['display'],
//             requiredUrlParams: ['scope'],
//             scope: ['profile', 'email'],
//             responseType: 'code',
//             scopeDelimiter: ' ',
//             oauthType: '2.0',
//             popupOptions: getPopupOptions(460, 600),
//             clientId: '{{CLIENT_ID}}'
//         },
//         yandex: {
//             name: 'yandex',
//             url: '/yandex/cb',
//             authorizationEndpoint: 'https://oauth.yandex.ru/authorize',
//             redirectUri: getRedirectUrl(),
//             requiredUrlParams: ['scope'],
//             scope: ['login:email', 'login:avatar', 'login:info', 'audience:read'],
//             responseType: 'code',
//             scopeDelimiter: ' ',
//             oauthType: '2.0',
//             popupOptions: { width: null, height: null },
//             clientId: '{{CLIENT_ID}}'
//         },
//         facebook: {
//             name: 'facebook',
//             url: '/facebook/cb',
//             authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
//             redirectUri: getRedirectUrl(),
//             requiredUrlParams: ['display', 'scope'],
//             scope: ['email'],
//             responseType: 'code',
//             scopeDelimiter: ',',
//             oauthType: '2.0',
//             popupOptions: getPopupOptions(660, 400),
//             clientId: '{{CLIENT_ID}}'
//         },
//     }
// })
//
// Vue.prototype.$auth = vueAuth
