const express = require( 'express' )
const puppeteer = require( 'puppeteer' )
const path = require( 'path' )
const cors = require( 'cors' )
const fs = require( 'fs' )
const https = require( 'https' )

const app = express()

app.use( express.static( path.join( __dirname, 'public' ) ) )
app.use( cors( {
	origin: [ 'https://webshot.fleximple.com' ],
	methods: [ 'OPTIONS', 'POST' ],
} ) )
app.use( express.json() )
app.set( 'port', process.env.PORT || 5100 )

app.post( '/screenshot', async ( req, res ) => {
	const {
		targetProtocol,
		targetUrl,
		fileWidth,
		fileHeight,
		fullPage,
		fileType,
		fileQuality,
		captureDelay,
	} = req.body

	const currentDate = new Date()
	const formattedDate =
		currentDate.getFullYear() +
		'-' +
		String( currentDate.getMonth() + 1 ).padStart( 2, '0' ) +
		'-' +
		String( currentDate.getDate() ).padStart( 2, '0' ) +
		'-at-' +
		String( currentDate.getHours() ).padStart( 2, '0' ) +
		'-' +
		String( currentDate.getMinutes() ).padStart( 2, '0' ) +
		'-' +
		String( currentDate.getSeconds() ).padStart( 2, '0' )

	// Start Browser
	const browser = await puppeteer.launch( {
		headless: true,
		ignoreDefaultArgs: [ '--disable--extensions' ],
		args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
	} )

	// Open page
	const page = await browser.newPage()
	await page.goto( `${ targetProtocol }://${ targetUrl }`, {
		waitUntil: 'networkidle0',
	} )
	await page.setViewport( {
		width: parseInt( fileWidth ),
		height: parseInt( fileHeight ),
	} )
	if ( fullPage ) {
		await page.evaluate( () =>
			window.scrollTo( {
				top: document.body.clientHeight,
				behavior: 'smooth',
			} ),
		)
	}
	await page.waitForTimeout( parseInt( captureDelay * 1000 ) ) // Convert value to milliseconds.

	// Take a screenshot
	const fileName = `screenshot_${ formattedDate }_${ targetUrl }.${
		fileType === 'jpeg' ? 'jpg' : fileType
	}`
	await page.screenshot( {
		path: `./public/screenshots/${ fileName }`,
		type: fileType,
		...fileType === 'jpeg' ? { quality: parseInt( fileQuality ) } : null,
		fullPage: fullPage,
	} )

	// Close browser
	await browser.close()

	res.json( {
		success: true,
		fileName,
	} )
} )

/* SSL certificates and key */
const cert = fs.readFileSync( './ssl/fleximple.com.cert' )
const ca = fs.readFileSync( './ssl/fleximple.com.cacert' )
const key = fs.readFileSync( './ssl/fleximple.com.key' )

const httpsServer = https.createServer( { cert, ca, key }, app )
httpsServer.listen( app.get( 'port' ), () => {
	console.log( 'Server started on port ' + app.get( 'port' ) )
} )

// app.listen( app.get( 'port' ), function () {
// 	console.log( 'Server started on port ' + app.get( 'port' ) )
// } )
