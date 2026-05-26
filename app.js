
  /* ── BB8 THEME TOGGLE ── */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');

  const saved = localStorage.getItem('dekris-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);
  // sync checkbox: checked = dark (night scene)
  if (initial === 'dark') themeBtn.checked = true;

  themeBtn.addEventListener('change', () => {
    const next = themeBtn.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('dekris-theme', next);
  });

  /* ── GREETING POPUP ── */
  const popup     = document.getElementById('greetingPopup');
  const closeBtn  = document.getElementById('greetingClose');
  const msgText   = document.getElementById('greetingText');
  const msgTitle  = document.getElementById('greetingTitle');

  const messages = [
    { title: 'DEKRIS Köməkçisi', text: 'Xoş gəlmisiniz! 👋 DEKRIS portalına daxil oldunuz. Sizə necə kömək edə bilərəm?' },
    { title: 'Bilirdinizmi?', text: '📋 DEKRIS vasitəsilə daşınmaz əmlak hüquqlarınızı online qeydiyyatdan keçirə bilərsiniz.' },
    { title: 'Xatırlatma', text: '🔏 Xidmətlərdən istifadə etmək üçün elektron imzanız hazır olmalıdır.' },
    { title: 'Yenilik', text: '📊 "Təhlil və Hesabat" altsistemi ilə dövlət rüsumu hesabatlarını asanlıqla alın.' },
    { title: 'Kömək lazımdır?', text: '📞 Suallarınız üçün çağrı mərkəzimizlə əlaqə saxlayın: 1234' },
    { title: 'Xidmətlər', text: '🏠 Çoxmənzilli yaşayış binaları altsistemi ilə mənzil-tikinti məlumatlarına daxil olun.' },
  ];

  let msgIndex = 0;
  let popupTimer = null;

  function showGreeting() {
    const m = messages[msgIndex % messages.length];
    msgTitle.textContent = m.title;
    msgText.textContent  = m.text;
    popup.classList.add('visible');
    msgIndex++;
    // auto-hide after 6s
    clearTimeout(popupTimer);
    popupTimer = setTimeout(hideGreeting, 6000);
  }

  function hideGreeting() {
    popup.classList.remove('visible');
    clearTimeout(popupTimer);
    // show next message after 10s
    popupTimer = setTimeout(showGreeting, 10000);
  }

  closeBtn.addEventListener('click', hideGreeting);

  // First greeting after 1.5s
  setTimeout(showGreeting, 1500);

  /* ── BURGER MENU ── */
  const burger   = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay  = document.getElementById('overlay');

  function openMenu() {
    burger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Close on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });