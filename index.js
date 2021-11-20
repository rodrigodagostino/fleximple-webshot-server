const express = require( 'express' )
const path = require( 'path' )
const fs = require( 'fs' )
const https = require( 'https' )

const app = express()
const routes = require( './routes/index' )

const OS = require( 'os' )
process.env.UV_THREADPOOL_SIZE = OS.cpus().length

app.use( express.static( path.join( __dirname, 'public' ) ) )
app.use( express.json() )
app.set( 'port', process.env.PORT || 3080 )

app.use( routes )

if ( process.env.MODE === 'development' ) {
  app.listen( app.get( 'port' ), function () {
    console.log( 'Server started on port ' + app.get( 'port' ) )
  })
} else {
  /* SSL certificates and key */
  const cert = fs.readFileSync( process.env.SSL_CERT_PATH )
  const ca = fs.readFileSync( process.env.SSL_CACERT_PATH )
  const key = fs.readFileSync( process.env.SSL_KEY_PATH )

  const httpsServer = https.createServer({ cert, ca, key }, app )
  httpsServer.listen( app.get( 'port' ), () => {
    console.log( 'Server started on port ' + app.get( 'port' ) )
  })
}
