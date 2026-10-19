// ==========================================
// SCRIPT JAVASCRIPT - PORTOFOLIO BINTANG AGUNG WISNU TRISNA
// Fitur: Typing animation, Mobile Drawer, Scrollspy, & Dark/Light Mode Switcher
// ==========================================

// 1. Animasi Mengetik Teks di Hero/Home
const typingText = document.getElementById("typing-text");
const roles = [
  "Informatics Student",
  "Technology Enthusiast",
  "Public Speaker & Host"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function playTyping() {
  if (!typingText) return;
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 45 : 95;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 1600; // Jeda sejenak setelah selesai mengetik satu kata
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 400;
  }

  setTimeout(playTyping, typeSpeed);
}

document.addEventListener("DOMContentLoaded", playTyping);


// 2. Navigasi Mobile Drawer (Layar HP)
const hamburger = document.getElementById("hamburger");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerClose = document.getElementById("drawerClose");
const mobileOverlay = document.getElementById("mobileOverlay");
const drawerLinks = document.querySelectorAll(".drawer-link");

function openDrawer() {
  if (mobileDrawer) mobileDrawer.classList.add("open");
  if (mobileOverlay) mobileOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Mengunci scroll saat drawer terbuka
}

function closeDrawer() {
  if (mobileDrawer) mobileDrawer.classList.remove("open");
  if (mobileOverlay) mobileOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

if (hamburger) hamburger.addEventListener("click", openDrawer);
if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
if (mobileOverlay) mobileOverlay.addEventListener("click", closeDrawer);

drawerLinks.forEach((link) => {
  link.addEventListener("click", closeDrawer);
});


// 3. Highlight Menu Aktif Saat Bergulir (ScrollSpy)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  // Efek bayangan navbar saat di-scroll ke bawah
  if (navbar) {
    if (scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Deteksi section yang sedang terlihat di layar
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });

  drawerLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


// 4. Pengubah Tema Terang & Gelap (Default Light Mode Sesuai Gambar)
const themeToggle = document.getElementById("themeToggle");

// Default tema ke "light" (tema cream estetik sesuai gambar yang diunggah)
const savedTheme = localStorage.getItem("theme-mode") || "light";
document.body.setAttribute("data-theme", savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme-mode", newTheme);
  });
}

// 5. Modal Popup Lihat Gambar Sertifikat Ukuran Penuh
function openCertModal(imageSrc, titleText) {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalCertImg");
  const modalCaption = document.getElementById("modalCertCaption");

  if (modal && modalImg) {
    modalImg.src = imageSrc;
    if (modalCaption) modalCaption.textContent = titleText;
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Kunci scroll layar saat foto diperbesar
  }
}

function closeCertModal() {
  const modal = document.getElementById("certModal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto"; // Aktifkan kembali scroll layar
  }
}

// Tutup modal jika menekan tombol Escape di keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCertModal();
  }
});