(function () {
  function formatNumber(value, decimals) {
    decimals = decimals === undefined ? 0 : decimals;
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function initCounters(selector, options) {
    selector = selector || ".counter-count";
    options = options || {};
    var counters = document.querySelectorAll(selector);
    counters.forEach(function (el) {
      if (!el.hasAttribute("data-target")) {
        return;
      }
      var rawTarget = el.getAttribute("data-target") || "0";
      var decimals = Number(el.getAttribute("data-decimals") || "0");
      var target = parseFloat(String(rawTarget).replace(/,/g, "")) || 0;
      var obj = { value: 0 };
      var trigger = {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none"
      };

      gsap.to(obj, {
        value: target,
        duration: options.duration || 2.5,
        ease: options.ease || "power2.out",
        scrollTrigger: trigger,
        onUpdate: function () {
          el.textContent = formatNumber(obj.value, decimals);
        },
        onComplete: function () {
          el.textContent = formatNumber(target, decimals);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCounters();
  });
})();
