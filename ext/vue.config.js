module.exports = {
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.optimization.splitChunks = false;
		} else {
			// mutate for development...
		}
		// config.resolve.alias
		// 	.set('~', path.join(__dirname, './src'))
		// 	.set('@', path.join(__dirname, './src/core'))
		// 	.set('#', path.join(__dirname, './src/modules'))

	},
	css: {
		loaderOptions: {
			scss: {
				prependData: '@import "@/assets/style/app.scss";'
			}
		}
	},
	// css: {
	// 	loaderOptions: {
	// 		sass: {
	// 			sassOptions: {
	// 				includePaths: [
	// 					path.resolve(__dirname, 'src/core/')
	// 				],
	// 				indentedSyntax: true,
	// 			},
	// 			prependData: `@import "~@/assets/style/app.scss";`,
	// 		},
	// 	},
	// },
	// assetsDir: '@/assets/',
}
