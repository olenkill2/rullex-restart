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
		'@nuxtjs/proxy',
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		'cookie-universal-nuxt'
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
		}
	},

	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3002/api/v1'
	},

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
