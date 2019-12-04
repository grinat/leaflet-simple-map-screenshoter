/* global before, after, browser, server */
const puppeteer = require('puppeteer')
const path = require('path')
const StaticServer = require('static-server')

const config = {
    headless: true,
    slowMo: 100,
    timeout: 60000,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=300,600'
    ]
}

before(async () => {
    global.server = new StaticServer({
        rootPath: path.join(__dirname, '../'),
        port: 8080
    })
    await new Promise((resolve, reject) => {
        global.server.start(resolve)
    })

    // If running in the Puppeteer Docker container, configure Puppeteer to use
    // the instance of Google Chrome that is already installed.
    if (process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD) {
        config.executablePath = 'google-chrome-unstable'
    }

    global.browser = await puppeteer.launch(config)
})

after(async () => {
    server.stop()
    await browser.close()
})
