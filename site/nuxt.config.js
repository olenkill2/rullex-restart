const pkg = require('./package')

module.exports = {
	mode: 'universal',

	/*
	** Headers of the page
	*/
	head: {
	title: pkg.name,
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: pkg.description }
	],
	link: [
		// { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ rel: 'apple-touch-icon',  sizes: '180x180', href: '/apple-touch-icon.png' },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
		{ rel: 'manifest', href: '/site.webmanifest' },
		{ rel: 'mask-icon', color: '5bbad5', href: '/safari-pinned-tab.svg' },
		{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik:300,400,500,700&amp;subset=cyrillic' }
	]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#030303' },

	router: {
		linkActiveClass: 'active-link',
		scrollBehavior: function (to, from, savedPosition) {
			return { x: 0, y: 0 }
		},
		extendRoutes (routes, resolve) {
		  routes.push({
		    name: 'custom',
		    path: '*',
		    component: resolve(__dirname, 'pages/post.vue')
		  })
		}
	},

	/*
	** Global CSS
	*/
	css: [
		'~/assets/style/app.scss',
		'~/assets/style/animations.scss'
	],

	styleResources: {
		scss: [
			'~assets/style/variables.scss',
		]
	},

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~/plugins/directives',
		'~/plugins/axios',
		'~/plugins/vee-validate',
		'~/plugins/customGlobalComponents',
		{src: '~/plugins/editor', mode: 'client'},
        {src: '~/plugins/vue-authenticate', mode: 'client'}
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
	// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/proxy',
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
        // '@nuxtjs/auth'
	],
	/*
	** Axios module configuration
	*/
	axios: {
	// See https://github.com/nuxt-community/axios-module#options
		proxy: true,
	},

	proxy: {
		'/api/': {
			target: 'http://127.0.0.1:3002/api/v1/',
			pathRewrite: {'^/api/': '/'},
			logLevel: 'debug'
		},
		'/uploads/': {
			target: 'http://127.0.0.1:3002',
			// pathRewrite: {'^/uploads/': '/'},
			logLevel: 'debug'
		}
	},

	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3002/api/v1'
	},

    // auth: {
    //     redirect: {
    //         callback: '/oauth/',
    //         logout: '/signed-out'
    //     },
	//     strategies: {
    //         google: {
    //             redirect_uri: '/oauth/?from=google',
    //             response_type: 'code',
    //             // mode: 'popup',
    //             client_id:
    //                 '48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com'
    //         },
    //         vk: {
    //             _scheme: 'oauth2',
    //             authorization_endpoint: 'http://oauth.vk.com/authorize',
    //             // userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
    //             // scope: ['openid', 'profile', 'email'],
    //             access_type: 'offline',
    //             access_token_endpoint: 'http://localhost:3002/api/v1/users/oauth/vk',
    //             response_type: 'code',
    //             token_type: 'Bearer',
    //             mode: 'popup',
    //             redirect_uri: 'http://localhost:3334/oauth/?from=vk',
    //             client_id: '7101695',
    //             // token_key: 'access_token',
    //             // state: 'UNIQUE_AND_NON_GUESSABLE'
    //             // endpoints: {
    //             //     authorization: 'http://oauth.vk.com/authorize',
    //             //     token: 'http://localhost:3002/api/v1/users/oauth/'
    //             //     // userInfo: '/oauth2mockserver/userinfo'
    //             // },
    //             // responseType: 'code',
    //             // // grantType: 'authorization_code',
    //             // clientId: '7101695'
    //         }
    //     }
    // },


	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		transpile: ["vee-validate/dist/rules"],
		extend(config, ctx) {
		}
	}
}
