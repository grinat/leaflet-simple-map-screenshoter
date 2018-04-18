## leaflet-simple-map-screenshoter
[Leaflet](http://www.leafletjs.com) plugin which take screenshot of map.
Used [dom-to-image](https://github.com/tsayen/dom-to-image).

### Install
```
npm install leaflet-simple-map-screenshoter --save
```

### Options
```
cropImageByInnerWH: true,
hidden: false, // hide screen icon
domtoimageOptions: {}, // options for dom-to-image
position: 'topleft', // position of take screen icon
screenName: 'screen', // string or function
iconInBase64: ICON_SVG_BASE64 // screen icon in base64
```

### Example
```
import 'leaflet-simple-map-screenshoter'
```
And click on screnshot icon for save


```
import 'leaflet-simple-map-screenshoter'

this.simpleMapScreenshoter = L.simpleMapScreenshoter({}).addTo(this.map)
let format = 'blob' // 'image' when return base64, 'canvas' return canvas
let options = {
  mimeType: 'image/png' // used if format == image,
  domtoimageOptions: {} // see options for dom-to-image
}
this.simpleMapScreenshoter.takeScreen(format, options).then(blob => {
   alert('done')
   // FileSaver.saveAs(blob, 'screen.png')
}).catch(e => {
   console.error(e)
})
```


