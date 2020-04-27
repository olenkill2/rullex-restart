import VueAuthenticate from 'vue-authenticate'
import Vue from 'vue'
import axios from 'axios'

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

Vue.prototype.$auth = VueAuthenticate.factory(axios, {
    tokenName: 'access_token',
    baseUrl: 'http://localhost:3002/api/v1/users/oauth/', // базовый url api
    tokenPrefix: '',
    storageType: 'cookieStorage',
    providers: {
        vk: {
            name: 'vk',
            url: '/vk/cb', // итоговый url api, сюда уйдут данные от вк (/vk/cb -> http://localhost:3002/api/v1/users/oauth//vk/cb)
            authorizationEndpoint: 'https://oauth.vk.com/authorize',
            redirectUri: getRedirectUrl(),
            requiredUrlParams: ['scope', 'display', 'userId'],
            scope: ['email'],
            display: 'popup',
            responseType: 'code',
            oauthType: '2.0',
            popupOptions: getPopupOptions(660, 400), // получаем итоговые настройки окна: ширина, высота, отступ сверху, отступ сниз
            clientId: '{{CLIENT_ID}}',
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
            clientId: '{{CLIENT_ID}}'
        },
        yandex: {
            name: 'yandex',
            url: '/yandex/cb',
            authorizationEndpoint: 'https://oauth.yandex.ru/authorize',
            redirectUri: getRedirectUrl(),
            requiredUrlParams: ['scope'],
            scope: ['login:email', 'login:avatar', 'login:info', 'audience:read'],
            responseType: 'code',
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: getPopupOptions(660, 400),
            clientId: '{{CLIENT_ID}}'
        },
        facebook: {
            name: 'facebook',
            url: '/facebook/cb',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: getRedirectUrl(),
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            responseType: 'code',
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: getPopupOptions(660, 400),
            clientId: '{{CLIENT_ID}}'
        },
    }
})
