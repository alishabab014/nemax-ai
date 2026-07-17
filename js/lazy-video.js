// lazy-load background videos on scroll instead of autoplaying on load
(function () {
  function activate(video) {
    var src = video.getAttribute("data-lazy-src");
    if (!src) return;
    var source = document.createElement("source");
    source.src = src;
    video.appendChild(source);
    video.removeAttribute("data-lazy-src");
    video.load();
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {});
    }
  }

  function init() {
    var videos = document.querySelectorAll("video[data-lazy-src]");
    if (!videos.length) return;

    if (!("IntersectionObserver" in window)) {
      videos.forEach(activate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "400px 0px" }
    );

    videos.forEach(function (v) {
      observer.observe(v);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
