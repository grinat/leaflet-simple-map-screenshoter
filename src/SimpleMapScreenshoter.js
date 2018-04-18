import domtoimage from 'dom-to-image'

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
        iconInBase64: ICON_SVG_BASE64
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
        return this._container
    },
    /**
     * @param format {string} blob or png
     * @param options {Object}
     * @returns {Promise<Blob>|Promise<Base64>} Blob or png image
     */
    takeScreen (format = 'blob', options = {}) {
        options = Object.assign(options, {
            mimeType: 'image/png',
            domtoimageOptions: this.options.domtoimageOptions
        })
        if (this._screenState.status === STATUS_PENDING) {
            return this._screenState.promise
        }
        this._map.fire('simpleMapScreenshoter.takeScreen')
        this._screenState.status = STATUS_PENDING
        this._screenState.promise = this._getPixelData(options)
            .then(pixels => this._toCanvas(pixels))
            .then(canvas => {
                if (format === 'image') {
                    return this._canvasToImage(canvas, options)
                } else if (format === 'canvas') {
                    return canvas
                }
                return this._canvasToBlob(canvas)
            })
            .then(image => {
                this._screenState.status = STATUS_READY
                this._map.fire('simpleMapScreenshoter.done')
                return image
            }).catch(e => {
                this._screenState.status = STATUS_READY
                this._map.fire('simpleMapScreenshoter.error', {e})
                return e
            })
        return this._screenState.promise
    },
    /**
     * @param canvas
     * @param mimeType
     * @returns {Promise<Base64>}
     * @private
     */
    _canvasToImage (canvas, {mimeType}) {
        const image = canvas.toDataURL(mimeType)
        return Promise.resolve(image)
    },
    /**
     * @param canvas {Canvas}
     * @returns {Promise<Blob>}
     * @private
     */
    _canvasToBlob (canvas) {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                resolve(blob)
            }, 'image/png')
        })
    },
    /**
     * @param pixels {Uint8Array}
     * @returns {Promise<Canvas>}
     * @private
     */
    _toCanvas (pixels) {
        let {sH, sW, cH, cW} = this._node
        let canvas = document.createElement('canvas')
        canvas.width = sW
        canvas.height = sH
        let ctx = canvas.getContext('2d')

        let imageData = ctx.createImageData(sW, sH)

        if(this.options.cropImageByInnerWH === true) {
            let debug = {}
            let debug2 = {}
            let emptyYLine = []
            for (let y = 0; y < sH; ++y) {
                let emptyCountOnHorizontal = 0
                for (let x = 0; x < sW; ++x) {
                    let pixelAtXYOffset = (4 * y * sW) + (4 * x)
                    // find opacity = 0 on horizontal
                    if (pixels[pixelAtXYOffset + 4] === 0) {
                        emptyCountOnHorizontal++
                    }
                    if (y === 200) {
                        debug[x] = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4)
                    }
                    if (y === 400) {
                        debug2[x] = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4)
                    }
                }
                // save empty horizontal
                if (emptyCountOnHorizontal === sW) {
                    emptyYLine.push(y)
                }
            }
            let prev = 0
            let minY = 0
            let maxY = sH
            let findBreak = false
            emptyYLine.forEach((v, i) => {
                if (v - 1 === prev) {
                    if (findBreak === false && i > 0) {
                        minY = v
                    }
                } else if (i > 0) {
                    findBreak = true
                    maxY = v
                }
                prev = v
            })
            console.log('emptyYLine', emptyYLine)
            console.log('minY', minY, 'maxY', maxY)
            // console.log('debug', debug)
            // console.log('debug2', debug2)
            for (let i = 0; i < pixels.length; ++i) {
                imageData.data[i] = pixels[i]
            }
            ctx.putImageData(imageData, 0, 0)

            let height = maxY - minY
            let width = sW
            let cropedCanvas = document.createElement('canvas')
            let cropedCanvasCtx = cropedCanvas.getContext('2d')
            cropedCanvas.width = width
            cropedCanvas.height = height

            cropedCanvasCtx.drawImage(canvas, 0, minY, width, height, 0, 0, width, height)
            return Promise.resolve(cropedCanvas)
        } else {
            for (let i = 0; i < pixels.length; ++i) {
                imageData.data[i] = pixels[i]
            }

            ctx.putImageData(imageData, 0, 0)
            return Promise.resolve(canvas)
        }
    },
    /**
     * @param domtoimageOptions
     * @returns {Promise<Uint8Array>}
     * @private
     */
    _getPixelData ({domtoimageOptions = {}}) {
        const node = this._map.getContainer()
        this._node = {
            node,
            sH: node.scrollHeight,
            sW: node.scrollWidth,
            cH: node.clientHeight,
            cW: node.clientWidth
        }
        return domtoimage.toPixelData(node, domtoimageOptions)
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
       background-image: url('${this.options.iconInBase64}');
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
    _onScreenBtn (event) {
        this._map.fire('simpleMapScreenshoter.click')
        this.takeScreen().then(blob => {
            let a = document.createElement('a')
            let url = window.URL.createObjectURL(blob)
            document.body.appendChild(a)
            a.href = url
            const screenName = typeof this.options.screenName === 'function'
                ? this.options.screenName.call(this)
                : this.options.screenName
            a.download = `${screenName}.png`
            a.click()
            window.URL.revokeObjectURL(url)
        }).catch(e => {
            console.error(e)
        })
    }
})

/**
 * @returns {L.Control.SimpleMapScreenshoter}
 */
const init = () => {
    L.Control.SimpleMapScreenshoter = SimpleMapScreenshoter
    L.simpleMapScreenshoter = function (options) {
        return new L.Control.SimpleMapScreenshoter(options)
    }
}

export default init()
