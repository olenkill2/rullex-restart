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
	  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    // extendRoutes (routes, resolve) {
    //   routes.push({
    //     name: 'custom',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/404.vue')
    //   })
    // }
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.scss',
    '~/assets/style/animations.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
	'~/plugins/directives',
  '~/plugins/axios',
  {src: '~/plugins/wyswig', ssr: false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
	// Doc: https://github.com/nuxt-community/axios-module#usage
	'@nuxtjs/proxy',
	'@nuxtjs/axios',
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
			target: 'http://127.0.0.1:3002',
			pathRewrite: {'^/api/': '/'},
			logLevel: 'debug'
		},
		'/uploads/': {
			target: 'http://127.0.0.1:3002',
			// pathRewrite: {'^/uploads/': '/'},
			logLevel: 'debug'
		}
	},

  /*
  ** Build configuration
  */
  build: {
	/*
	** You can extend webpack config here
	*/
	extend(config, ctx) {

	}
  }
}
