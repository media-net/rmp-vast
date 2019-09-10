'use strict';

var ADTAG = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-companion.xml';

describe('Test for Companion', function () {

  var id = 'rmpPlayer';
  var container = document.getElementById(id);
  var video = document.querySelector('.rmp-video');
  video.muted = true;
  var rmpVast = new RmpVast(id);
  var fw = rmpVast.getFramework();
  var env = rmpVast.getEnvironment();
  if (env.isAndroid[0]) {
    container.style.width = '320px';
    container.style.height = '180px';
  }
  var title = document.getElementsByTagName('title')[0];

  it('should load adTag and play it', function (done) {
    var validSteps = 0;

    var _incrementAndLog = function (event) {
      validSteps++;
      if (event && event.type) {
        fw.log(event.type);
      }
    };

    container.addEventListener('adloaded', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('addurationchange', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('adimpression', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('adstarted', function (e) {
      _incrementAndLog(e);
      if (rmpVast.getCompanionAdsRequiredAttribute()) {
        _incrementAndLog(e);
      }
      var companionAds = rmpVast.getCompanionAdsList(900, 750);
      if (Array.isArray(companionAds) && companionAds.length === 3 && typeof companionAds[0] === 'object') {
        _incrementAndLog(e);
      }
      var companionAd = rmpVast.getCompanionAd(0);
      var companionSlot = document.getElementById('companionId');
      companionSlot.appendChild(companionAd);
      setTimeout(function () {
        var img = document.querySelector('#companionId > img');
        if (img !== null) {
          rmpVast.stopAds();
        }
      }, 3000);
    });

    container.addEventListener('adtagstartloading', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('adtagloaded', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('addestroyed', function (e) {
      _incrementAndLog(e);
      var timeupdateCount = 0;
      video.addEventListener('timeupdate', function (e) {
        timeupdateCount++;
        if (timeupdateCount === 5) {
          _incrementAndLog(e);
          if (validSteps === 10) {
            expect(validSteps).toBe(10);
            title.textContent = 'Test completed';
            done();
          }
        }
      });
    });

    rmpVast.loadAds(ADTAG);
  });


});