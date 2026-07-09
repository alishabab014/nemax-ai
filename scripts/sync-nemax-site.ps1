# Sync Nemax AI branding, local scripts, nav, and footer across all HTML pages.
$root = Split-Path -Parent $PSScriptRoot
$em = [char]0x2014
$metaDesc = "Nemax AI deploys custom AI voice receptionists and conversational agents that answer every call, message, and DM instantly. 24/7 omnichannel automation across Voice, WhatsApp, Instagram, and Email. Zero missed revenue."

$pageTitles = @{
    "index.html" = "Nemax AI ${em} Omnichannel AI Voice Agents & Receptionists"
    "contact.html" = "Contact ${em} Nemax AI"
    "pricing.html" = "Pricing ${em} Nemax AI"
    "about.html" = "About ${em} Nemax AI"
    "faqs.html" = "FAQs ${em} Nemax AI"
    "privacy-policy.html" = "Privacy Policy ${em} Nemax AI"
    "download.html" = "Book a Discovery Call ${em} Nemax AI"
    "waitlist.html" = "Discovery Call ${em} Nemax AI"
    "hello@habitline.app.html" = "Contact ${em} Nemax AI"
    "support@habitline.app.html" = "Support ${em} Nemax AI"
    "utility-pages\licenses.html" = "Licenses ${em} Nemax AI"
    "utility-pages\style-guide.html" = "Style Guide ${em} Nemax AI"
    "utility-pages\changelog.html" = "Changelog ${em} Nemax AI"
    "utility-pages\instructions.html" = "Instructions ${em} Nemax AI"
}

$localScripts = @"
  <script src="{0}jquery-3.5.1.min.js" type="text/javascript"></script>
  <script src="{0}webflow.schunk.36b8fb49256177c8.js" type="text/javascript"></script>
  <script src="{0}webflow.schunk.86b9a003c3056a82.js" type="text/javascript"></script>
  <script src="{0}webflow.5374edf3.ea838bf672ce0d9c.js" type="text/javascript"></script>
  <script src="{0}gsap.min.js" type="text/javascript"></script>
  <script src="{0}ScrollTrigger.min.js" type="text/javascript"></script>
  <script type="text/javascript">gsap.registerPlugin(ScrollTrigger);</script>
  <script src="{0}counters.js" type="text/javascript"></script>
"@

$subscribeBlock = @"
          <div class="subscribe-wrap">
            <h2 class="subscribe-title">Nemax AI ${em} Built for enterprise scale, engineered for zero missed opportunities.</h2>
            <p class="subscribe-description">Deploy Arya across voice, messaging, and email. Live in 48 hours.</p>
            <div class="form-subscribe-wrap w-form">
              <form class="form-subscribe" data-name="Subscribe Form"
                id="wf-form-Subscribe-Form" method="get" name="wf-form-Subscribe-Form"><input
                  class="form-input form-input-subscribe w-input" data-name="Email" id="Email" maxlength="256"
                  name="Email" placeholder="Work email" required="" type="email" /><input
                  class="submit-button w-button" data-wait="Please wait..." type="submit" value="Book a call" /></form>
              <div class="success-message w-form-done">
                <div>Your form has been submitted successfully. Thank you!</div>
              </div>
              <div class="error-message w-form-fail">
                <div>Please double-check your information and try again. If the issue continues, reach us at hello@nemaxai.com</div>
              </div>
            </div>
          </div>
"@

$footerNavBlock = @"
          <div class="footer-item" data-w-id="b8ca1326-3f00-dfb9-b075-5e8e9c5ee7d9">
            <h2 class="footer-title">Navigation</h2>
            <div class="w-layout-grid grid-footer-link">
              <div class="footer-links"><a class="footer-link" href="/#features">Product</a><a
                  class="footer-link" href="/#usecase">How it works</a><a class="footer-link" href="/pricing">Pricing</a>
              </div>
              <div class="footer-links"><a class="footer-link" href="/contact">Book a call</a><a class="footer-link"
                  href="/contact">Contact</a><a class="footer-link" href="/privacy-policy">Privacy Policy</a></div>
            </div>
          </div>
"@

$copyright = "Nemax AI ${em} Built for enterprise scale, engineered for zero missed opportunities."

