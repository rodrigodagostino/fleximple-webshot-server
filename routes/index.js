const express = require( 'express' )
const puppeteer = require( 'puppeteer' )
const router = express.Router()
const path = require( 'path' )

router.post( '/screenshot', async ( req, res ) => {
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
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: [ '--disable--extensions' ],
    args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
  })

  // Open page
  const page = await browser.newPage()
  await page.goto( `${ targetProtocol }://${ targetUrl }`, {
    waitUntil: 'networkidle0',
  })
  await page.setViewport({
    width: parseInt( fileWidth ),
    height: parseInt( fileHeight ),
  })
  if ( fullPage ) {
    await page.evaluate( () =>
      window.scrollTo({
        top: document.body.clientHeight,
        behavior: 'smooth',
      }),
    )
  }
  // Convert value to milliseconds.
  await page.waitForTimeout( parseInt( captureDelay * 1000 ) )

  // Take a screenshot
  const fileName = `screenshot_${ formattedDate }_${ targetUrl }.${
    fileType === 'jpeg' ? 'jpg' : fileType
  }`
  await page.screenshot({
    path: `./public/screenshots/${ fileName }`,
    type: fileType,
    ...fileType === 'jpeg' ? { quality: parseInt( fileQuality ) } : null,
    fullPage: fullPage,
  })

  // Close browser
  await browser.close()

  res.json({
    success: true,
    fileName,
  })
})

router.get( '/', ( req, res ) => {
  res.sendFile( path.join( __dirname, '..', 'public', 'index.html' ) )
})

module.exports = router