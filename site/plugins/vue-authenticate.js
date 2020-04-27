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
            clientId: '23',
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
            clientId: '23'
        }
    }
})

Vue.prototype.$auth = vueAuth
