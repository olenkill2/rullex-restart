const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const logger = require('./startup/logger')

const auth = require('basic-auth')
const admin = { name: 'username', password: 'password' }

app.use(function(request, response, next) {
  var user = auth(request)
  if (!user || !admin.name || admin.password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"')
    return response.status(401).send()
  }
  return next()
})

require('./startup/db')()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes/index')(app)

app.use('/uploads', express.static(__dirname + "/uploads"))
app.use('*', (req, res) => {
	res.status(404).json({error: 'method not exist'})
})

app.listen(3002, () => {
	logger.info('Server start')
})
