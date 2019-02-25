const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v1')
const mkdirp = require('mkdirp')

const download = async function (page, selector) {
    const downloadPath = path.join(__dirname, '../downloads', uuid())
    mkdirp(downloadPath)
    await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath })
    await page.click(selector)
    return downloadPath
}

const waitForDownloadFile = async function (downloadPath) {
    let filename
    while (!filename || filename.endsWith('.crdownload')) {
        filename = fs.readdirSync(downloadPath)[0]
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    return path.join(downloadPath, filename)
}

module.exports.download = download
module.exports.waitForDownloadFile = waitForDownloadFile
