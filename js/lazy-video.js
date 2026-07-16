// Loads and plays background videos only once they're about to scroll into
// view. The 4 decorative Webflow background videos on this page previously
// had autoplay set, so the browser started fetching and decoding all of them
// immediately on page load regardless of scroll position - expensive on
// mobile CPUs. Each <video preload="none" data-lazy-src="..."> is left
// showing its poster image (already set as a background-image) until then.
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
