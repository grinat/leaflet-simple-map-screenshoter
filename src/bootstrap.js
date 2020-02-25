/* global L */
import SimpleMapScreenshoter from './SimpleMapScreenshoter'

/**
 * @returns {L.Control.SimpleMapScreenshoter}
 */
const init = () => {
    L.Control.SimpleMapScreenshoter = SimpleMapScreenshoter
    L.simpleMapScreenshoter = function (options) {
        return new L.Control.SimpleMapScreenshoter(options)
    }
    return SimpleMapScreenshoter
}

export default init()

export {SimpleMapScreenshoter}
