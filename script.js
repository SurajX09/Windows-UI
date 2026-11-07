const startButton = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');
const searchInput = document.getElementById('appSearch');
const toast = document.getElementById('toast');
let toastTimer;

function setMenuOpen(open) {
  startMenu.hidden = !open;
  startButton.setAttribute('aria-expanded', String(open));
  startButton.setAttribute('aria-label', open ? 'Close apps menu' : 'Open apps menu');
  if (open) window.setTimeout(() => searchInput.focus(), 50);
}

startButton.addEventListener('click', (event) => {
  event.stopPropagation();
  setMenuOpen(startMenu.hidden);
});

startMenu.addEventListener('click', (event) => event.stopPropagation());
document.addEventListener('click', (event) => {
  if (!startMenu.hidden && !startMenu.contains(event.target) && event.target !== startButton) {
    setMenuOpen(false);
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    setMenuOpen(true);
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2200);
}

document.querySelectorAll('.app').forEach((button) => {
  button.addEventListener('click', () => {
    showToast(`${button.dataset.app} is ready to open.`);
    setMenuOpen(false);
  });
});
document.querySelectorAll('[data-open-app]').forEach((button) => {
  button.addEventListener('click', () => showToast(`${button.dataset.openApp} is ready to open.`));
});
document.querySelector('.power-button').addEventListener('click', () => showToast('Power options are not available in this demo.'));

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  document.querySelectorAll('.app').forEach((app) => {
    app.hidden = !app.dataset.app.toLowerCase().includes(query);
  });
});

function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(now);
  document.getElementById('topClock').textContent = time;
  document.getElementById('dockClock').textContent = time;
  document.getElementById('dockDate').textContent = new Intl.DateTimeFormat(undefined, {
    weekday: 'short', month: 'short', day: 'numeric'
  }).format(now);
}
updateClock();
window.setInterval(updateClock, 30_000);
