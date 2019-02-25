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
    // detect github actions
    if (process.env.GITHUB_ACTION) {
        config.executablePath = 'google-chrome-unstable'
    }
    global.browser = await puppeteer.launch(config)
})

after(async () => {
    server.stop()
    await browser.close()
})
