'use strict';

var ADTAG = 'https://www.radiantmediaplayer.com/vast/tags/ad-pod-no-standalone.xml';

describe("Test for AdPodNoStandaloneSpec", function () {

  var id = 'rmpPlayer';
  var container = document.getElementById(id);
  var video = document.querySelector('.rmp-video');
  var rmpVast = new RmpVast(id);
  var fw = rmpVast.getFW();
  var env = rmpVast.getEnv();
  var ua = window.navigator.userAgent;
  var regExp = /(edge\/|firefox\/)/i;
  if (!regExp.test(ua)) {
    video.muted = true;
  }
  if (env.isAndroid[0]) {
    container.style.width = '320px';
    container.style.height = '180px';
  }
  var title = document.getElementsByTagName('title')[0];

  it("should load adTag and play pod of 3 ads", function (done) {
    var validSteps = 0;

    var _incrementAndLog = function (event) {
      validSteps++;
      if (event && event.type) {
        fw.log(event.type);
      }
    };

    container.addEventListener('adstarted', function (e) {
      _incrementAndLog(e);
    });
    
    container.addEventListener('addestroyed', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('adpodcompleted', function (e) {
      _incrementAndLog(e);
      var timeupdateCount = 0;
      video.addEventListener('timeupdate', function (e) {
        timeupdateCount++;
        if (timeupdateCount === 6) {
          _incrementAndLog(e);
          if (validSteps === 8) {
            expect(validSteps).toBe(8);
            title.textContent = 'Test completed';
            done();
          }
        }
      });
    });

    rmpVast.loadAds(ADTAG);
  });


});
