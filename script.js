/* ============================= */
/* CINEMATIC CHAR REVEAL */
/* ============================= */
document.addEventListener("DOMContentLoaded", () => {
  const chars = document.querySelectorAll(".char-wrap");
  chars.forEach((c, i) => {
    setTimeout(() => c.classList.add("visible"), 3400 + i * 90);
  });
});


/* ============================= */
/* SCROLL REVEAL */
/* ============================= */
function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load


/* ============================= */
/* NAVBAR SCROLL STATE */
/* ============================= */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});


/* ============================= */
/* LIQUID MELT (per-character) */
/* ============================= */
const chars = document.querySelectorAll(".char-wrap");
window.addEventListener("scroll", () => {
  const melt = window.scrollY > 130;
  chars.forEach((c, i) => {
    if (melt) {
      // staggered melt
      setTimeout(() => c.classList.add("melt"), i * 55);
    } else {
      c.classList.remove("melt");
    }
  });
});


/* ============================= */
/* DUAL CURSOR */
/* ============================= */
const cursor = document.querySelector(".cursor");
const trail  = document.querySelector(".cursor-trail");

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

// Smooth trail with lerp
function lerpTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + "px";
  trail.style.top  = trailY + "px";
  requestAnimationFrame(lerpTrail);
}
lerpTrail();

// Cursor hover inflate
document.querySelectorAll("a, button, .spirit-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
    trail.style.width  = "56px";
    trail.style.height = "56px";
    trail.style.borderColor = "rgba(212,175,55,0.9)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
    trail.style.width  = "36px";
    trail.style.height = "36px";
    trail.style.borderColor = "rgba(212,175,55,0.6)";
  });
});


/* ============================= */
/* GOLD PARTICLES */
/* ============================= */
const canvas = document.getElementById("particles");
const ctx    = canvas.getContext("2d");

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Particle {
  constructor() { this.reset(true); }

  reset(random = false) {
    this.x      = Math.random() * canvas.width;
    this.y      = random ? Math.random() * canvas.height : canvas.height + 10;
    this.size   = Math.random() * 2.2 + 0.4;
    this.speedY = Math.random() * 0.55 + 0.15;
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.life   = 0;
    this.maxLife = Math.random() * 200 + 120;
    this.alpha  = 0;
  }

  update() {
    this.y    -= this.speedY;
    this.x    += this.speedX;
    this.life++;
    const progress = this.life / this.maxLife;
    // fade in then out
    this.alpha = progress < 0.2
      ? progress / 0.2
      : progress > 0.8
        ? (1 - progress) / 0.2
        : 1;
    if (this.y < -10) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha * 0.75;
    ctx.fillStyle   = `rgba(212,175,55,1)`;
    ctx.shadowColor = "#d4af37";
    ctx.shadowBlur  = 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const particles = Array.from({ length: 140 }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();


/* ============================= */
/* SMOOTH ACTIVE NAV LINK */
/* ============================= */
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute("href") === `#${current}`
      ? "var(--gold)"
      : "";
  });
});
