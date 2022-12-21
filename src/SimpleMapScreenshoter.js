/* global L */
import domtoimage from 'dom-to-image-more'
import fileSaver from 'file-saver'

export const STATUS_READY = 1
export const STATUS_PENDING = 2
export const ICON_SVG_BASE64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnIGlkPSJjYW1lcmEiPjxwYXRoIHN0eWxlPSJmaWxsOiMwMTAwMDI7IiBkPSJNMTYsOS41MDFjLTQuNDE5LDAtOCwzLjU4MS04LDhjMCw0LjQxOCwzLjU4MSw4LDgsOGM0LjQxOCwwLDgtMy41ODIsOC04UzIwLjQxOCw5LjUwMSwxNiw5LjUwMXogTTIwLjU1NSwyMS40MDZjLTIuMTU2LDIuNTE2LTUuOTQzLDIuODA3LTguNDU5LDAuNjVjLTIuNTE3LTIuMTU2LTIuODA3LTUuOTQ0LTAuNjUtOC40NTljMi4xNTUtMi41MTcsNS45NDMtMi44MDcsOC40NTktMC42NUMyMi40MiwxNS4xMDIsMjIuNzExLDE4Ljg5MSwyMC41NTUsMjEuNDA2eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiMwMTAwMDI7IiBkPSJNMTYsMTMuNTAxYy0yLjIwOSwwLTMuOTk5LDEuNzkxLTQsMy45OTl2MC4wMDJjMCwwLjI3NSwwLjIyNCwwLjUsMC41LDAuNXMwLjUtMC4yMjUsMC41LTAuNVYxNy41YzAuMDAxLTEuNjU2LDEuMzQzLTIuOTk5LDMtMi45OTljMC4yNzYsMCwwLjUtMC4yMjQsMC41LTAuNVMxNi4yNzYsMTMuNTAxLDE2LDEzLjUwMXoiLz48cGF0aCBzdHlsZT0iZmlsbDojMDEwMDAyOyIgZD0iTTI5LjQ5Miw4LjU0MmwtNC4zMzQtMC43MjNsLTEuMzczLTMuNDM0QzIzLjMyNiwzLjI0LDIyLjIzMiwyLjUsMjEsMi41SDExYy0xLjIzMiwwLTIuMzI2LDAuNzQtMi43ODYsMS44ODZMNi44NDIsNy44MTlMMi41MDksOC41NDJDMS4wNTUsOC43ODMsMCwxMC4wMjcsMCwxMS41djE1YzAsMS42NTQsMS4zNDYsMywzLDNoMjZjMS42NTQsMCwzLTEuMzQ2LDMtM3YtMTVDMzIsMTAuMDI3LDMwLjk0NSw4Ljc4MywyOS40OTIsOC41NDJ6IE0zMCwyNi41YzAsMC41NTMtMC40NDcsMS0xLDFIM2MtMC41NTMsMC0xLTAuNDQ3LTEtMXYtMTVjMC0wLjQ4OSwwLjM1NC0wLjkwNiwwLjgzNi0wLjk4Nkw4LjI4LDkuNjA3bDEuNzkxLTQuNDc4QzEwLjIyNCw0Ljc1LDEwLjU5MSw0LjUsMTEsNC41aDEwYzAuNDA4LDAsMC43NzUsMC4yNDksMC45MjgsMC42MjlsMS43OTEsNC40NzhsNS40NDUsMC45MDdDMjkuNjQ2LDEwLjU5NCwzMCwxMS4wMTEsMzAsMTEuNVYyNi41eiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+'

