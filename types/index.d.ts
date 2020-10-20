import {Control, ControlPosition, ErrorEvent} from 'leaflet'

interface PluginOptions extends Object {
  cropImageByInnerWH?: boolean, // crop blank opacity from image borders
  hidden?: boolean, // hide screen icon
  preventDownload?: boolean, // prevent download on button click
  domtoimageOptions?: any, // see options for dom-to-image
  position?: ControlPosition, // position of take screen icon
  screenName?: string | (() => string), // string or function
  iconUrl?: string, // screen btn icon base64 or url
  hideElementsWithSelectors?: Array<string>,// by default hide map controls All els must be child of _map._container
  mimeType?: string, // used if format == image,
  caption?: string | (() => string | null) | null, // streeng or function, added caption to bottom of screen
  captionFontSize?: number,
  captionFont?: string,
  captionColor?: string,
  captionBgColor?: string,
  captionOffset?: number,
}

export class SimpleMapScreenshoter extends Control {
  constructor(options?: PluginOptions);
  takeScreen(format?: 'blob' | 'image' | 'canvas', overridePluginOptions?: PluginOptions): Promise<Blob|Error|ErrorEvent>;
}

declare module "leaflet" {
  export function simpleMapScreenshoter(options?: PluginOptions): SimpleMapScreenshoter;
}
