(function () {
  function initHeroVideo() {
    var hero = document.querySelector('.hero-section');
    if (!hero) return;

    var video = hero.querySelector('[data-hero-scroll-video]');
    if (!video) return;

    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion && prefersReducedMotion.matches) {
      video.pause();
      return;
    }

    var playVideo = function () {
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          video.pause();
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }

    if (prefersReducedMotion && typeof prefersReducedMotion.addEventListener === 'function') {
      prefersReducedMotion.addEventListener('change', function (event) {
        if (event.matches) {
          video.pause();
          return;
        }
        playVideo();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroVideo);
  } else {
    initHeroVideo();
  }
})();