export const SimpleMapScreenshoter = L.Control.extend({
    options: {
        cropImageByInnerWH: true,
        hidden: false,
        domtoimageOptions: {},
        position: 'topleft',
        screenName: 'screen',
        iconUrl: ICON_SVG_BASE64,
        hideElementsWithSelectors: [
            '.leaflet-control-container'
        ],
        onCropBorderSize: 2,
        caption: null,
        captionFontSize: 15,
        captionFont: 'Arial',
        captionColor: 'black',
        captionBgColor: 'white',
        captionOffset: 5,
        mimeType: 'image/png',
        debugMode: false,
        preventDownload: false,
        waitInterval: 100,
        onPixelDataFail: function ({ node, error }) {
            console.warn(`Map node is very big ${node.scrollWidth}x${node.scrollHeight}`)
            console.warn(`Add function: SimpleMapScreenshoter({
              onPixelDataFail: function({ node, plugin, error, mapPane, domtoimageOptions }) {
                 // Solutions:
                 // decrease size of map
                 // or decrease zoom level
                 // or remove elements with big distanses
                 // and after that return image in Promise - plugin._getPixelDataOfNormalMap
                 return plugin._getPixelDataOfNormalMap(domtoimageOptions)
              }
            })`)
            return Promise.reject(error)
        }
    },
    onAdd () {
        this._container = L.DomUtil.create(
            'div',
            'leaflet-control-simpleMapScreenshoter'
        )
        this._link = null
        this._screenState = {
            status: STATUS_READY,
            promise: null
        }
        if (this.options.hidden === false) {
            this._addScreenBtn()
        }

        this._onUserStartInteractWithMap = this._onUserStartInteractWithMap.bind(this)
        this._onUserEndInteractWithMap = this._onUserEndInteractWithMap.bind(this)

        this._map.on('zoomstart', this._onUserStartInteractWithMap)
        this._map.on('move', this._onUserStartInteractWithMap)

        this._map.on('zoomend', this._onUserEndInteractWithMap)
        this._map.on('moveend', this._onUserEndInteractWithMap)

        return this._container
    },
    /**
     * @param format {string} blob or png
     * @param sreenOptions {Object}
     * @returns {Promise<Blob>|Promise<Base64>} Blob or png image
     */
    takeScreen (format = 'blob', sreenOptions = {}) {
        const options = {}
        for (let opt in this.options) {
            if (sreenOptions.hasOwnProperty(opt)) {
                options[opt] = sreenOptions[opt]
            } else {
                options[opt] = this.options[opt]
            }
        }
        if (this._screenState.status === STATUS_PENDING) {
            return this._screenState.promise
        }
        this._map.fire('simpleMapScreenshoter.takeScreen')
        this._screenState.status = STATUS_PENDING
        this._setElementsVisible(false)
        this._screenState.promise = this._waitEndOfInteractions()
            .then(() => this._getPixelData(options))
            .then(pixels => {
                this._setElementsVisible(true)
                return this._toCanvas(pixels, options)
            })
            .then(canvas => {
                if (format === 'image') {
                    return this._canvasToImage(canvas, options)
                } else if (format === 'canvas') {
                    return canvas
                }
                return this._canvasToBlob(canvas, options)
            })
            .then(image => {
                this._screenState.status = STATUS_READY
                this._map.fire('simpleMapScreenshoter.done')
                return image
            }).catch(e => {
                this._setElementsVisible(true)
                this._screenState.status = STATUS_READY
                this._map.fire('simpleMapScreenshoter.error', {e})
                return Promise.reject(e)
            })
        return this._screenState.promise
    },
    /**
     * @param isVisible
     * @private
     */
    _setElementsVisible (isVisible = false) {
        this.options.hideElementsWithSelectors.forEach(selector => {
            const els = this._map._container.querySelectorAll(selector)
            for (let el of els) {
                el.style.opacity = isVisible === false
                    ? 0
                    : 1
            }
        })
    },
    /**
     * @param canvas
     * @param mimeType
     * @returns {Promise<Base64>}
     * @private
     */
    _canvasToImage (canvas, {mimeType}) {
        const image = canvas.toDataURL(mimeType)
        if (image.indexOf('base64') === -1) {
            return Promise.reject(new Error('Base64 image generation error'))
        }
        return Promise.resolve(image)
    },
    /**
     * @param canvas {Canvas}
     * @returns {Promise<Blob>}
     * @private
     */
    _canvasToBlob (canvas, {mimeType}) {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                resolve(blob)
            }, mimeType)
        })
    },
    /**
     * @param pixels {Uint8Array}
     * @param options {Object}
     * @returns {Promise<Canvas>}
     * @private
     */
    _toCanvas (pixels, options) {
        let {captionOffset, caption, captionFontSize, captionFont, captionColor, captionBgColor} = options
        let {screenHeight, screenWidth} = this._node
        let canvas = document.createElement('canvas')
        canvas.width = screenWidth
        canvas.height = screenHeight

        let ctx = canvas.getContext('2d')
        let imageData = ctx.createImageData(screenWidth, screenHeight)
        for (let i = 0; i < pixels.length; ++i) {
            imageData.data[i] = pixels[i]
        }
        ctx.putImageData(imageData, 0, 0)
        imageData = null

        let transformedCanvas = document.createElement('canvas')
        let transformedCanvasCtx = transformedCanvas.getContext('2d')
        let minY = 0
        let minX = 0
        let height = screenHeight
        let width = screenWidth

        // crop blank opacity from image borders
        if (this.options.cropImageByInnerWH === true) {
            let pixelAtXYOffset = 0

            let debugY = {}
            let debugX = {}

            let emptyYLine = []
            let emptyCountOnHorizontal = 0
            for (let y = 0; y < screenHeight; ++y) {
                emptyCountOnHorizontal = 0
                for (let x = 0; x < screenWidth; ++x) {
                    pixelAtXYOffset = (4 * y * screenWidth) + (4 * x)
                    // find opacity = 0 on horizontal
                    if (pixels[pixelAtXYOffset + 4] === 0) {
                        emptyCountOnHorizontal++
                    }
                    /* if (y === Math.round(screenHeight / 2)) {
                        debugY[x] = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4)
                    } */
                }
                // save empty horizontal
                if (emptyCountOnHorizontal === screenWidth) {
                    emptyYLine.push(y)
                }
            }
            const minMaxY = this._getMinAndMaxOnValuesBreak(emptyYLine)
            minY = minMaxY.min
            let maxX = screenWidth
            let maxY = minMaxY.max

            let emptyXLine = []
            let emptyCountOnVertical = 0
            for (let x = minX; x < maxX; ++x) {
                emptyCountOnVertical = 0
                for (let y = 0; y < screenHeight; ++y) {
                    pixelAtXYOffset = (4 * y * screenWidth) + (4 * x)
                    // find opacity = 0 on vertical
                    if (pixels[pixelAtXYOffset + 4] === 0) {
                        emptyCountOnVertical++
                    }

                    /* if (x === screenWidth - 5) {
                        debugX[y] = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4)
                    } */
                }
                // save empty vertical
                if (emptyCountOnVertical === screenHeight) {
                    emptyXLine.push(x)
                }
            }
            const minMaxX = this._getMinAndMaxOnValuesBreak(emptyXLine)
            minX = minMaxX.min
            maxX = minMaxX.max

            if ((minX === 0 && maxX === 0) || maxX === null) {
                maxX = screenWidth
            }
            if ((minY === 0 && maxY === 0) || maxY === null) {
                maxY = screenHeight
            }

            if (this.options.debugMode === true) {
                console.log('emptyYLine', emptyYLine)
                console.log('minMaxY', minMaxY)
                console.log('emptyXLine', emptyXLine)
                console.log('minMaxX', minMaxX)
                console.log('debugX', debugX)
                console.log('debugY', debugY)
            }

            // if w/h changed, scale inner
            if (minY !== 0 || maxY !== screenHeight || minX !== 0 || maxX !== screenWidth) {
                minY = minY + this.options.onCropBorderSize
                maxY = maxY - this.options.onCropBorderSize
                minX = minX + this.options.onCropBorderSize
                maxX = maxX - this.options.onCropBorderSize
            }
            height = maxY - minY
            width = maxX - minX
            transformedCanvas.width = width
            transformedCanvas.height = height
        } else {
            transformedCanvas.width = width
            transformedCanvas.height = height
        }

        let captionTxt = null
        if (caption) {
            captionTxt = typeof caption === 'function'
                ? caption.call(this)
                : caption
        }

        // increase size of canvas for write caption
        if (captionTxt !== null) {
            transformedCanvas.height = transformedCanvas.height + (captionOffset + captionFontSize + captionOffset)
            // set bg color
            transformedCanvasCtx.beginPath()
            transformedCanvasCtx.rect(0, 0, transformedCanvas.width, transformedCanvas.height)
            transformedCanvasCtx.fillStyle = captionBgColor
            transformedCanvasCtx.fill()
            transformedCanvasCtx.save()
        }

        transformedCanvasCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height)

        // write caption text
        if (captionTxt !== null) {
            transformedCanvasCtx.font = `${captionFontSize}px ${captionFont}`
            transformedCanvasCtx.fillStyle = captionColor
            transformedCanvasCtx.fillText(captionTxt, captionOffset, height + captionOffset + captionFontSize)
        }

        return Promise.resolve(transformedCanvas)
    },
    /**
     * find break in array [0,1,2,3,40,41,42]
     * we get 3 and 40
     * @param arr {Array}
     * @returns {{min: number, max: number}}
     * @private
     */
    _getMinAndMaxOnValuesBreak (arr) {
        let min = 0
        let max = 0
        let hasBreak = false
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] - 1 === arr[i - 1]) {
                min = arr[i]
            } else {
                max = arr[i]
                hasBreak = true
                break
            }
        }
        // if on start no opacity, opacity may be exist on end
        if (hasBreak === false && arr[0] > 1) {
            min = 0
            max = arr[0]
            // opaciy at start
        } else if (hasBreak === false) {
            min = arr[arr.length - 1] || 0
            max = null
        }
        return {min, max}
    },
    /**
     * @param domtoimageOptions
     * @returns {Promise<Uint8Array>}
     * @private
     */
    _getPixelData ({domtoimageOptions = {}}) {
        /**
         * 1) we try try to get full map size screen, but we have problem of big canvas:
         * https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element
         * ie mobile - 4000
         * ie - 8000
         * chrome - 16000
         * firefox - 32000
         *
         * 2) on error, we can create screen with hide not visible elements by css
         * sometimes it not work, need solution
         */
        return this._getPixelDataOfNormalMap(domtoimageOptions).catch(e => {
            console.warn('May be map size very big on that zoom level, we have error:', e.toString())
            console.warn('You can manually hide map elements with large distances between them for fix that warn')
            return this._getPixelDataOfBigMap(domtoimageOptions)
        })
    },
    _getPixelDataOfNormalMap (domtoimageOptions = {}) {
        const node = this._map.getContainer()

        this._node = {
            node,
            screenHeight: node.scrollHeight,
            screenWidth: node.scrollWidth
        }

        return domtoimage.toPixelData(node, domtoimageOptions)
    },
    _getPixelDataOfBigMap (domtoimageOptions = {}) {
        const node = this._map.getContainer()

        // fix: https://github.com/grinat/leaflet-simple-map-screenshoter/issues/7
        // fix memory out error if map scrollHeight and scrollWidth very big
        const mapPane = this._map.getPane('mapPane')

        const increaser = 2 // <-- when window resize, map resize with translate option, we need what for prevent gray on borders
        mapPane.style.width = `${node.clientWidth * increaser}px`
        mapPane.style.height = `${node.clientHeight * increaser}px`
        mapPane.style.overflow = 'hidden'

        const restoreMapPane = () => {
            mapPane.style.width = 'initial'
            mapPane.style.height = 'initial'
            mapPane.style.overflow = 'initial'
        }

        this._node = {
            node,
            screenHeight: node.scrollHeight,
            screenWidth: node.scrollWidth
        }

        return domtoimage.toPixelData(node, domtoimageOptions).then(r => {
            restoreMapPane()
            return r
        }).catch(e => {
            restoreMapPane()

            // 4000 - max canvas size on ie mobile
            if (node.scrollHeight >= 4000 || node.scrollWidth >= 4000) {
                return this.options.onPixelDataFail({
                    plugin: this,
                    node,
                    mapPane,
                    error: e,
                    domtoimageOptions
                })
            }

            return Promise.reject(e)
        })
    },
    /**
     * @private
     */
    _addScreenBtn () {
        this._link = L.DomUtil.create(
            'a',
            'leaflet-control-simpleMapScreenshoter-btn',
            this._container
        )
        this._addCss()
        L.DomEvent.addListener(this._link, 'click', this._onScreenBtn, this)
        L.DomEvent.disableClickPropagation(this._link)
    },
    /**
     * @private
     */
    _addCss () {
        let css = `
    .leaflet-control-simpleMapScreenshoter{
       border: 2px solid rgba(0,0,0,0.2);
       background-clip: padding-box;
    }
    .leaflet-control-simpleMapScreenshoter a{
       background-color: #fff;
       border-bottom: 1px solid #ccc;
       width: 30px;
       height: 30px;
       line-height: 30px;
       display: block;
       text-align: center;
       text-decoration: none;
       color: black;
       overflow: hidden;
       border-radius: 2px;
       background-image: url('${this.options.iconUrl}');
       background-position: 46% 41%;
       background-repeat: no-repeat;
       background-size: 63%;
    }
    .leaflet-control-simpleMapScreenshoter a:hover{
       cursor: pointer;
    }
    `
        let head = document.head || document.getElementsByTagName('head')[0]
        let style = document.createElement('style')
        style.appendChild(
            document.createTextNode(
                css
            )
        )
        head.appendChild(style)
    },
    /**
     * @private
     */
    _onScreenBtn () {
        this._map.fire('simpleMapScreenshoter.click')
        if (this.options.preventDownload) return

        this.takeScreen().then(blob => {
            const screenName = typeof this.options.screenName === 'function'
                ? this.options.screenName.call(this)
                : this.options.screenName

            fileSaver.saveAs(blob, `${screenName}.png`)
        }).catch(e => {
            this._map.fire('simpleMapScreenshoter.error', {e})
        })
    },
    _onUserStartInteractWithMap () {
        this._interaction = true
    },
    _onUserEndInteractWithMap () {
        this._interaction = false
    },
    _waitEndOfInteractions () {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (!this._interaction) {
                    resolve()
                    clearInterval(interval)
                }
            }, this.options.waitInterval)
        })
    }
})

export default SimpleMapScreenshoter
