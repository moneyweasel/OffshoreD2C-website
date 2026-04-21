/* ============================================================
   NG Funds — Investor Classification Gate
   FCA COBS 3.5 compliant — retail / professional categorisation
   Session-only: gate re-appears every browser session
   ============================================================ */

(function () {
  'use strict';

  var SESSION_KEY = 'ng_investor_class';

  /* ---- Check session ---- */
  var stored = sessionStorage.getItem(SESSION_KEY);
  if (stored === 'retail' || stored === 'professional') {
    applyClassification(stored, false);
    return;
  }

  /* ---- Build gate overlay ---- */
  var overlay = document.createElement('div');
  overlay.id = 'gate-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Investor classification');

  overlay.innerHTML = [
    '<div class="gate-card">',

      /* Header */
      '<div class="gate-header">',
        '<div class="gate-logo">',
          '<span class="logo-mark">NG</span>',
          '<span class="logo-text">NG Funds</span>',
        '</div>',
        '<p class="gate-pre">Important — please read before proceeding</p>',
      '</div>',

      /* Screens container */
      '<div class="gate-screens">',

        /* ---- Screen 1: Jurisdiction & classification choice ---- */
        '<div class="gate-screen active" id="gate-screen-1">',
          '<h2>Who is this website for?</h2>',
          '<p class="gate-lead">This website is operated by NG Funds and is <strong>primarily directed at offshore expatriate investors</strong> who are permitted to access financial products listed on the London Stock Exchange under the laws of their jurisdiction of residence.</p>',
          '<p class="gate-lead">This website is accessible to UK investors and complies with FCA financial promotions rules. However, the D2C access route described here — via Interactive Brokers — results in a <strong>General Investment Account (GIA) with no tax wrapper</strong>. UK-resident investors should consider whether their ISA or SIPP allowances are better utilised first, or access the fund through a UK platform that supports tax-efficient wrappers.</p>',
          '<p class="gate-lead"><strong>This website is not directed at US Persons</strong> as defined under the US Securities Act of 1933, or at residents of jurisdictions where access to this information is prohibited by local law.</p>',
          '<div class="gate-warn">',
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
            '<span>The NG Tactical Growth Portfolio (WTHR) is a financial instrument. The value of your investment can go down as well as up and you may receive back less than you invest.</span>',
          '</div>',
          '<p class="gate-classify-label">Please confirm your investor classification to proceed:</p>',
          '<div class="gate-choices">',
            '<button class="gate-choice" id="choice-retail">',
              '<div class="gate-choice__icon">',
                '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
              '</div>',
              '<div class="gate-choice__text">',
                '<span class="gate-choice__title">Retail Investor</span>',
                '<span class="gate-choice__sub">I am an individual investor. I require standard regulatory protection under FCA rules.</span>',
              '</div>',
              '<svg class="gate-choice__arrow" viewBox="0 0 20 20" fill="none"><path d="M7 10h6M10 7l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            '</button>',
            '<button class="gate-choice" id="choice-professional">',
              '<div class="gate-choice__icon gate-choice__icon--pro">',
                '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 6V5a4 4 0 018 0v1" stroke="currentColor" stroke-width="1.5"/><path d="M12 13v-2M12 13a1 1 0 100 2 1 1 0 000-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
              '</div>',
              '<div class="gate-choice__text">',
                '<span class="gate-choice__title">Professional Investor</span>',
                '<span class="gate-choice__sub">I meet the FCA COBS 3.5 criteria for professional client classification. I have the knowledge, experience and financial resources to assess investment risks independently.</span>',
              '</div>',
              '<svg class="gate-choice__arrow" viewBox="0 0 20 20" fill="none"><path d="M7 10h6M10 7l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            '</button>',
          '</div>',
          '<p class="gate-footer-note">If you are unsure of your classification, please select Retail Investor or seek independent financial advice before proceeding.</p>',
        '</div>',

        /* ---- Screen 2a: Retail acknowledgements ---- */
        '<div class="gate-screen" id="gate-screen-retail">',
          '<button class="gate-back" id="back-retail">← Back</button>',
          '<div class="gate-category-badge gate-category-badge--retail">Retail Investor</div>',
          '<h2>Risk acknowledgements</h2>',
          '<p class="gate-lead">Please read and confirm each of the following before accessing this website. All boxes must be ticked to proceed.</p>',
          '<div class="gate-checks" id="retail-checks">',
            '<label class="gate-check"><input type="checkbox" data-check="r1"><span>I understand that the NG Tactical Growth Portfolio is a financial instrument and that the value of my investment can <strong>go down as well as up</strong>. I may receive back less than I invest.</span></label>',
            '<label class="gate-check"><input type="checkbox" data-check="r2"><span>I understand that <strong>past performance and backtested data are not reliable indicators of future results</strong>. The performance figures shown on this website are simulated and do not represent actual trading outcomes.</span></label>',
            '<label class="gate-check"><input type="checkbox" data-check="r3"><span>I understand that this website <strong>does not constitute financial advice</strong>. NG Funds does not assess whether this product is suitable for my individual circumstances. If I am unsure, I will seek independent regulated financial advice before investing.</span></label>',
            '<label class="gate-check"><input type="checkbox" data-check="r4"><span>I understand that investing through Interactive Brokers results in a <strong>General Investment Account (GIA) with no tax wrapper</strong>. If I am UK-resident with unused ISA or SIPP allowances, I should consider a tax-efficient wrapper before using a GIA. I am responsible for my own tax position under the laws of my jurisdiction of residence.</span></label>',
            '<label class="gate-check"><input type="checkbox" data-check="r5"><span>I confirm that I am <strong>not a US Person</strong> as defined under the US Securities Act of 1933 and that I am permitted to access this information under the laws of my jurisdiction.</span></label>',
          '</div>',
          '<button class="gate-proceed" id="proceed-retail" disabled>',
            'Continue as Retail Investor',
            '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M13 7l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          '</button>',
          '<p class="gate-footer-note">You will see this confirmation every session. Your classification is not stored permanently.</p>',
        '</div>',

        /* ---- Screen 2b: Professional classification ---- */
        '<div class="gate-screen" id="gate-screen-professional">',
          '<button class="gate-back" id="back-professional">← Back</button>',
          '<div class="gate-category-badge gate-category-badge--pro">Professional Investor</div>',
          '<h2>Professional client classification</h2>',
          '<p class="gate-lead">Under FCA COBS 3.5, to be treated as a professional client on an elective basis, you must meet <strong>at least two</strong> of the three quantitative criteria below, or qualify as a per se professional client.</p>',

          '<div class="gate-criteria-group">',
            '<p class="gate-criteria-label">Elective Professional — please confirm at least two of:</p>',
            '<div class="gate-checks" id="pro-criteria">',
              '<label class="gate-check"><input type="checkbox" data-check="p1" data-criteria="true"><span>I have carried out transactions of <strong>significant size on financial markets at an average frequency of at least 10 per quarter</strong> over the previous four quarters.</span></label>',
              '<label class="gate-check"><input type="checkbox" data-check="p2" data-criteria="true"><span>The size of my <strong>financial instrument portfolio (including cash deposits) exceeds €500,000</strong> (or currency equivalent).</span></label>',
              '<label class="gate-check"><input type="checkbox" data-check="p3" data-criteria="true"><span>I work or have worked in the financial sector for <strong>at least one year in a professional position</strong> which requires knowledge of the transactions or services envisaged.</span></label>',
            '</div>',
          '</div>',

          '<div class="gate-criteria-group">',
            '<p class="gate-criteria-label">OR — Per se Professional (FCA COBS 3.5.2):</p>',
            '<div class="gate-checks">',
              '<label class="gate-check"><input type="checkbox" data-check="p4" data-perse="true"><span>I am acting as or on behalf of an authorised firm, credit institution, insurance company, collective investment scheme, pension fund, national/regional government or other per se professional entity as defined under FCA COBS 3.5.2.</span></label>',
            '</div>',
          '</div>',

          '<div class="gate-divider"></div>',

          '<p class="gate-criteria-label">All applicants must also confirm:</p>',
          '<div class="gate-checks" id="pro-confirms">',
            '<label class="gate-check"><input type="checkbox" data-check="p5"><span>I <strong>request to be treated as a Professional Investor</strong> for the purposes of accessing this website and I understand this means I will receive a <strong>lower level of regulatory protection</strong> than I would as a retail client.</span></label>',
            '<label class="gate-check"><input type="checkbox" data-check="p6"><span>I understand that past performance and backtested data are <strong>not reliable indicators of future results</strong>, that the value of investments can fall as well as rise, and that this website does not constitute financial advice.</span></label>',
            '<label class="gate-check"><input type="checkbox" data-check="p7"><span>I confirm I am <strong>not a US Person</strong> and that I am permitted to access this information under the laws of my jurisdiction.</span></label>',
          '</div>',

          '<div class="gate-pro-error" id="pro-criteria-error" hidden>',
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
            'You must confirm at least two of the elective criteria above, or confirm per se professional status.',
          '</div>',

          '<button class="gate-proceed gate-proceed--pro" id="proceed-professional" disabled>',
            'Continue as Professional Investor',
            '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M13 7l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          '</button>',
          '<p class="gate-footer-note">NG Funds reserves the right to revert any client classification at its discretion. This classification is session-only and is not stored permanently.</p>',
        '</div>',

      '</div>', /* /gate-screens */
    '</div>'  /* /gate-card */
  ].join('');

  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.classList.add('gated');

  /* ---- Navigation between screens ---- */
  function showScreen(id) {
    document.querySelectorAll('.gate-screen').forEach(function (s) {
      s.classList.remove('active');
    });
    var target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }
  }

  document.getElementById('choice-retail').addEventListener('click', function () {
    showScreen('gate-screen-retail');
  });

  document.getElementById('choice-professional').addEventListener('click', function () {
    showScreen('gate-screen-professional');
  });

  document.getElementById('back-retail').addEventListener('click', function () {
    showScreen('gate-screen-1');
  });

  document.getElementById('back-professional').addEventListener('click', function () {
    showScreen('gate-screen-1');
    document.getElementById('pro-criteria-error').hidden = true;
  });

  /* ---- Retail checkbox logic ---- */
  var retailChecks = document.querySelectorAll('#retail-checks input[type="checkbox"]');
  var proceedRetail = document.getElementById('proceed-retail');

  function updateRetailBtn() {
    var allChecked = Array.from(retailChecks).every(function (cb) { return cb.checked; });
    proceedRetail.disabled = !allChecked;
  }

  retailChecks.forEach(function (cb) {
    cb.addEventListener('change', updateRetailBtn);
  });

  proceedRetail.addEventListener('click', function () {
    sessionStorage.setItem(SESSION_KEY, 'retail');
    closeGate('retail');
  });

  /* ---- Professional checkbox logic ---- */
  var proChecks = document.querySelectorAll('#gate-screen-professional input[type="checkbox"]');
  var proceedPro = document.getElementById('proceed-professional');
  var proError   = document.getElementById('pro-criteria-error');

  function updateProBtn() {
    var criteriaChecked = Array.from(
      document.querySelectorAll('[data-criteria]')
    ).filter(function (cb) { return cb.checked; }).length;

    var perseChecked = document.querySelector('[data-perse]').checked;
    var qualifies    = criteriaChecked >= 2 || perseChecked;

    var p5 = document.querySelector('[data-check="p5"]').checked;
    var p6 = document.querySelector('[data-check="p6"]').checked;
    var p7 = document.querySelector('[data-check="p7"]').checked;

    proceedPro.disabled = !(qualifies && p5 && p6 && p7);
    proError.hidden     = !(p5 && p6 && p7 && !qualifies);
  }

  proChecks.forEach(function (cb) {
    cb.addEventListener('change', updateProBtn);
  });

  proceedPro.addEventListener('click', function () {
    sessionStorage.setItem(SESSION_KEY, 'professional');
    closeGate('professional');
  });

  /* ---- Close gate & apply classification ---- */
  function closeGate(classification) {
    overlay.classList.add('gate-exit');
    setTimeout(function () {
      overlay.remove();
      document.body.classList.remove('gated');
      applyClassification(classification, true);
    }, 400);
  }

  /* ---- Apply classification to page ---- */
  function applyClassification(classification, announce) {
    document.body.setAttribute('data-investor', classification);

    if (classification === 'retail') {
      injectRetailBanner();
    } else {
      injectProBanner();
    }
  }

  function injectRetailBanner() {
    var bar = document.createElement('div');
    bar.id = 'investor-bar';
    bar.className = 'investor-bar investor-bar--retail';
    bar.innerHTML = [
      '<div class="container investor-bar__inner">',
        '<div class="investor-bar__left">',
          '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
          '<span><strong>Retail Investor.</strong> The value of investments can go down as well as up. Past performance is not a reliable indicator of future results. This is not financial advice.</span>',
        '</div>',
        '<button class="investor-bar__reclassify" id="reclassify-btn">Change classification</button>',
      '</div>'
    ].join('');
    document.body.insertBefore(bar, document.body.firstChild);
    adjustNavForBar();

    document.getElementById('reclassify-btn').addEventListener('click', function () {
      sessionStorage.removeItem(SESSION_KEY);
      location.reload();
    });
  }

  function injectProBanner() {
    var bar = document.createElement('div');
    bar.id = 'investor-bar';
    bar.className = 'investor-bar investor-bar--pro';
    bar.innerHTML = [
      '<div class="container investor-bar__inner">',
        '<div class="investor-bar__left">',
          '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8l2 2 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          '<span><strong>Professional Investor.</strong> You are viewing this website as a professional investor. Reduced regulatory protection applies.</span>',
        '</div>',
        '<button class="investor-bar__reclassify" id="reclassify-btn">Change classification</button>',
      '</div>'
    ].join('');
    document.body.insertBefore(bar, document.body.firstChild);
    adjustNavForBar();

    document.getElementById('reclassify-btn').addEventListener('click', function () {
      sessionStorage.removeItem(SESSION_KEY);
      location.reload();
    });
  }

  function adjustNavForBar() {
    var nav = document.getElementById('nav');
    if (nav) { nav.style.top = '36px'; }
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.style.paddingTop = 'calc(var(--nav-h) + 36px + 96px)';
    }
  }

})();
