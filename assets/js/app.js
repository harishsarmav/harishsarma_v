(() => {
  const html = document.documentElement;
  const body = document.body;
  const nav = document.getElementById('siteNav');
  const themeButton = document.getElementById('themeButton');
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const commandButton = document.getElementById('commandButton');
  const commandPalette = document.getElementById('commandPalette');
  const commandInput = document.getElementById('commandInput');
  const commandResults = document.getElementById('commandResults');
  const progress = document.querySelector('.scroll-progress');
  const cursor = document.querySelector('.cursor-glow');

  const storedTheme = localStorage.getItem('hs-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  html.dataset.theme = storedTheme || (prefersLight ? 'light' : 'dark');

  function updateThemeButton() {
    if (themeButton) themeButton.textContent = html.dataset.theme === 'light' ? '☾' : '☼';
  }
  updateThemeButton();

  themeButton?.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('hs-theme', html.dataset.theme);
    updateThemeButton();
  });

  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 18);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuButton?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  if (cursor && matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('[data-tilt]').forEach(card => {
    if (!matchMedia('(pointer:fine)').matches) return;
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    if (!matchMedia('(pointer:fine)').matches) return;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * .12;
      const y = (e.clientY - (r.top + r.height / 2)) * .12;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });

  const modal = document.getElementById('projectModal');
  const openModal = () => { modal?.classList.add('open'); modal?.setAttribute('aria-hidden', 'false'); body.style.overflow = 'hidden'; };
  const closeModal = () => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden', 'true'); body.style.overflow = ''; };
  document.querySelectorAll('[data-project]').forEach(b => b.addEventListener('click', openModal));
  modal?.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeModal));

  const base = window.HS_BASEURL || '';
  const commands = [
    ['Home', `${base}/`, 'Homepage'], ['About', `${base}/aboutme/`, 'Who I am'], ['Work', `${base}/projects/`, 'Projects & experiments'], ['Notes', `${base}/notes/`, 'Writing & ideas'], ['Gallery', `${base}/gallery/`, 'Life outside code'], ['Contact', `${base}/#contact`, 'Say hello']
  ];
  let commandIndex = 0;
  function renderCommands(query = '') {
    const q = query.toLowerCase();
    const filtered = commands.filter(c => c.join(' ').toLowerCase().includes(q));
    commandResults.innerHTML = filtered.map((c, i) => `<a class="command-result ${i === commandIndex ? 'active' : ''}" href="${c[1]}" data-command-index="${i}"><span>${c[0]}</span><small>${c[2]}</small></a>`).join('') || '<div class="command-result">Nothing found</div>';
  }
  function openCommands() { commandPalette?.classList.add('open'); commandPalette?.setAttribute('aria-hidden','false'); body.style.overflow='hidden'; commandIndex=0; renderCommands(); setTimeout(() => commandInput?.focus(), 40); }
  function closeCommands() { commandPalette?.classList.remove('open'); commandPalette?.setAttribute('aria-hidden','true'); body.style.overflow=''; }
  commandButton?.addEventListener('click', openCommands);
  commandPalette?.querySelector('[data-command-close]')?.addEventListener('click', closeCommands);
  commandInput?.addEventListener('input', e => { commandIndex=0; renderCommands(e.target.value); });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCommands(); }
    if (e.key === 'Escape') { closeCommands(); closeModal(); }
  });

  const time = document.getElementById('localTime');
  const tick = () => { if (time) time.textContent = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()); };
  tick(); setInterval(tick, 30000);

  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.archive-card').forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && !card.dataset.category.split(' ').includes(filter));
      });
    });
  });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) body.classList.add('reduced-motion');
})();
