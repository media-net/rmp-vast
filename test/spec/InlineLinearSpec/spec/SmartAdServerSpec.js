import { RmpVast } from '../../../../js/src/index.js';
const ADTAG = 'http://diff.smartadserver.com/ac?siteid=55181&pgid=570478&fmtid=29117&vaf=1&vpaidt=flash&vpaidv=1,2&tgt=vpp%3Dflash%3Bvpv%3Djw6.0%3Brevision%3D115353&oc=1&ps=1&visit=M&out=vast3&vcn=c&ab=1&pgDomain=http%3A%2F%2Fgallery.smartadserver.com%2Fpreroll-midroll-postroll-instream-ad-format&vpw=600&vph=338&tmstp=1491922191941';

describe('Test for Smart Ad Server ad', function () {

  const id = 'rmpPlayer';
  const container = document.getElementById(id);
  const video = document.querySelector('.rmp-video');
  const rmpVast = new RmpVast(id);
  const env = rmpVast.getEnvironment();
  video.muted = true;
  if (env.isAndroid[0]) {
    container.style.width = '320px';
    container.style.height = '180px';
  }
  const title = document.getElementsByTagName('title')[0];

  it('should load adTag and play it', function (done) {
    let validSteps = 0;

    const _incrementAndLog = function (event) {
      validSteps++;
      if (event && event.type) {
        console.log(event.type);
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
      setTimeout(function () {
        rmpVast.stopAds();
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
      let timeupdateCount = 0;
      video.addEventListener('timeupdate', function (e) {
        timeupdateCount++;
        if (timeupdateCount === 5) {
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
