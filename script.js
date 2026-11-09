document.getElementById("openGiftBtn").addEventListener("click",()=>document.getElementById("welcomeScreen").classList.add("closed"));
// Pragya's Diwali surprise — original, locally generated instrumental melody.
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const songPlayBtn = document.getElementById("songPlayBtn");
let audioContext = null;
let melodyTimer = null;
let noteIndex = 0;
let playing = false;

// A gentle original pentatonic melody. Audio starts only after a visitor taps.
const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25, 392.00,
               440.00, 523.25, 587.33, 523.25, 440.00, 392.00, 349.23, 392.00];

function playNote(freq, startAt) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const shimmer = audioContext.createOscillator();
  const shimmerGain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  shimmer.type = "sine";
  shimmer.frequency.value = freq * 2.01;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.075, startAt + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.62);
  shimmerGain.gain.setValueAtTime(0.0001, startAt);
  shimmerGain.gain.exponentialRampToValueAtTime(0.012, startAt + 0.04);
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.4);
  osc.connect(gain).connect(audioContext.destination);
  shimmer.connect(shimmerGain).connect(audioContext.destination);
  osc.start(startAt); shimmer.start(startAt);
  osc.stop(startAt + 0.7); shimmer.stop(startAt + 0.45);
}
function startMelody() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioContext.resume();
  playing = true;
  musicLabel.textContent = "Pause melody";
  musicToggle.firstChild.textContent = "♫ ";
  songPlayBtn.textContent = "Ⅱ Pause the little melody";
  if (melodyTimer) clearInterval(melodyTimer);
  noteIndex = 0;
  playNote(notes[noteIndex], audioContext.currentTime + 0.05);
  melodyTimer = setInterval(() => {
    if (!playing) return;
    noteIndex = (noteIndex + 1) % notes.length;
    playNote(notes[noteIndex], audioContext.currentTime + 0.02);
  }, 430);
}
function stopMelody() {
  playing = false;
  if (melodyTimer) clearInterval(melodyTimer);
  melodyTimer = null;
  musicLabel.textContent = "Play our melody";
  musicToggle.firstChild.textContent = "♫ ";
  songPlayBtn.textContent = "♫ Play the little melody";
}
function toggleMelody() { playing ? stopMelody() : startMelody(); }
musicToggle.addEventListener("click", toggleMelody);
songPlayBtn.addEventListener("click", toggleMelody);

document.getElementById("beginBtn").addEventListener("click", () => {
  document.getElementById("song").scrollIntoView({behavior:"smooth"});
  if (!playing) startMelody();
});

const reveal = document.getElementById("promiseReveal");
document.querySelectorAll(".promise-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".promise-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    reveal.textContent = card.dataset.promise;
  });
});

document.getElementById("backTop").addEventListener("click", () => {
  window.scrollTo({top:0, behavior:"smooth"});
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
  });
});
