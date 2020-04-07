const popupOffset = (width, height) => {

}

import VueAuthenticate from 'vue-authenticate'
import Vue from 'vue'
import axios from 'axios';

const vueAuth = VueAuthenticate.factory(axios, {
    tokenName: 'access_token',
    baseUrl: 'http://localhost:3002/api/v1/users/oauth/',
    tokenPrefix: '',
    storageType: 'cookieStorage',
    providers: {
        vk: {
            name: 'vk',
            url: '/vk/cb',
            authorizationEndpoint: 'https://oauth.vk.com/authorize',
            redirectUri: 'http://localhost:3334/',
            requiredUrlParams: ['scope', 'display', 'userId'],
            scope: ['email'],
            display: 'popup',
            responseType: 'code',
            oauthType: '2.0',
            popupOptions: { width: null, height: null },
            clientId: '23',
        },
        google: {
            name: 'google',
            url: '/google/cb',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            redirectUri: 'http://localhost:3334/',
            optionalUrlParams: ['display'],
            requiredUrlParams: ['scope'],
            scope: ['profile', 'email'],
            responseType: 'code',
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: null, height: null },
            clientId: '23'
        },
        yandex: {
            name: 'yandex',
            url: '/yandex/cb',
            authorizationEndpoint: 'https://oauth.yandex.ru/authorize',
            redirectUri: 'http://localhost:3334/',
            requiredUrlParams: ['scope'],
            scope: ['login:email', 'login:avatar', 'login:info', 'audience:read'],
            responseType: 'code',
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: null, height: null },
            clientId: '23'
        },
        facebook: {
            name: 'facebook',
            url: '/facebook/cb',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: 'http://localhost:3334/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            responseType: 'code',
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: null, height: null },
            clientId: '23'
        },
    }
})

Vue.prototype.$auth = vueAuth
