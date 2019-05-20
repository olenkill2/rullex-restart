const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const swagger = require('./swaggerDoc');
const app = express();
const error = require('./middleware/error');
console.log(aaaa);


app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
swagger(app);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connect(config.get('dbUrl'), {
	useNewUrlParser: true
}).catch(() => {
	console.log('fail');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

require('./routes/index')(app, db);

app.use(error);
app.listen(3002);