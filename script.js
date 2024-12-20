
let verbs = [
  { italian: "giocare", english: "play", past: "played", participle: "played" },
  { italian: "essere", english: "be", past: "was/were", participle: "been" }
];
let currentVerb = {};
let currentIndex = 0;

function nextVerb() {
  currentIndex = Math.floor(Math.random() * verbs.length);
  currentVerb = verbs[currentIndex];
  document.getElementById("verb").innerHTML = `Verbo: <strong>${currentVerb.english}</strong> <br> <small>(${currentVerb.italian})</small>`;
  document.getElementById("pastSimple").value = "";
  document.getElementById("pastParticiple").value = "";
  document.getElementById("feedbackSimple").innerText = "";
  document.getElementById("feedbackParticiple").innerText = "";
}

function checkAnswers() {
  const userSimple = document.getElementById("pastSimple").value.trim().toLowerCase();
  const userParticiple = document.getElementById("pastParticiple").value.trim().toLowerCase();

  const correctSimple = currentVerb.past.toLowerCase();
  const correctParticiple = currentVerb.participle.toLowerCase();

  document.getElementById("feedbackSimple").innerText = userSimple === correctSimple ? "✓" : `✗ Corretto: ${correctSimple}`;
  document.getElementById("feedbackParticiple").innerText = userParticiple === correctParticiple ? "✓" : `✗ Corretto: ${correctParticiple}`;
}

window.onload = nextVerb;
