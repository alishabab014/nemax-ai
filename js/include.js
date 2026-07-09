// Loads shared partials (includes/header.html, includes/footer.html) into
// <div data-include="..."></div> placeholders. Runs synchronously so the
// injected markup is in the DOM before the Webflow scripts initialize the nav.
(function () {
  var nodes = document.querySelectorAll("[data-include]");
  for (var i = 0; i < nodes.length; i += 1) {
    var el = nodes[i];
    var path = el.getAttribute("data-include");
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", path, false);
      xhr.send(null);
      if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
        el.outerHTML = xhr.responseText;
      }
    } catch (err) {
      // file:// blocks XHR — serve the site over HTTP (any static server)
      if (window.console) console.error("Include failed for " + path + ": " + err.message);
    }
  }

  // Highlight the current page in the injected nav
  var page = window.location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".nav-link[href], .dropdown-link[href]");
  for (var j = 0; j < links.length; j += 1) {
    var href = (links[j].getAttribute("href") || "").split("#")[0];
    if (href === page) {
      links[j].classList.add("w--current");
      links[j].setAttribute("aria-current", "page");
    }
  }
})();
