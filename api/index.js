const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./startup/logger');

require('./startup/db')();
require('./swaggerDoc')(app);

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

require('./routes/index')(app);

app.use('*', (req, res) => {
	res.status(404).json({error: 'method not exist'});
})

app.listen(3002, () => {
	logger.info('Server start')
});