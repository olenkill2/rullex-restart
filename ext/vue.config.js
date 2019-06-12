module.exports = {
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.optimization.splitChunks = false;
		} else {
			// mutate for development...
		}
	},
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/assets/style/app.scss";`,
			},
		},
	},
}
