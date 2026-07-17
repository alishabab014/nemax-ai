// shared footer, loaded on every page
document.currentScript.insertAdjacentHTML('beforebegin', `<style>
  .footer-bottom-bar {
    max-width: 1300px;
    margin: 0 auto;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .footer-bottom-bar .footer-bottom-link,
  .footer-bottom-bar .footer-copyright {
    font-size: 13px;
    color: #8c8c8c;
    text-decoration: none;
  }

  .footer-bottom-bar .footer-bottom-link:hover {
    color: #555555;
  }

  @media (max-width: 968px) {
    .footer-bottom-bar {
      flex-direction: column;
      gap: 10px;
      text-align: center;
      padding: 20px;
    }
  }

  .site-footer {
    position: relative;
    width: 100%;
    background: #f4f4f4;
    padding-bottom: 120px;
    overflow: hidden;
  }

  .footer-cta {
    position: relative;
    width: 100%;
    height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 24px;
    background-color: #f4f4f4;
  }

  .hand-img {
    position: absolute;
    pointer-events: none;
    user-select: none;
    background: transparent;
    mix-blend-mode: multiply;
    opacity: 0.92;
    filter: saturate(1.05) contrast(1.05) brightness(1.02);

    /* Target Mobile WebKit Render Engine Bugs */
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: mix-blend-mode, opacity;
  }

  .hand-left {
    top: 0;
    left: -35px;
    width: 45%;
    max-width: 650px;
    object-fit: contain;
  }

  .hand-right {
    bottom: 0;
    right: -70px;
    width: 42%;
    max-width: 700px;
    object-fit: contain;
  }

  .cta-heading {
    font-family: serif;
    font-size: 16px;
    font-weight: 400;
    color: #111111;
    margin-bottom: 14px;
    z-index: 2;
    max-width: 800px;
    letter-spacing: -0.02em;
    line-height: 1.35;
  }

  .cta-btn {
    display: inline-block;
    background: linear-gradient(77deg, #899fca, #293559);
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    padding: 14px 28px;
    border-radius: 100px;
    text-decoration: none;
    transition: opacity 0.2s ease;
    z-index: 2;
  }

  .cta-btn:hover {
    opacity: 0.85;
  }

  .footer-cta-btn {
    margin-top: 32px;
    background: linear-gradient(77deg, #899fca, #293559);
  }

  @media (max-width: 968px) {
    .footer-cta-btn {
      margin-top: 24px;
    }
  }

  .footer-main {
    max-width: 1300px;
    margin: 0 auto;
    padding: 60px 40px 40px 40px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 80px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 30px;
    padding-bottom: 10px;
  }

  .footer-legal-text {
    font-size: 12px;
    line-height: 1.6;
    color: #8c8c8c;
  }

  .footer-legal-text p {
    margin-bottom: 20px;
    font-size: 10px;
    color: darkgrey;
  }

  .footer-legal-text p:last-child {
    margin-bottom: 0;
  }

  .footer-badges {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 22px;
  }

  .footer-badges img {
    display: block;
    height: 36px;
    width: auto;
    background: transparent;
  }

  .footer-links-col {
    display: flex;
    flex-direction: column;
  }

  .col-title {
    font-size: 16px;
    font-weight: 500;
    color: #8c8c8c;
    margin-bottom: 20px;
  }

  .footer-link {
    font-size: 14px;
    color: #111111;
    text-decoration: none;
    margin-bottom: 18px;
    transition: color 0.2s ease;
  }

    .footer-contact-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 14px;
    color: #111111;
    margin-bottom: 18px;
    text-decoration: none;
  }

  .footer-contact-row svg {
    flex-shrink: 0;
    margin-top: 3px;
  }

  .footer-mail-link:hover {
    color: #555555;
  }

  .footer-link:hover {
    color: #555555;
  }

  .footer-input-wrapper {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 640px;
    padding: 0 20px;
  }

  .input-container {
    width: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 243, 238, 0.96) 100%);
    border: 1px solid rgba(0, 0, 0, 0.09);
    border-radius: 100px;
    padding: 8px 8px 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.9) inset,
      0 18px 44px rgba(0, 0, 0, 0.12),
      0 0 0 10px rgba(255, 255, 255, 0.4);
  }

  .search-input {
    width: 85%;
    border: none;
    outline: none;
    font-size: 14px;
    color: #111111;
    background: transparent;
  }

  .search-input::placeholder {
    color: #8c8c8c;
  }

  .submit-arrow-btn {
    background: linear-gradient(180deg, #fafafa 0%, #e5e1da 100%);
    border: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #444444;
    transition: background 0.2s ease;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }

  .submit-arrow-btn:hover {
    background: #dadada;
  }

  @media (max-width: 968px) {
    .site-footer {
      display: flex;
      flex-direction: column;
    }

    .footer-cta {
      order: 1;
    }

    .footer-input-wrapper {
      order: 2;
    }

    .footer-main {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      order: 3;
      gap: 18px 28px;
      padding-top: 40px;
    }

    .footer-main>.footer-links-col:first-of-type {
      grid-column: 1;
      grid-row: 1;
    }

    .footer-main>.footer-links-col:last-of-type {
      grid-column: 2;
      grid-row: 1;
    }

    .footer-main>.footer-legal-text {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    .footer-badges {
      gap: 10px;
      margin-top: 18px;
    }

    .footer-badges img {
      height: 32px;
    }

    .footer-cta {
      height: 340px;
    }

    .cta-heading {
      font-size: 16px;
      max-width: 300px;
      margin-bottom: 10px;
    }

    .hand-left,
    .hand-right {
      width: 56%;
    }

    .hand-left {
      top: 20px;
      left: -20px;
    }

    .hand-right {
      right: -35px;
    }

    .footer-input-wrapper {
      position: static;
      transform: none;
      left: auto;
      bottom: auto;
      max-width: none;
      padding: 18px 20px 16px;
    }

    .input-container {
      padding: 10px 10px 10px 18px;
    }

    .search-input {
      width: 100%;
    }

    .site-footer {
      padding-bottom: 28px;
    }
  }
</style>
<footer class="site-footer">
  <div class="footer-cta">
    <img src="assets/hand-top-left.webp" alt="Hand Top Left" class="hand-img hand-left">
    <img src="assets/hand-bottom-right.webp" alt="Hand Bottom Right" class="hand-img hand-right">
    <h2 class="no-margin-bottom gradient-revenue">Speed is your only edge</h2>
    <a href="https://calendly.com/nemaxaiofficial/30min" class="cta-btn footer-cta-btn">Let's talk</a>
  </div>
  <div class="footer-main">
    <div class="footer-legal-text">
      <p>Nemax (“Nemax AI”) is an AI-powered platform that helps businesses automate customer interactions across
        phone, email, SMS, WhatsApp, and social channels. Our technology is trained on your business data and operates
        within the parameters you define, meaning the accuracy and effectiveness of Arya directly depend on the quality
        of information and rules you provide.</p>
      <p>We're transparent about how AI works: Arya learns from your configuration, continuously improves through
        interactions, and escalates complex conversations to your team. You maintain full control over how Arya
        represents your business. While we build Arya to be reliable and accurate, like all AI systems, it performs
        best when regularly monitored and refined. We recommend reviewing interactions quarterly and updating your
        knowledge base as your business evolves. By using Nemax AI, you agree to our Terms of Use and Privacy
        Policy.</p>
      <div class="footer-badges" aria-label="Compliance badges">
        <img src="assets/badge-gdpr.BEZxU5Ip_2lfXMF.svg" alt="GDPR compliant badge">
        <img src="assets/badge-pentesting.svg" alt="Data privacy badge">
      </div>
    </div>
    <div class="footer-links-col">
      <span class="col-title">Nemax AI</span>
      <a href="#" class="footer-link">Sign in</a>
      <a href="contact.html" class="footer-link">Contact us</a>
      <a href="#" class="footer-link">Careers</a>
    </div>
    <div class="footer-links-col">
      <span class="col-title">Contact</span>
      <div class="footer-contact-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>UK: 128 City Road, London EC1V 2NX</span></div>
      <div class="footer-contact-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>USA: 30 N Gould St. 55446 Sheridan, WY 8280</span></div>
      <a href="#" data-js-em="1" class="footer-contact-row footer-mail-link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 6L2 7"></path></svg><span data-js-em-text="1"></span></a>
    </div>
  </div>
  <div class="footer-input-wrapper">
    <div class="input-container">
      <input type="text" class="search-input" placeholder="Ask me anything...">
      <button class="submit-arrow-btn" aria-label="Submit query">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </div>
  </div>
  <div class="footer-bottom-bar">
    <a href="privacy-policy.html" class="footer-bottom-link">Privacy Policy</a>
    <span class="footer-copyright">Copyright@Boost Agency Ltd</span>
    <a href="#" class="footer-bottom-link">Terms & Conditions</a>
  </div>
</footer>
`);

