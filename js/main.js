/* ===== Jory Medical Centre — JavaScript ===== */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Sticky Navbar Shadow ───
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ─── Mobile Navigation Toggle & Fullscreen Drawer ───
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    // Inject mobile menu actions (Language Switcher, Booking CTA, Call/WhatsApp)
    if (!navLinks.querySelector('.mobile-menu-actions')) {
      const isArabic = document.documentElement.dir === 'rtl';
      const currentPath = window.location.pathname;
      const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
      
      let targetLangPage = '';
      let targetLangText = '';
      if (isArabic) {
        targetLangPage = pageName.replace('-ar.html', '.html');
        if (!targetLangPage.endsWith('.html')) targetLangPage = 'index.html';
        targetLangText = '🌐 Switch to English';
      } else {
        targetLangPage = pageName.replace('.html', '-ar.html');
        if (!targetLangPage.endsWith('-ar.html')) targetLangPage = 'index-ar.html';
        targetLangText = '🌐 التبديل إلى العربية';
      }

      const actions = document.createElement('div');
      actions.className = 'mobile-menu-actions';
      actions.innerHTML = `
        <a href="${targetLangPage}" class="mobile-lang-btn">
          ${targetLangText}
        </a>
        <a href="${isArabic ? 'contact-ar.html#appointment' : 'contact.html#appointment'}" class="btn-primary" style="justify-content:center; width:100%; border-radius:12px;">
          <i class="fas fa-calendar-check"></i> ${isArabic ? 'احجز موعد الآن' : 'Book Appointment Now'}
        </a>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <a href="tel:+97165227676" class="btn-secondary" style="justify-content:center; padding:12px; font-size:0.875rem; border-radius:12px;">
            <i class="fas fa-phone"></i> ${isArabic ? 'اتصال مباشر' : 'Call Clinic'}
          </a>
          <a href="https://wa.me/971505502346" target="_blank" class="btn-secondary" style="justify-content:center; padding:12px; font-size:0.875rem; border-radius:12px; border-color:#25D366; color:#25D366;">
            <i class="fab fa-whatsapp"></i> ${isArabic ? 'واتساب' : 'WhatsApp'}
          </a>
        </div>
      `;
      navLinks.appendChild(actions);
    }

    function toggleMenu(show) {
      const isActive = typeof show === 'boolean' ? show : !navLinks.classList.contains('active');
      mobileToggle.classList.toggle('active', isActive);
      navLinks.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on any link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }

  // ─── Scroll to Top Button ───
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Animated Counter ───
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * (target - start) + start);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ─── Intersection Observer for Animations ───
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        
        if (entry.target.classList.contains('stat-number') || 
            entry.target.classList.contains('counter')) {
          animateCounter(entry.target);
        }

        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${el.dataset.delay || '0s'}, transform 0.6s ease ${el.dataset.delay || '0s'}`;
    animateOnScroll.observe(el);
  });

  document.querySelectorAll('[data-target]').forEach(el => {
    animateOnScroll.observe(el);
  });

  const animStyle = document.createElement('style');
  animStyle.textContent = `
    .animate-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(animStyle);

  // ─── Active Navigation Link ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Form Submission Handler ───
  const appointmentForm = document.querySelector('.appointment-form form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const service = formData.get('service') || '';
      const date = formData.get('date') || '';
      const time = formData.get('time') || '';

      let message = `Hello! I'd like to book an appointment.

`;
      if (name) message += `Name: ${name}
`;
      if (phone) message += `Phone: ${phone}
`;
      if (service) message += `Service: ${service}
`;
      if (date) message += `Preferred Date: ${date}
`;
      if (time) message += `Preferred Time: ${time}
`;
      message += `
Please confirm the appointment. Thank you!`;

      const whatsappUrl = `https://wa.me/971505502346?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      const btn = this.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Sent to WhatsApp!';
      btn.style.background = '#059669';
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  // ─── Smooth Scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Gallery Lightbox ───
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (!img) return;

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
          position: fixed; inset: 0; background: rgba(0,0,0,0.9);
          z-index: 10000; display: flex; align-items: center; justify-content: center;
          cursor: pointer; animation: fadeIn 0.3s ease;
        `;
        lightbox.innerHTML = `
          <img src="${img.src}" alt="${img.alt}" style="max-width:90%; max-height:90vh; border-radius:12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
          <button style="position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;font-size:1.25rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-times"></i>
          </button>
        `;
        lightbox.addEventListener('click', () => lightbox.remove());
        document.body.appendChild(lightbox);
      });
    });
  }

  // ─── Hero Carousel Logic with Touch / Swipe Support ───
  const track = document.getElementById('heroCarousel');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const indicators = document.querySelectorAll('#carouselIndicators button');
  let currentSlide = 0;
  let slideInterval;

  if (track && indicators.length > 0) {
    const totalSlides = indicators.length;

    function updateCarousel() {
      const isRTL = document.documentElement.dir === 'rtl';
      const offset = isRTL ? (currentSlide * 100) : -(currentSlide * 100);
      track.style.transform = 'translateX(' + offset + '%)';
      indicators.forEach((ind, i) => {
        if (i === currentSlide) {
          ind.classList.remove('bg-primary-200');
          ind.classList.add('bg-primary-500');
        } else {
          ind.classList.add('bg-primary-200');
          ind.classList.remove('bg-primary-500');
        }
      });
    }

    function nextSlideFunc() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }

    function prevSlideFunc() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlideFunc(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlideFunc(); resetInterval(); });

    indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
        resetInterval();
      });
    });

    // Touch Swipe Gestures for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      // Only trigger if horizontal swipe is greater than vertical scroll
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        const isRTL = document.documentElement.dir === 'rtl';
        if (diffX > 0) {
          // Swiped left
          isRTL ? prevSlideFunc() : nextSlideFunc();
        } else {
          // Swiped right
          isRTL ? nextSlideFunc() : prevSlideFunc();
        }
        resetInterval();
      }
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlideFunc, 6000);
    }
    
    resetInterval();
  }

});
