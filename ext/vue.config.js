const path = require('path')
module.exports = {
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.optimization.splitChunks = false;
		} else {
			// mutate for development...
		}
		config.resolve.alias = {
		  ...config.resolve.alias,
      '~UI': path.resolve(__dirname, '../site'),
      'vue$': 'vue/dist/vue.esm.js'
    }
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: '@import "@/assets/style/app.scss";'
			}
		}
	},

}
