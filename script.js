// =========================
// HEADER ANIMASI (Kodiva)
// =========================
const header = document.querySelector("header");
let lastScrollY = 0;

// Efek muncul & sembunyi saat scroll
function handleScroll() {
  const currentScrollY = window.scrollY;

  // Kalau scroll lebih dari 100px → tampilkan header
  if (currentScrollY > 100) {
    header.classList.add("visible");
    header.classList.add("scrolled");
  } else {
    // Kembali ke posisi awal (hilang)
    header.classList.remove("visible");
    header.classList.remove("scrolled");
  }

  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", handleScroll);

// =========================
// MOBILE MENU TOGGLE
// =========================
const menuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
let open = false;

menuBtn.addEventListener("click", () => {
  open = !open;
  mobileMenu.classList.toggle("hidden");
  menuBtn.innerHTML = open
    ? '<i class="fas fa-times text-2xl"></i>'
    : '<i class="fas fa-bars text-2xl"></i>';
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    open = false;
  });
});

// =========================
// SMOOTH SCROLLING
// =========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      mobileMenu.classList.add("hidden");
    }
  });
});

// =========================
// FORM VALIDASI
// =========================
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const nama = formData.get("nama");
    const email = formData.get("email");
    const telepon = formData.get("telepon");
    const pesan = formData.get("pesan");

    if (!nama || !email || !telepon || !pesan) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Format email tidak valid");
      return;
    }

    alert("Terima kasih! Pesan Anda telah dikirim.");
    form.reset();
  });
}

// =========================
// CANVAS TEKNOLOGI (JARING KODIVA)
// =========================
const canvas = document.getElementById("tech-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

const particleCount = 80;
const particles = [];
const mouse = { x: null, y: null, radius: 150 };

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 1.5 + Math.random() * 1.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00d4ff";
    ctx.fill();
  }
}

function connectLines() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = dx * dx + dy * dy;

      if (distance < 10000) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 212, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }

    if (mouse.x && mouse.y) {
      const dx = particles[a].x - mouse.x;
      const dy = particles[a].y - mouse.y;
      const distanceToMouse = dx * dx + dy * dy;
      if (distanceToMouse < mouse.radius * mouse.radius) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 212, 255, 0.3)";
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectLines();
  requestAnimationFrame(animateParticles);
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});
window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

initParticles();
animateParticles();

// =========================
// ANIMASI FADE-IN KONTEN
// =========================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("fade-in-up");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document
  .querySelectorAll("section")
  .forEach((section) => observer.observe(section));
