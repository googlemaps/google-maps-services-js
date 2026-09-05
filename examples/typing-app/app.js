const paragraphs = [
  "Learning to type quickly and accurately takes patience, focus, and practice. Take a steady breath, relax your shoulders, and keep your eyes on the next letter instead of looking down at the keyboard.",
  "Consistency is more important than speed alone. Smooth and even keystrokes build strong habits, so let your fingers glide across the keys as you follow the flow of the passage.",
  "Accuracy always matters. Every mistake is a signal to slow down and regain your rhythm. Stay calm, enjoy the process, and celebrate small improvements in each session."
];

const textDisplay = document.getElementById("text-display");
const typingArea = document.getElementById("typing-area");
const startButton = document.getElementById("start-btn");
const timerSelect = document.getElementById("timer-select");
const timeRemainingEl = document.getElementById("time-remaining");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const mistakesEl = document.getElementById("mistakes");

let targetChars = [];
let spans = [];
let position = 0;
let correct = 0;
let mistakes = 0;
let totalKeyPresses = 0;
let timeLeft = 60;
let timerId = null;
let startTimestamp = null;
let testActive = false;
let audioContext;
let audioUnlocked = false;

function buildTextDisplay() {
  textDisplay.innerHTML = "";
  targetChars = [];
  spans = [];

  paragraphs.forEach((paragraph, index) => {
    const paragraphEl = document.createElement("p");
    [...paragraph].forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = "char pending";
      paragraphEl.appendChild(span);
      spans.push(span);
      targetChars.push(char);
    });

    textDisplay.appendChild(paragraphEl);

    if (index < paragraphs.length - 1) {
      const spaceSpan = document.createElement("span");
      spaceSpan.textContent = " ";
      spaceSpan.className = "char pending";
      textDisplay.appendChild(spaceSpan);
      spans.push(spaceSpan);
      targetChars.push(" ");
    }
  });

  if (spans.length > 0) {
    spans[0].classList.add("current");
  }
}

function resetStats() {
  position = 0;
  correct = 0;
  mistakes = 0;
  totalKeyPresses = 0;
  timeLeft = Number(timerSelect.value);
  timeRemainingEl.textContent = timeLeft.toString();
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
  mistakesEl.textContent = "0";
}

function updateCurrentHighlight() {
  spans.forEach((span) => span.classList.remove("current"));
  if (spans[position]) {
    spans[position].classList.add("current");
  }
}

function updateStatsDisplay() {
  const elapsedMinutes = startTimestamp
    ? (performance.now() - startTimestamp) / 60000
    : 0;
  const wpm = elapsedMinutes > 0 ? Math.round((correct / 5) / elapsedMinutes) : 0;
  const accuracy = totalKeyPresses > 0 ? Math.max(0, Math.round((correct / totalKeyPresses) * 100)) : 100;

  wpmEl.textContent = wpm.toString();
  accuracyEl.textContent = accuracy.toString();
  mistakesEl.textContent = mistakes.toString();
}

function unlockAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (!audioUnlocked) {
    audioContext.resume().catch(() => {});
    audioUnlocked = true;
  }
}

function playTone(frequency, duration = 120) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (!audioUnlocked) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

function playCorrectSound() {
  playTone(880);
}

function playIncorrectSound() {
  playTone(220);
}

function finishTest() {
  testActive = false;
  typingArea.blur();
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  updateStatsDisplay();
  typingArea.textContent = "Session complete. Press Start to try again.";
}

function handleKeydown(event) {
  if (!testActive) {
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();
    return;
  }

  unlockAudio();

  if (event.key === "Backspace") {
    event.preventDefault();
    if (position > 0) {
      position -= 1;
      const span = spans[position];
      span.classList.remove("correct", "incorrect");
      span.classList.add("pending");
    }
    mistakes += 1;
    totalKeyPresses += 1;
    playIncorrectSound();
    updateCurrentHighlight();
    updateStatsDisplay();
    return;
  }

  const isSingleCharacter = event.key.length === 1;
  const isEnter = event.key === "Enter";

  if (!isSingleCharacter && !isEnter) {
    return;
  }

  event.preventDefault();

  const inputChar = isEnter ? "\n" : event.key;
  const expectedChar = targetChars[position];

  if (typeof expectedChar === "undefined") {
    return;
  }

  totalKeyPresses += 1;

  if (inputChar === expectedChar) {
    spans[position].classList.remove("pending", "incorrect");
    spans[position].classList.add("correct");
    correct += 1;
    playCorrectSound();
  } else {
    spans[position].classList.remove("pending", "correct");
    spans[position].classList.add("incorrect");
    mistakes += 1;
    playIncorrectSound();
  }

  position += 1;
  updateCurrentHighlight();
  updateStatsDisplay();

  if (position >= targetChars.length) {
    finishTest();
  }
}

function tickTimer() {
  timeLeft -= 1;
  timeRemainingEl.textContent = timeLeft.toString();
  updateStatsDisplay();
  if (timeLeft <= 0) {
    finishTest();
  }
}

function startTest() {
  buildTextDisplay();
  resetStats();

  spans.forEach((span) => span.classList.add("pending"));

  testActive = true;
  startTimestamp = performance.now();
  typingArea.textContent = "Typing in progress...";
  typingArea.focus();

  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(tickTimer, 1000);
}

startButton.addEventListener("click", () => {
  startTest();
});

typingArea.addEventListener("keydown", handleKeydown);

buildTextDisplay();
typingArea.textContent = "Click here after starting to begin typing.";
