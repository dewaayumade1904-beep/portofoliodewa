/**
 * PORTOFOLIO WEB INTERAKTIF - LOGIKA JAVASCRIPT UTAMA
 * Dibangun dengan Vanilla JavaScript (ES6+) murni, bersih dan terstruktur.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. DATA DOKUMENTASI PROYEK (Lengkap untuk Modal Detail)
     ======================================================================== */
  const projectsData = {
    p1: {
      title: "Modern E-Commerce Dashboard",
      category: "Web Application",
      img: "assets/projects/project1.svg",
      overview: "Platform analitik dashboard terpadu yang dirancang khusus untuk memantau performa penjualan produk secara real-time, tren pembelian pelanggan, dan kontrol stok barang dengan visualisasi data interaktif.",
      features: [
        "Grafik tren penjualan real-time berbasis SVG dinamis.",
        "Statistik ringkas (Total Omset, Pengunjung Aktif, Tingkat Konversi).",
        "Tabel manajemen inventaris produk dengan fitur filter cepat.",
        "Mode gelap (Dark Theme) ramah mata yang adaptif di berbagai resolusi layar."
      ],
      challenge: "Tantangan utama adalah menjaga rendering grafik tetap mulus tanpa memberatkan memori browser ketika dataset diperbarui secara berkala. Solusinya adalah membagi komputasi data dan memanfaatkan SVG inline yang dianimasikan menggunakan CSS transform.",
      tech: ["HTML5", "CSS Grid & Flexbox", "Vanilla JavaScript", "SVG Charts", "LocalStorage"],
      liveDemo: "#",
      repoLink: "https://github.com"
    },
    p2: {
      title: "AI Prompt & Creative Studio",
      category: "Web Application",
      img: "assets/projects/project2.svg",
      overview: "Aplikasi produktivitas untuk para digital artist dan content creator dalam mengelola, menyusun template prompt AI, serta melihat pratinjau galeri gambar hasil render dengan tampilan glassmorphism modern.",
      features: [
        "Input prompt intuitif dengan fitur preset parameter kreatif.",
        "Galeri kartu gambar dengan efek hover glow dan zoom interaktif.",
        "Penyimpanan koleksi prompt favorit menggunakan Web LocalStorage.",
        "Fitur copy-to-clipboard instan dengan notifikasi visual halus."
      ],
      challenge: "Membuat tata letak galeri yang fleksibel serta menjaga kontras teks di atas panel semi-transparan (glassmorphism). Diatasi dengan kalkulasi backdrop-filter bertingkat dan palet warna neon berstandar WCAG.",
      tech: ["JavaScript ES6", "CSS Backdrop-Filter", "Web Storage API", "Asynchronous Fetch"],
      liveDemo: "#",
      repoLink: "https://github.com"
    },
    p3: {
      title: "Habit & Productivity Tracker",
      category: "Eksperimen / Utility",
      img: "assets/projects/project3.svg",
      overview: "Aplikasi pelacak kebiasaan harian untuk membantu pengguna menjaga disiplin dan fokus. Dilengkapi visualisasi streak lingkaran animasi dan kategori tugas yang terorganisir.",
      features: [
        "Indikator progres melingkar (Circular Progress) dengan animasi SVG stroke-dasharray.",
        "Penghitung streak hari otomatis untuk memicu motivasi pengguna.",
        "Kategori tugas (Development, UI Design, Self-Habit, Reading).",
        "Penyimpanan status checklist yang otomatis tersimpan saat halaman ditutup."
      ],
      challenge: "Menghitung streak hari secara akurat lintas zona waktu dan tanggal sistem. Solusinya dengan memanfaatkan manipulasi objek Date JavaScript murni dan hashing tanggal ISO.",
      tech: ["Vanilla JavaScript", "CSS SVG Animation", "LocalStorage", "Semantic HTML5"],
      liveDemo: "#",
      repoLink: "https://github.com"
    },
    p4: {
      title: "Audio Reactive Canvas",
      category: "UI/UX & Desain",
      img: "assets/projects/project4.svg",
      overview: "Eksperimen interaktif yang menghubungkan Web Audio API dengan HTML5 Canvas untuk menghasilkan visualizer spektrum gelombang suara real-time dengan gradien dinamis.",
      features: [
        "Visualisasi frekuensi audio 60 FPS menggunakan requestAnimationFrame.",
        "Skema warna neon dinamis yang merespons intensitas nada (bass/treble).",
        "Pemutar audio bawaan dengan tombol kontrol play, pause, dan scrub waktu.",
        "Performa ringan dan responsif terhadap perubahan ukuran layar browser."
      ],
      challenge: "Sinkronisasi frekuensi audio dengan loop canvas tanpa frame drop. Berhasil dioptimalkan dengan membatasi FFT size AudioAnalyser dan meminimalkan garbage collection di dalam render loop.",
      tech: ["HTML5 Canvas", "Web Audio API", "CSS Custom Properties", "RequestAnimationFrame"],
      liveDemo: "#",
      repoLink: "https://github.com"
    }
  };

  /* ========================================================================
     2. TYPEWRITER EFFECT (Efek Mengetik Animatif)
     ======================================================================== */
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    "Web Developer 💻",
    "Creative Designer 🎨",
    "UI/UX Enthusiast ✨",
    "Problem Solver 🚀"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Tunggu sejenak di akhir teks
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Mulai efek ketik
  typeEffect();

  /* ========================================================================
     3. STICKY HEADER & ACTIVE NAV LINK PADA SCROLL
     ======================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header Blur Effect on Scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Nav Indicator
    let currentSection = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Jalankan sekali saat halaman dimuat
  window.dispatchEvent(new Event('scroll'));

  /* ========================================================================
     4. MOBILE HAMBURGER NAVIGATION
     ======================================================================== */
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Tutup menu saat salah satu link diklik di mobile
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========================================================================
     5. SPOTLIGHT CURSOR EFFECT PADA KARTU (Mouse Tracking Glow)
     ======================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ========================================================================
     6. SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ======================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Lepas observer setelah animasi pertama kali muncul agar efisien
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback untuk browser lawas tanpa IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ========================================================================
     7. FILTER KATEGORI PROYEK (Filter Tabs)
     ======================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-editorial-card, .project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Ganti class active pada tombol
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Trigger slight fade/scale animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ========================================================================
     8. MODAL DOKUMENTASI PROYEK (<dialog>)
     ======================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalOverview = document.getElementById('modal-overview');
  const modalFeatures = document.getElementById('modal-features');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalTech = document.getElementById('modal-tech');
  const modalLiveBtn = document.getElementById('modal-live-btn');
  const modalRepoBtn = document.getElementById('modal-repo-btn');

  // Buka modal saat tombol "Lihat Detail" atau "Baca Dokumentasi" diklik
  document.querySelectorAll('.open-doc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-editorial-card') || btn.closest('.project-card');
      if (!card) return;

      const projectId = card.getAttribute('data-project-id');
      const data = projectsData[projectId];

      if (data && projectModal) {
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalImg.src = data.img;
        modalImg.alt = `Pratinjau ${data.title}`;
        modalOverview.textContent = data.overview;
        modalChallenge.textContent = data.challenge;

        // Render checklist fitur
        modalFeatures.innerHTML = '';
        data.features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature;
          modalFeatures.appendChild(li);
        });

        // Render tech tags
        modalTech.innerHTML = '';
        data.tech.forEach(techItem => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = techItem;
          modalTech.appendChild(span);
        });

        modalLiveBtn.href = data.liveDemo;
        modalRepoBtn.href = data.repoLink;

        // Buka modal secara native
        projectModal.showModal();
        document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat modal aktif
      }
    });
  });

  // Tutup modal dengan tombol X
  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener('click', () => {
      projectModal.close();
      document.body.style.overflow = '';
    });

    // Tutup saat klik di luar kotak modal (area backdrop)
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        projectModal.close();
        document.body.style.overflow = '';
      }
    });

    // Tangani penutupan dengan tombol Escape
    projectModal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  }

  /* ========================================================================
     9. FORM KONTAK & INTERACTIVE FEEDBACK
     ======================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert("Mohon lengkapi semua kolom formulir.");
        return;
      }

      // Animasi status pengiriman
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Mengirim Pesan...</span>`;
      submitBtn.disabled = true;

      // Simulasi pengiriman data (bisa diintegrasikan dengan EmailJS / Formspree)
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `<strong>✨ Terima kasih, ${name}!</strong> Pesanmu telah berhasil dikirim. Saya akan segera membalas ke ${email}.`;

        contactForm.reset();

        // Bersihkan status setelah 5 detik
        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.innerHTML = '';
        }, 5000);
      }, 1000);
    });
  }


});
