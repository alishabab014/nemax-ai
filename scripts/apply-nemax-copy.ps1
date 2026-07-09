# Page-specific Nemax AI copy + global fixes (encoding, OG titles, fonts).
$root = Split-Path -Parent $PSScriptRoot
$em = [char]0x2014
$utf8 = New-Object System.Text.UTF8Encoding $false

function Write-Utf8($path, $content) {
    [IO.File]::WriteAllText($path, $content, $utf8)
}

$faqBlock = @"
        <div class="accordion-item" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1c7" style="opacity:0">
          <div class="accordion-heading" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1c8">
            <h3 class="accordion-title">Which channels does Arya cover?</h3>
            <div class="accordion-round"><img alt="Icon" class="accordion-icon" loading="lazy"
                src="https://cdn.prod.website-files.com/692fd4f000a6f446ca91cb33/693a8c6ee4eb9184fb84fc78_icon-37.svg" />
            </div>
          </div>
          <div class="accordion-content">
            <p class="accordion-description">Voice, WhatsApp, Instagram DMs, and email${em}all from one architecture trained on your business rules, pricing, and brand voice.</p>
          </div>
        </div>
        <div class="accordion-item" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1d0" style="opacity:0">
          <div class="accordion-heading" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1d1">
            <h3 class="accordion-title">How fast can we go live?</h3>
            <div class="accordion-round"><img alt="Icon" class="accordion-icon" loading="lazy"
                src="https://cdn.prod.website-files.com/692fd4f000a6f446ca91cb33/693a8c6ee4eb9184fb84fc78_icon-37.svg" />
            </div>
          </div>
          <div class="accordion-content" style="height:0px">
            <p class="accordion-description">Most deployments complete within 48 hours: a 30-minute blueprint session, overnight model training, then edge activation on your existing lines and APIs.</p>
          </div>
        </div>
        <div class="accordion-item" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1d9" style="opacity:0">
          <div class="accordion-heading" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1da">
            <h3 class="accordion-title">What happens when a human needs to step in?</h3>
            <div class="accordion-round"><img alt="Icon" class="accordion-icon" loading="lazy"
                src="https://cdn.prod.website-files.com/692fd4f000a6f446ca91cb33/693a8c6ee4eb9184fb84fc78_icon-37.svg" />
            </div>
          </div>
          <div class="accordion-content" style="height:0px">
            <p class="accordion-description">Arya escalates with a full briefing${em}who they are, sentiment, and exactly what they need${em}so your team never takes a blind transfer.</p>
          </div>
        </div>
        <div class="accordion-item" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1e2" style="opacity:0">
          <div class="accordion-heading" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1e3">
            <h3 class="accordion-title">Do we need to replace our phone system or CRM?</h3>
            <div class="accordion-round"><img alt="Icon" class="accordion-icon" loading="lazy"
                src="https://cdn.prod.website-files.com/692fd4f000a6f446ca91cb33/693a8c6ee4eb9184fb84fc78_icon-37.svg" />
            </div>
          </div>
          <div class="accordion-content" style="height:0px">
            <p class="accordion-description">No. Forward your existing lines, connect your social APIs, and link your CRM. Arya layers over your current stack${em}zero technical legacy required.</p>
          </div>
        </div>
        <div class="accordion-item" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1eb" style="opacity:0">
          <div class="accordion-heading" data-w-id="71824add-8794-612f-5af7-c1ec7fdef1ec">
            <h3 class="accordion-title">Is there a long-term contract?</h3>
            <div class="accordion-round"><img alt="Icon" class="accordion-icon" loading="lazy"
                src="https://cdn.prod.website-files.com/692fd4f000a6f446ca91cb33/693a8c6ee4eb9184fb84fc78_icon-37.svg" />
            </div>
          </div>
          <div class="accordion-content" style="height:0px">
            <p class="accordion-description">Zero contract lock-in. Start with a discovery call, review your staging agent, then activate when you are ready.</p>
          </div>
        </div>
"@

