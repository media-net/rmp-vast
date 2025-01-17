'use strict';

const TEST = require('../helpers/test');

let driver;

let testUrls = [
  TEST.pathToTest + 'inlineLinearSpec/IABVAST3Spec.html'
];

const testUrlsChromeOnly = [
  TEST.pathToTest + 'inlineLinearSpec/AudioAdSpec.html',
  TEST.pathToTest + 'inlineLinearSpec/IABVAST2Spec.html',
  TEST.pathToTest + 'inlineLinearSpec/IABVAST3Spec.html',
  TEST.pathToTest + 'inlineLinearSpec/hls-creative.html',
  TEST.pathToTest + 'inlineLinearSpec/ImaInlineLinearSpec.html',
  TEST.pathToTest + 'inlineLinearSpec/SkippableSpec.html'
];

const args = process.argv;
if (args[2] === 'android') {
  driver = TEST.getDriver('android');
} else if (args[2] === 'safari') {
  driver = TEST.getDriver('safari');
  driver.manage().window().setRect({ width: 1280, height: 960 });
} else if (args[2] === 'chrome') {
  testUrls = testUrlsChromeOnly;
  driver = TEST.getDriver('chrome');
} else {
  driver = TEST.getDriver('firefox');
}

const intialTime = Date.now();
let index = 0;

const _run = function () {
  console.log('Run HTML spec ' + testUrls[index] + ' at: ' + (Date.now() - intialTime) + 'ms');
  const p = TEST.loadHTMLSpec(driver, testUrls[index]);
  p.then(() => {
    if (index === testUrls.length - 1) {
      driver.quit();
      return;
    }
    index++;
    _run();
  }).catch(() => {
    driver.quit();
  });
};

_run();
