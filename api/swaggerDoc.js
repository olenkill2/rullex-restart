const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
	swaggerDefinition: {
		info: {
			title: 'Rullex api',
			version: '1.0.0',
			description: 'Api всего проекта',
		},
		// host: 'localhost:3002',
		basePath: '/',
	},
	swagger: '2.0',
	host: 'localhost:3002',
	apis: ['routes/*.js']
}

const specs = swaggerJsDoc(options);
console.log(specs);
module.exports = (app) => {
	app.get('/swagger.json', (req, res) => {res.json(specs)})
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}