/* CLOCK */
function tick() {
  const n = new Date(), p = v => String(v).padStart(2, '0');
  document.getElementById('clock').textContent =
    `${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
}
tick();
setInterval(tick, 1000);

/* NOTIFY — Formspree */
const FORMSPREE_URL = 'https://formspree.io/f/xwvwpzvv';

async function notify() {
  const el  = document.getElementById('email');
  const btn = document.querySelector('.form-wrap button');

  if (!el.value.includes('@')) {
    el.style.borderColor = 'rgba(192,21,42,0.6)';
    setTimeout(() => el.style.borderColor = '', 800);
    return;
  }

  btn.textContent = '...';
  btn.disabled = true;

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: el.value })
    });

    if (res.ok) {
      document.getElementById('form-wrap').style.display = 'none';
      document.getElementById('success').style.display = 'block';
    } else {
      btn.textContent = 'Erreur, réessayez';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Erreur, réessayez';
    btn.disabled = false;
  }
}

/* PARTICLES */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, pts = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Pt {
  constructor() { this.reset(true); }
  reset(init) {
    this.x   = Math.random() * W;
    this.y   = init ? Math.random() * H : H + 5;
    this.vy  = -(0.12 + Math.random() * 0.3);
    this.vx  = (Math.random() - 0.5) * 0.1;
    this.r   = 0.4 + Math.random() * 1.0;
    this.a   = 0.08 + Math.random() * 0.35;
    this.red = Math.random() < 0.25;
  }
  step() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10) this.reset(false);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.red
      ? `rgba(192,21,42,${this.a})`
      : `rgba(200,208,219,${this.a * 0.35})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) pts.push(new Pt());

function loop() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => { p.step(); p.draw(); });
  requestAnimationFrame(loop);
}
loop();
