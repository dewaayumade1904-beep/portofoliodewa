/**
 * PORTOFOLIO - Dewa Ayu Made Dwi Putri Andani
 * JavaScript murni (vanilla), berisi 3 fitur:
 *   1. Header berubah saat scroll + menu aktif mengikuti bagian yang dibaca
 *   2. Menu hamburger untuk tampilan HP
 *   3. Animasi muncul saat elemen .reveal masuk layar
 *
 * Catatan: animasi tulisan per slide dan lightbox foto proyek
 * ditulis langsung di index.html (di dalam tag <script>).
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================================
     1. HEADER SAAT SCROLL & MENU AKTIF
     ====================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Beri efek blur pada header setelah halaman digulir
    header.classList.toggle('scrolled', window.scrollY > 40);

    // Cari bagian yang sedang tampil, lalu aktifkan menu yang sesuai
    let currentSection = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      if (scrollPosition >= top && scrollPosition < top + section.offsetHeight) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }, { passive: true });

  // Jalankan sekali saat halaman dimuat
  window.dispatchEvent(new Event('scroll'));

  /* ======================================================================
     2. MENU HAMBURGER (MOBILE)
     ====================================================================== */
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Tutup menu setelah salah satu tautan diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ======================================================================
     3. ANIMASI MUNCUL SAAT SCROLL (.reveal)
     ====================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // cukup sekali agar ringan
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Browser lama tanpa IntersectionObserver: langsung tampilkan
    revealElements.forEach(el => el.classList.add('revealed'));
  }

});