// Highlight the current page in the nav
document.addEventListener("DOMContentLoaded", function () {
  var page = window.location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".nav-link[href], .dropdown-link[href]");
  for (var i = 0; i < links.length; i += 1) {
    var href = (links[i].getAttribute("href") || "").split("#")[0];
    if (href === page) {
      links[i].classList.add("w--current");
      links[i].setAttribute("aria-current", "page");
    }
  }
});
// Floating WhatsApp button (site-wide)
document.currentScript.insertAdjacentHTML('beforebegin', `
<style>
  .whatsapp-float {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    z-index: 9999;
    transition: transform 0.2s ease;
  }
  .whatsapp-float:hover { transform: scale(1.08); }
  @media (max-width: 767px) {
    .whatsapp-float { width: 50px; height: 50px; bottom: 18px; right: 18px; }
  }
</style>
<a href="https://wa.me/447365605601"
   target="_blank"
   rel="noopener noreferrer"
   class="whatsapp-float"
   aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 32 32" width="30" height="30" fill="#ffffff">
    <path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.42.678 4.68 1.855 6.605L3 29l7.09-2.31A12.42 12.42 0 0 0 16.001 28C22.895 28 28.5 22.393 28.5 15.5S22.895 3 16.001 3zm0 22.7a10.15 10.15 0 0 1-5.176-1.42l-.371-.22-4.21 1.37 1.39-4.1-.24-.42a10.14 10.14 0 0 1-1.594-5.41c0-5.6 4.56-10.16 10.201-10.16 5.64 0 10.2 4.56 10.2 10.16 0 5.6-4.56 10.2-10.2 10.2zm5.59-7.64c-.306-.153-1.81-.893-2.09-.996-.28-.102-.484-.153-.688.154-.204.306-.79.995-.968 1.2-.178.204-.357.23-.663.077-.306-.153-1.293-.477-2.463-1.522-.91-.812-1.524-1.815-1.703-2.121-.178-.306-.019-.472.134-.624.138-.137.306-.357.459-.535.153-.178.204-.306.306-.51.102-.204.05-.383-.026-.536-.077-.153-.688-1.658-.943-2.27-.248-.596-.5-.516-.688-.526-.178-.008-.383-.01-.586-.01-.204 0-.536.077-.816.383-.28.306-1.07 1.046-1.07 2.55 0 1.505 1.096 2.96 1.249 3.164.153.204 2.157 3.293 5.226 4.618.73.315 1.3.503 1.744.644.733.233 1.4.2 1.927.121.588-.088 1.81-.74 2.065-1.454.255-.715.255-1.327.178-1.454-.077-.128-.28-.204-.586-.357z"/>
  </svg>
</a>
`);
// --- protection layer (runs on every page) ---
(function () {
  // email assembled at runtime so scrapers never see it in the source
  var em = ["cs", "nemaxai", "com"].join("​").replace(/​/, "@").replace(/​/, ".");
  function fill() {
    var links = document.querySelectorAll("[data-js-em]");
    for (var i = 0; i < links.length; i += 1) links[i].setAttribute("href", "mai" + "lto:" + em);
    var texts = document.querySelectorAll("[data-js-em-text]");
    for (var j = 0; j < texts.length; j += 1) texts[j].textContent = em;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fill);
  else fill();

  // no text selection or image dragging (form fields stay usable)
  document.currentScript.insertAdjacentHTML('beforebegin', '<style>body{-webkit-user-select:none;-moz-user-select:none;user-select:none}input,textarea,select{-webkit-user-select:text;-moz-user-select:text;user-select:text}img{-webkit-user-drag:none;user-drag:none}</style>');

  // no right-click
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  // no copy / cut / drag outside form fields
  ["copy", "cut", "dragstart"].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      var t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      e.preventDefault();
    });
  });

  // block view-source / save / devtools shortcuts
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    if (e.keyCode === 123) { e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (k === "u" || k === "s" || k === "p")) e.preventDefault();
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === "i" || k === "j" || k === "c")) e.preventDefault();
  });
})();