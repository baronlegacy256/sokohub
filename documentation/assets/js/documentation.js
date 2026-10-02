(function () {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('mobileMenuBtn');
  const backToTop = document.getElementById('backToTop');
  const search = document.getElementById('docsSearch');
  const noResults = document.getElementById('noResults');
  const sections = Array.from(document.querySelectorAll('.doc-section'));
  const links = Array.from(document.querySelectorAll('.docs-sidebar a[href^="#"]'));

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    links.forEach(link => link.addEventListener('click', () => sidebar.classList.remove('open')));
  }

  if (backToTop) {
    window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 600));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });
  sections.forEach(section => observer.observe(section));

  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText.trim());
        button.textContent = 'Copied';
        setTimeout(() => button.textContent = 'Copy', 1500);
      } catch {
        button.textContent = 'Select';
      }
    });
    pre.appendChild(button);
  });

  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let visible = 0;
      sections.forEach(section => {
        const haystack = section.innerText.toLowerCase();
        const match = !q || haystack.includes(q);
        section.classList.toggle('hidden-section', !match);
        if (match) visible++;
      });
      links.forEach(link => {
        const target = document.querySelector(link.getAttribute('href'));
        link.style.display = target && !target.classList.contains('hidden-section') ? 'block' : 'none';
      });
      if (noResults) noResults.style.display = visible ? 'none' : 'block';
    });
  }

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.alt = 'Missing screenshot placeholder: ' + (img.getAttribute('src') || '');
    });
  });
})();
