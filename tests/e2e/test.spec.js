/* global describe, before, after, it, browser */
const {expect} = require('chai')
const {download, waitForDownloadFile} = require('./helpers/download')
const {getDiffWithImageFileAndFixture} = require('../helpers/compare')

describe('test', async () => {
    let page

    before(async () => {
        page = await browser.newPage()
        await page.goto('http://localhost:8080/examples/index.html')
    })

    after(async () => {
        await page.close()
    })

    it('create screen on click btn in panel', async () => {
        const path = await download(page, '.leaflet-control-simpleMapScreenshoter-btn')
        const file = await waitForDownloadFile(path)

        const {percent} = getDiffWithImageFileAndFixture(file, 'panel.png', 'panel')

        expect(percent).to.be.lessThan(5)

        const scrState = await page.$eval('#mapsScreeningState', (element) => element.innerHTML)
        expect(scrState).to.include('screening')
        expect(scrState).to.include('screen end')
    })

    it('create screen with caption and save', async () => {
        const path = await download(page, '#screenMap')
        const file = await waitForDownloadFile(path)

        const {percent} = getDiffWithImageFileAndFixture(file, 'with-caption.png', 'with-caption')

        expect(percent).to.be.lessThan(5)
    })

    it('events fired', async () => {
        const path = await download(page, '.leaflet-control-simpleMapScreenshoter-btn')
        await waitForDownloadFile(path)

        // fired screening start, end events
        const scrState = await page.$eval('#mapsScreeningState', (element) => element.innerHTML)
        expect(scrState).to.include('screening')
        expect(scrState).to.include('screen end')
        expect(scrState).not.to.include('Error')

        // on error return reject promise
        let err = null
        try {
            await page.evaluate('simpleMapScreenshoter.takeScreen(\'image\', {caption: \'1\', captionOffset: \'wrongBase64\'})')
        } catch (e) {
            err = e
        }
        expect(err).to.be.an('error')

        // fired error event
        await page.waitForSelector('.create-screen-error')
    })
})
