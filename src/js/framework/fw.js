export default class FW {

  static _getStyleAttributeData(element, style) {
    let styleAttributeData = 0;
    if (element && typeof window.getComputedStyle === 'function') {
      const cs = window.getComputedStyle(element, null);
      if (cs) {
        styleAttributeData = cs.getPropertyValue(style);
        styleAttributeData = styleAttributeData.toString().toLowerCase();
      }
    }
    styleAttributeData = styleAttributeData.toString();
    if (styleAttributeData.indexOf('px') > -1) {
      styleAttributeData = styleAttributeData.replace('px', '');
    }
    return parseFloat(styleAttributeData);
  }

  static nullFn() {
    return null;
  }

  static createStdEvent(eventName, element) {
    let event;
    if (element) {
      try {
        event = new Event(eventName);
        element.dispatchEvent(event);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  static setStyle(element, styleObject) {
    if (element && typeof styleObject === 'object') {
      const keys = Object.keys(styleObject);
      keys.forEach(key => {
        element.style[key] = styleObject[key];
      });
    }
  }

  static getWidth(element) {
    if (element) {
      if (FW.isNumber(element.offsetWidth) && element.offsetWidth !== 0) {
        return element.offsetWidth;
      } else {
        return FW._getStyleAttributeData(element, 'width');
      }
    }
    return 0;
  }

  static getHeight(element) {
    if (element) {
      if (FW.isNumber(element.offsetHeight) && element.offsetHeight !== 0) {
        return element.offsetHeight;
      } else {
        return FW._getStyleAttributeData(element, 'height');
      }
    }
    return 0;
  }

  static show(element) {
    if (element) {
      element.style.display = 'block';
    }
  }

  static hide(element) {
    if (element) {
      element.style.display = 'none';
    }
  }

  static removeElement(element) {
    if (element && element.parentNode) {
      try {
        element.parentNode.removeChild(element);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  static isEmptyObject(obj) {
    if (obj && typeof obj === 'object' && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }

  static get consoleStyle() {
    return 'color: white; background-color: #00ACC1; padding:1px 3px; border-radius: 3px; margin-right: 7px';
  }

  static get consoleStyle2() {
    return 'color: white; background-color: #FB8C00; padding:1px 3px; border-radius: 3px; margin-right: 7px';
  }

  static get consolePrepend2() {
    const CLASSIC_LOG_PATTERN = /(edge|xbox|msie|trident)/i;
    if (navigator && navigator.userAgent && CLASSIC_LOG_PATTERN.test(navigator.userAgent)) {
      // browsers with no console log styling capabilities
      return 'om-sdk-manager:';
    }
    return 'om-sdk-manager%c';
  }


  static get consolePrepend() {
    const CLASSIC_LOG_PATTERN = /(edge|xbox|msie|trident)/i;
    if (navigator && navigator.userAgent && CLASSIC_LOG_PATTERN.test(navigator.userAgent)) {
      // browsers with no console log styling capabilities
      return 'RMP-VAST:';
    }
    return '%crmp-vast%c';
  }

  static logVideoEvents(video, type) {
    const events = [
      'loadstart',
      'durationchange',
      'playing',
      'waiting',
      'loadedmetadata',
      'loadeddata',
      'canplay',
      'canplaythrough'
    ];
    events.forEach((value) => {
      video.addEventListener(value, (e) => {
        if (e && e.type) {
          console.log(`${FW.consolePrepend} ${type} player event ${e.type}`, FW.consoleStyle, '');
        }
      });
    });
  }

  static isNumber(n) {
    if (typeof n === 'number' && Number.isFinite(n)) {
      return true;
    }
    return false;
  }

  static openWindow(link) {
    try {
      // I would like to use named window here to have better performance like 
      // window.open(link, 'rmpVastAdPageArea'); but focus is not set on updated window with such approach
      // in MS Edge and FF - so _blank it is
      window.open(link, '_blank');
    } catch (e) {
      console.warn(e);
    }
  }

}
