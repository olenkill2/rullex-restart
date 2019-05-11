const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const app = express();
const swagger = require('./swaggerDoc');

app.use(cors());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connect(config.dbUrl, {
	useNewUrlParser: true
}).catch(() => {
	console.log('fail');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

swagger(app);
require('./routes/index')(app, db);
app.listen(3002);