Get-ChildItem -Path $root -Recurse -Filter "*.html" | ForEach-Object {
    if ($_.FullName -like "*\scripts\*") { return }
    $rel = $_.FullName.Substring($root.Length + 1).Replace("\", "/")
    $c = [IO.File]::ReadAllText($_.FullName)

    # Fix mojibake em dashes (UTF-8 em dash misread as Windows-1252)
    $mojibake = [System.Text.Encoding]::GetEncoding(1252).GetString([System.Text.Encoding]::UTF8.GetBytes([char]0x2014))
    $c = $c.Replace($mojibake, $em)

    # OG/twitter duplicate titles
    $c = $c -replace '\| Nemax AI - Nemax AI', "| Nemax AI"
    $c = $c -replace 'property="twitter:title"', 'name="twitter:title"'

    # Google Fonts (match index.html)
    $c = $c -replace '(?s)<script src="https://ajax\.googleapis\.com/ajax/libs/webfont/1\.6\.26/webfont\.js"[^>]*></script>\s*<script[^>]*>WebFont\.load\(\{[^}]*\}\);</script>', '<link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@400;500&amp;family=Google+Sans+Flex:wght@400&amp;display=swap" rel="stylesheet" />'

    Write-Utf8 $_.FullName $c
}

# --- pricing.html ---
$p = Join-Path $root "pricing.html"
if (Test-Path $p) {
    $c = [IO.File]::ReadAllText($p)
    $c = $c -replace 'Pricing plan', 'Enterprise pricing'
    $c = $c -replace 'Clear Plans for\s+everyone', 'Plans built for omnichannel scale'
    $c = $c -replace '<div>Monthly</div>', '<div>Monthly retainer</div>'
    $c = $c -replace '<div>Yearly</div>', '<div>Annual</div>'
    $c = $c -replace '<div class="pricing-title one">Free</div>', '<div class="pricing-title one">Starter</div>'
    $c = $c -replace 'Build habits effortlessly and stay consistent every day\.', 'Single-location voice + messaging for teams getting started with Arya.'
    $c = $c -replace 'Unlimited habit tracking', 'Voice + WhatsApp inbound'
    $c = $c -replace 'Daily reminders', 'Business-hours coverage'
    $c = $c -replace 'Basic streaks &amp; progress', 'CRM handoff summaries'
    $c = $c -replace 'Morning and evening routines', 'English + Urdu/Arabic'
    $c = $c -replace 'Simple progress view', '48-hour deployment'
    $c = $c -replace '<div class="pricing-title two">Pro plan</div>', '<div class="pricing-title two">Growth</div>'
    $c = $c -replace 'Stay consistent with smarter tools that help you track progress\.', 'Multi-channel automation with analytics for scaling operations.'
    $c = $c -replace 'Advanced habit insights', 'Voice, WhatsApp, Instagram, Email'
    $c = $c -replace 'Weekly progress reports', 'Sub-2s response latency'
    $c = $c -replace 'Focus &amp; time blocks', 'Custom workflows &amp; routing'
    $c = $c -replace 'Custom reminders', 'Dedicated success manager'
    $c = $c -replace '<div class="pricing-title three">Premium plan</div>', '<div class="pricing-title three">Enterprise</div>'
    $c = $c -replace 'Transform habits long-term with personalized insights\.', 'Custom-trained Arya for complex estates, high volume, and compliance needs.'
    $c = $c -replace 'Personalized habit insights', 'Unlimited channels &amp; locations'
    $c = $c -replace 'Unlimited routines &amp; stacks', 'SLA-backed uptime'
    $c = $c -replace 'Priority support', 'White-glove onboarding'
    $c = $c -replace 'Early access to new features', 'API &amp; legacy system integration'
    $c = $c -replace 'Get started', 'Book a call'
    $c = $c -replace '<h4 class="pricing-info-title">Free plan</h4>', '<h4 class="pricing-info-title">Starter</h4>'
    $c = $c -replace '<h5 class="pricing-info-title">Pro plan</h5>', '<h5 class="pricing-info-title">Growth</h5>'
    $c = $c -replace '<h5 class="pricing-info-title">Premium plan</h5>', '<h5 class="pricing-info-title">Enterprise</h5>'
    $c = $c -replace '<h6 class="pricing-count">\$0</h6>', '<h6 class="pricing-count">Custom</h6>'
    $c = $c -replace '<h6 class="pricing-count">\$20/month</h6>', '<h6 class="pricing-count">Custom</h6>'
    $c = $c -replace '<h6 class="pricing-count">\$150/month</h6>', '<h6 class="pricing-count">Custom</h6>'
    $c = $c -replace 'Habit tracking', 'Omnichannel coverage'
    $c = $c -replace 'Daily reminders', 'Bilingual EN / Urdu-Arabic'
    $c = $c -replace 'Focus &amp; time blocks', 'Human escalation briefings'
    $c = $c -replace 'Custom reminders', 'CRM &amp; calendar sync'
    $c = $c -replace 'Priority support', 'Dedicated success manager'
    $c = $c -replace 'Is there a free plan\?', 'Which channels does Arya cover?'
    $c = $c -replace 'Yes, Nemax AI offers a free plan with essential features so you can start\s+building habits without any cost\.', "Voice, WhatsApp, Instagram DMs, and email${em}all trained on your business rules, pricing, and brand voice."
    $c = $c -replace 'What’s included in the Pro plan\?', 'How fast can we go live?'
    $c = $c -replace 'The Pro plan includes advanced insights, focus tools, custom reminders, and\s+detailed progress reports\.', 'Most deployments complete within 48 hours: blueprint session, overnight training, then edge activation on your existing lines and APIs.'
    $c = $c -replace 'How does yearly billing work\?', 'What happens when a human needs to step in?'
    $c = $c -replace 'Yearly billing offers the same features as monthly plans at a discounted\s+price, helping you save more over time\.', "Arya escalates with a full briefing${em}who they are, sentiment, and exactly what they need${em}so your team never takes a blind transfer."
    $c = $c -replace 'Is my payment information secure\?', 'Is there a long-term contract?'
    $c = $c -replace 'Absolutely\. All payments are processed through secure, encrypted payment\s+gateways\.', 'Zero contract lock-in. Start with a discovery call, review your staging agent, then activate when you are ready.'
    Write-Utf8 $p $c
    Write-Host "Updated pricing.html"
}

# --- contact.html ---
$p = Join-Path $root "contact.html"
if (Test-Path $p) {
    $c = [IO.File]::ReadAllText($p)
    $c = $c -replace 'Contact Us', 'Book a discovery call'
    $c = $c -replace "We're here to\s+help", 'Request your discovery call'
    $c = $c -replace 'If you\s+have questions, feedback, or need support, reach out, and we’ll get back to you as soon as we can\.', 'Tell us about your channels, call volume, and stack. We will map a 48-hour Arya deployment and send a tailored walkthrough.'
    $c = $c -replace 'Your name\*', 'Full name*'
    $c = $c -replace 'placeholder="Dennis Barrett"', 'placeholder="Your name"'
    $c = $c -replace 'Subject', 'Company'
    $c = $c -replace 'placeholder="Topic of your request"', 'placeholder="Company or brand"'
    $c = $c -replace 'placeholder="dannis@example.com"', 'placeholder="you@company.com"'
    $c = $c -replace 'placeholder="Write your message"', 'placeholder="Channels (voice, WhatsApp, IG, email), locations, and goals"'
    $c = $c -replace 'value="Send message"', 'value="Request discovery call"'
    $c = $c -replace 'Reach us directly', 'Talk to our team'
    $c = $c -replace 'Support Email', 'General inquiries'
    $c = $c -replace 'Business / Partnerships', 'Enterprise &amp; partnerships'
    Write-Utf8 $p $c
    Write-Host "Updated contact.html"
}

# --- about.html (skip animated word blocks on index only) ---
$p = Join-Path $root "about.html"
if (Test-Path $p) {
    $c = [IO.File]::ReadAllText($p)
    $c = $c -replace 'About the App', 'About Nemax AI'
    $c = $c -replace 'A simpler way to\s+build habits', 'Engineering zero missed opportunities'
    $c = $c -replace 'Download the app', 'Book a discovery call'
    $c = $c -replace 'Trusted by worldwide', 'Trusted by forward-thinking brands'
    $c = $c -replace 'Most habit tools\s+focus on streaks and guilt\.', 'Most AI vendors sell generic chatbots.'
    $c = $c -replace 'We built Nemax AI around a different idea: progress should feel natural, not forced\. Your\s+habits shift as your day shifts, and the app supports those changes instead of punishing them\. We focus on\s+small wins, flexible routines, and insights that actually help you improve—not just check boxes\.', "We built Nemax AI around Arya${em}a custom-trained receptionist that answers every call, DM, and email in under two seconds. Deployed in 48 hours on your existing lines and APIs, with bilingual EN and Urdu/Arabic and seamless human handoff when it matters."
    $c = $c -replace 'Focuses on small, doable actions that build real habits\.', 'Sub-2s latency across voice and messaging channels.'
    $c = $c -replace 'Building habits\s+should feel simple', 'Deploying AI should feel effortless'
    $c = $c -replace 'Real habits,\s+real progress', 'Real conversations, real revenue'
    $c = $c -replace 'Regular habits are completed each month\.', 'Inbound conversations handled without a missed lead.'
    $c = $c -replace 'Build better habits with less effort', 'Never miss another opportunity'
    Write-Utf8 $p $c
    Write-Host "Updated about.html"
}

# --- privacy-policy.html ---
$p = Join-Path $root "privacy-policy.html"
if (Test-Path $p) {
    $c = [IO.File]::ReadAllText($p)
    $c = $c -replace 'habit-tracking\s+experience', 'omnichannel AI receptionist service'
    $c = $c -replace 'Habits, routines, streaks, and completion activity', 'Call logs, message transcripts, and conversation metadata needed to operate Arya'
    $c = $c -replace 'creating an account and data generated while using the app', 'booking a discovery call, deploying Arya, and using our voice and messaging channels'
    $c = $c -replace 'improve functionality, insights, and overall usability', 'operate, secure, and improve the Nemax AI platform'
    Write-Utf8 $p $c
    Write-Host "Updated privacy-policy.html"
}

# --- faqs.html: replace FAQ list ---
$p = Join-Path $root "faqs.html"
if (Test-Path $p) {
    $c = [IO.File]::ReadAllText($p)
    $c = $c -replace '(?s)(<div class="faqs-right">).*?(</div>\s*</div>\s*</section>)', "`$1`r`n$faqBlock`r`n      `$2"
    Write-Utf8 $p $c
    Write-Host "Updated faqs.html"
}

# --- download + waitlist ---
foreach ($name in @("download.html", "waitlist.html")) {
    $p = Join-Path $root $name
    if (-not (Test-Path $p)) { continue }
    $c = [IO.File]::ReadAllText($p)
    $c = $c -replace 'Download the app', 'Book a discovery call'
    $c = $c -replace 'Download Nemax AI', 'Deploy Arya with Nemax AI'
    $c = $c -replace 'Get the app', 'Request a discovery call'
    $c = $c -replace 'Join the waitlist', 'Book your discovery call'
    $c = $c -replace 'habit', 'conversation'
    $c = $c -replace 'conversation-tracking', 'AI receptionist'
    $c = $c -replace 'conversation building', 'voice agent deployment'
    Write-Utf8 $p $c
    Write-Host "Updated $name"
}

# --- 404 / support pages ---
foreach ($name in @("hello@habitline.app.html", "support@habitline.app.html")) {
    $p = Join-Path $root $name
    if (-not (Test-Path $p)) { continue }
    $c = [IO.File]::ReadAllText($p)
    $c = $c -replace 'Page not found', 'Page not found'
    $c = $c -replace 'The page you are looking for doesn.t exist or has been moved\.', 'The page you are looking for does not exist. Head to our homepage or book a discovery call.'
    $c = $c -replace 'Go back home', 'Back to Nemax AI'
    Write-Utf8 $p $c
    Write-Host "Updated $name"
}

Write-Host "Copy pass complete."
