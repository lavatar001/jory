/* ===== Jory Medical Centre — JavaScript ===== */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Sticky Navbar Shadow ───
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ─── Mobile Navigation Toggle ───
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll to Top Button ───
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    });
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
      // Ease out quad
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
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  // Animate elements on scroll
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        
        // Counter animation
        if (entry.target.classList.contains('stat-number') || 
            entry.target.classList.contains('counter')) {
          animateCounter(entry.target);
        }

        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${el.dataset.delay || '0s'}, transform 0.6s ease ${el.dataset.delay || '0s'}`;
    observerOptions.threshold = 0.15;
    animateOnScroll.observe(el);
  });

  // Also observe counters
  document.querySelectorAll('[data-target]').forEach(el => {
    animateOnScroll.observe(el);
  });

  // CSS for animated visible state
  const style = document.createElement('style');
  style.textContent = `
    .animate-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

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

      // Build WhatsApp message
      let message = `Hello! I'd like to book an appointment.\n\n`;
      if (name) message += `Name: ${name}\n`;
      if (phone) message += `Phone: ${phone}\n`;
      if (service) message += `Service: ${service}\n`;
      if (date) message += `Preferred Date: ${date}\n`;
      if (time) message += `Preferred Time: ${time}\n`;
      message += `\nPlease confirm the appointment. Thank you!`;

      const whatsappUrl = `https://wa.me/971505502346?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Show success feedback
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

  // ─── Lazy Load Images ───
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  }

  // ─── Testimonial Auto-Scroll (simple) ───
  const testimonialTrack = document.querySelector('.testimonial-track');
  if (testimonialTrack) {
    let scrollPos = 0;
    const cards = testimonialTrack.children;
    const totalWidth = testimonialTrack.scrollWidth;
    
    setInterval(() => {
      scrollPos += 340;
      if (scrollPos >= totalWidth - testimonialTrack.offsetWidth) {
        scrollPos = 0;
      }
      testimonialTrack.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }, 5000);
  }

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

});

  // --- Hero Carousel Logic ---
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

    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlideFunc(); resetInterval(); });
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlideFunc(); resetInterval(); });

    indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
        resetInterval();
      });
    });

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlideFunc, 6000); // 6 seconds auto-scroll
    }
    
    resetInterval();
  }
