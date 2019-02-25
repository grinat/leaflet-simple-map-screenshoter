const Canvas = require('canvas')
const fs = require('fs')
const path = require('path')
const pixelmatch = require('pixelmatch')

function getFixture (name) {
    return getFileAsCanvas(path.join(__dirname, '../fixtures', name))
}

function getFileAsCanvas (filePath) {
    const img = new Canvas.Image()
    img.src = fs.readFileSync(filePath)

    const cnv = Canvas.createCanvas(img.width, img.height)
    const ctx = cnv.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)
    return cnv
}

function getDiffWithImageFileAndFixture (imagePath, fixtureName, method = 'unknown') {
    const imgCanvas = getFileAsCanvas(imagePath)
    return getDiffOfFixture(imgCanvas, fixtureName, method)
}

function getDiffOfFixture (outCanvas, fixtureName, method) {
    const diffCanvas = Canvas.createCanvas(outCanvas.width, outCanvas.height)
    const diffCtx = diffCanvas.getContext('2d')
    const diffImageData = diffCtx.createImageData(outCanvas.width, outCanvas.height)

    const compareWithCanvas = getFixture(fixtureName)
    const compareWithCtx = compareWithCanvas.getContext('2d')
    const compareWith = compareWithCtx.getImageData(0, 0, compareWithCanvas.width, compareWithCanvas.height)

    const outCanvasCtx = outCanvas.getContext('2d')
    const out = outCanvasCtx.getImageData(0, 0, outCanvas.width, outCanvas.height)

    const outTotalPixels = outCanvas.width * outCanvas.height

    const diffedPixels = pixelmatch(
        out.data,
        compareWith.data,
        diffImageData.data,
        outCanvas.width,
        outCanvas.height
    )

    diffCtx.putImageData(diffImageData, 0, 0)
    diffCanvas
        .pngStream()
        .pipe(fs.createWriteStream(path.join(__dirname, '../out', method + '-diff-of-' + fixtureName + '.png')))

    saveCanvas(outCanvas, method)

    return {
        pixels: diffedPixels,
        percent: diffedPixels / (outTotalPixels / 100)
    }
}

function saveCanvas (canvas, method) {
    const ctx = canvas.getContext('2d')
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const saveC = Canvas.createCanvas(canvas.width, canvas.height)
    const saveCCtx = saveC.getContext('2d')
    saveCCtx.putImageData(data, 0, 0)
    const buff = saveC.toBuffer()
    fs.writeFileSync(path.join(__dirname, '../out', method + '.png'), buff)
}

module.exports.getDiffWithImageFileAndFixture = getDiffWithImageFileAndFixture
