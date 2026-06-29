    // NAVABR SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // SCROLL REVEAL
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    // COUNTER ANIMATION
    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(ease * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(update);
    }

    const counterEls = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    counterEls.forEach(el => counterObserver.observe(el));

    // for the floating card
    const floatCounter = document.querySelector('.sd-float-card .num');
    if (floatCounter) {
      const fcObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const target = parseInt(floatCounter.dataset.count, 10);
          const suffix = floatCounter.dataset.suffix || '';
          let start = null;
          function tick(ts) {
            if (!start) start = ts;
            const prog = Math.min((ts - start) / 1500, 1);
            const ease = 1 - Math.pow(1 - prog, 3);
            floatCounter.textContent = Math.floor(ease * target).toLocaleString() + suffix;
            if (prog < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          fcObs.disconnect();
        }
      }, { threshold: 0.4 });
      fcObs.observe(floatCounter);
    }

    // ── FAQ
    function toggleFaq(el) {
      const item = el.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }

    // FEATURE TABS
    function setActive(el) {
      document.querySelectorAll('.feature-item').forEach(i => i.classList.remove('active'));
      el.classList.add('active');
    }

    // PARALLAX HERO ORNAMENTS ON MOUSEMOVE
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      document.querySelectorAll('.orb').forEach((orb, i) => {
        const depth = [30, 20, 40][i];
        orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
      document.querySelectorAll('.cross').forEach((cross, i) => {
        const depth = [15, 25, 35][i];
        cross.style.marginLeft = `${x * depth}px`;
        cross.style.marginTop = `${y * depth}px`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      document.querySelectorAll('.orb, .cross').forEach(el => {
        el.style.marginLeft = '';
        el.style.marginTop = '';
      });
    });