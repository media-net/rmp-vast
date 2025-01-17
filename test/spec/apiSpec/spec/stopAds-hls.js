const ADTAG1 = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-hls-long.xml';

describe('Test for stopAds-hls', function () {

  const id = 'rmp';
  const container = document.getElementById(id);
  const video = document.querySelector('.rmp-video');
  const params = {
    useHlsJS: true,
    debugHlsJS: false
  };
  const rmpVast = new RmpVast(id, params);
  const env = rmpVast.getEnvironment();
  video.muted = true;
  if (env.isAndroid[0]) {
    container.style.width = '320px';
    container.style.height = '180px';
  }

  setTimeout(function () {
    rmpVast.stopAds();
  }, 5000);

  const title = document.getElementsByTagName('title')[0];

  it('should load stopAds-hls', function (done) {
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
    container.addEventListener('adstarted', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adtagstartloading', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adtagloaded', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('addestroyed', function (e) {
      _incrementAndLog(e);
      expect(validSteps).toBe(5);
      if (validSteps === 5) {
        title.textContent = 'Test completed';
      }
      setTimeout(function () {
        done();
      }, 100);
    });

    rmpVast.loadAds(ADTAG1);
  });


});
