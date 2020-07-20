const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const cluster = require( 'cluster' )
const cCPUs = require('os').cpus().length
const logger = require('./startup/logger')
const config = require('config')

require('./startup/db')()
require('./startup/redis')

const app = express()

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

app.listen(config.get('port'), () => {
  logger.info('Server start')
})

// if (cluster.isMaster) {
//   for(let i = 0; i < cCPUs; i++) {
//     cluster.fork()
//   }
//
//   cluster.on('online', function( worker ) {
//     console.log('Worker ' + worker.process.pid + ' is online.')
//   })
//
//   cluster.on('exit', function(worker, code, signal) {
//     console.log('worker ' + worker.process.pid + ' died.')
//   })
// }
// else {
//   const app = express()
//
//   app.use(helmet())
//   app.use(cors())
//   app.use(morgan('dev'))
//   app.use(bodyParser.json())
//   app.use(bodyParser.urlencoded({ extended: true }))
//
//   require('./routes/index')(app)
//
//   app.use('/uploads', express.static(__dirname + "/uploads"))
//
//   app.use('*', (req, res) => {
//     res.status(404).json({error: 'method not exist'})
//   })
//
//   app.listen(config.get('port'), () => {
//     logger.info('Server start')
//   })
// }