Get-ChildItem -Path $root -Recurse -Filter "*.html" | ForEach-Object {
    $rel = $_.FullName.Substring($root.Length + 1).Replace("\", "/")
    if ($rel -like "scripts/*") { return }
    $prefix = if ($rel -like "utility-pages/*") { "../js/" } else { "js/" }
    $content = [IO.File]::ReadAllText($_.FullName)

    $content = $content -replace '<!-- This site was created in Webflow\.[^>]*-->', '<!-- Nemax AI — static site export -->'
    $content = $content -replace 'habitline-wbs\.webflow\.io', 'nemaxai.com'

    $content = $content -replace '(?s)<script src="https://ajax\.googleapis\.com/ajax/libs/webfont/1\.6\.26/webfont\.js"[^>]*></script>\s*<script[^>]*>WebFont\.load\(\{[^}]*\}\);</script>', '<link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@400;500&amp;family=Google+Sans+Flex:wght@400&amp;display=swap" rel="stylesheet" />'

    $content = $content -replace 'Launch your health or wellness app faster with this modern Framer template designed for startups and digital health platforms\.', $metaDesc

    if ($pageTitles.ContainsKey($rel)) {
        $t = [regex]::Escape($pageTitles[$rel])
        $content = $content -replace '<title>[^<]*</title>', "<title>$($pageTitles[$rel])</title>"
    }

    if ($prefix -eq "../") {
        $content = $content -replace 'href="css/main\.css"', 'href="../css/main.css"'
    }

    $content = $content -replace 'href="/#features">Features</a>', 'href="/#features">Product</a>'
    $content = $content -replace 'href="/#usecase">Usecase</a>', 'href="/#usecase">How it works</a>'
    $content = $content -replace 'href="/#metrics">Metrics</a><a class="nav-link w-nav-link" href="/#smart-assist">Smart Assist</a>', 'href="/pricing">Pricing</a><a class="nav-link w-nav-link" href="/contact">Book a call</a>'
    $content = $content -replace 'href="#">Features</a><a\s+class="nav-link w-nav-link" href="#">Usecase</a><a class="nav-link w-nav-link" href="#">Metrics</a><a class="nav-link w-nav-link" href="#">Smart Assist</a>', 'href="/#features">Product</a><a class="nav-link w-nav-link" href="/#usecase">How it works</a><a class="nav-link w-nav-link" href="/pricing">Pricing</a><a class="nav-link w-nav-link" href="/contact">Book a call</a>'

    $content = $content -replace 'href="https://www\.apple\.com/in/app-store/"[^>]*>', 'href="/contact">'
    $content = $content -replace 'href="https://play\.google\.com/store[^"]*"[^>]*>', 'href="/contact">'
    $content = $content -replace '<img alt="Logo" class="logo"', '<img alt="Nemax AI Logo" class="logo"'
    $content = $content -replace 'support@habitline\.app', 'hello@nemaxai.com'
    $content = $content -replace 'hello@habitline\.app', 'hello@nemaxai.com'
    $content = $content -replace 'support@yourdomain\.com', 'hello@nemaxai.com'
    $content = $content -replace 'Habitline', 'Nemax AI'
    $content = $content -replace 'Webflow HTML website template', 'Nemax AI'

    $content = $content -replace '(?s)<div class="subscribe-wrap">.*?</div>\s*</div>\s*</div>\s*<div class="w-layout-grid footer-right">', ($subscribeBlock + "`r`n        </div>`r`n        <div class=`"w-layout-grid footer-right`">")
    $content = $content -replace '(?s)<div class="footer-item" data-w-id="b8ca1326-3f00-dfb9-b075-5e8e9c5ee7d9">.*?</div>\s*<div class="footer-item" data-w-id="c3c71fa1', ($footerNavBlock + "`r`n          <div class=`"footer-item`" data-w-id=`"c3c71fa1")
    $content = $content -replace '(?s)<p class="footer-copyright">Designed by.*?</p>', "<p class=`"footer-copyright`">$copyright</p>"
    $content = $content -replace '(?s)<a class="more-templates w-inline-block"[^>]*>.*?</a>\s*', ''

    $scriptBlock = $localScripts -f $prefix
    if ($content -match '(?s)<script[^>]*jquery') {
        $content = $content -replace '(?s)\s*<script(?:\s+crossorigin="anonymous")?[^>]*jquery[^>]*>.*?</body>', ("`r`n$scriptBlock`r`n</body>")
    }

    $content = $content -replace 'How many habits can I track\?', 'Which channels does Arya cover?'
    $content = $content -replace 'You can track unlimited habits, giving you complete freedom to create and\s+organize\.', 'Arya covers Voice, WhatsApp, Instagram DMs, and email—all trained on your business rules, pricing, and brand voice.'
    $content = $content -replace 'Do reminders work across all devices\?', 'How fast can we go live?'
    $content = $content -replace 'Yes\. Your reminders sync automatically and trigger on any device where\s+Nemax AI is installed\.', 'Most deployments complete within 48 hours: blueprint session, overnight training, then edge activation on your existing lines and APIs.'
    $content = $content -replace 'What happens if I miss a day\?', 'What happens when a human needs to step in?'
    $content = $content -replace 'If you miss a day, nothing drastic happens your progress is still saved,\s+and you can pick up right where you left off\.', 'Arya escalates with a full briefing—who they are, sentiment, and exactly what they need—so your team never takes a blind transfer.'
    $content = $content -replace 'Can I create routines for different times of day\?', 'Do we need to replace our phone system or CRM?'
    $content = $content -replace 'Yes, you can create routines for different times of the day\. Organize (?:your\s+)?habits into morning\.', 'No. Forward your existing lines, connect your social APIs, and link your CRM. Arya layers over your current stack.'
    $content = $content -replace 'Is Nemax AI free to use\?', 'Is there a long-term contract?'
    $content = $content -replace 'Nemax AI is free to use with essential features available at no cost\. You(?:\s+can track habits, create routines|\s+can track habits, create routines\.)', 'Zero contract lock-in. Start with a discovery call, review your staging agent, then activate when you are ready.'

    [IO.File]::WriteAllText($_.FullName, $content)
    Write-Host "Updated: $rel"
}

Write-Host "Done."
