## leaflet-simple-map-screenshoter
[Leaflet](http://www.leafletjs.com) plugin which take screenshot of map.
Used [dom-to-image](https://github.com/tsayen/dom-to-image).

### Install
```
npm install leaflet-simple-map-screenshoter --save
```

### Example
[Open](https://github.com/grinat/leaflet-simple-map-screenshoter/blob/master/examples/index.html) (see in /examples)

### Usage
Add save screenshot button to leaflet control panel
```javascript
import 'leaflet'
// import script after leaflet
import 'leaflet-simple-map-screenshoter'

L.simpleMapScreenshoter().addTo(this.map)
```

For custom usage
```javascript
import 'leaflet'
// import script after leaflet
import 'leaflet-simple-map-screenshoter'

let pluginOptions = {
   cropImageByInnerWH: true, // crop blank opacity from image borders
   hidden: false, // hide screen icon
   domtoimageOptions: {}, // see options for dom-to-image
   position: 'topleft', // position of take screen icon
   screenName: 'screen', // string or function
   iconUrl: ICON_SVG_BASE64, // screen btn icon base64 or url
   hideElementsWithSelectors: ['.leaflet-control-container'] // by default hide map controls All els must be child of _map._container
}

this.simpleMapScreenshoter = L.simpleMapScreenshoter(pluginOptions).addTo(this.map)
let format = 'blob' // 'image' - return base64, 'canvas' - return canvas
let options = {
  mimeType: 'image/png', // used if format == image,
  domtoimageOptions: {} // override dom-to-image options in pluginOptions
}
this.simpleMapScreenshoter.takeScreen(format, options).then(blob => {
   alert('done')
   // FileSaver.saveAs(blob, 'screen.png')
}).catch(e => {
   console.error(e)
})
```

### Events

```
simpleMapScreenshoter.click - on leaflet control panel take screen btn click
simpleMapScreenshoter.takeScreen - start build screenshot
simpleMapScreenshoter.done - screenshot build ended
simpleMapScreenshoter.error - on error, return Error instance
```


