
let verbs = [
  { italian: "giocare", english: "play", past: "played", participle: "played" },
  { italian: "essere", english: "be", past: "was/were", participle: "been" },
  { italian: "avere", english: "have", past: "had", participle: "had" }
];

let currentVerb = {};

// Carica un nuovo verbo casuale
function nextVerb() {
  const index = Math.floor(Math.random() * verbs.length);
  currentVerb = verbs[index];

  document.getElementById("verb").innerHTML = `Verbo: <strong>${currentVerb.english}</strong> <br> <small>(${currentVerb.italian})</small>`;
  resetInputs();
}

// Verifica le risposte
function checkAnswers() {
  const userSimple = document.getElementById("pastSimple").value.trim().toLowerCase();
  const userParticiple = document.getElementById("pastParticiple").value.trim().toLowerCase();

  const correctSimple = currentVerb.past.toLowerCase();
  const correctParticiple = currentVerb.participle.toLowerCase();

  // Verifica Past Simple
  if (userSimple === correctSimple) {
    markCorrect("feedbackSimple", "✓ Corretto!");
  } else {
    markIncorrect("feedbackSimple", `✗ Errato! Corretto: ${correctSimple}`);
  }

  // Verifica Past Participle
  if (userParticiple === correctParticiple) {
    markCorrect("feedbackParticiple", "✓ Corretto!");
  } else {
    markIncorrect("feedbackParticiple", `✗ Errato! Corretto: ${correctParticiple}`);
  }
}

// Funzioni di feedback visivo
function markCorrect(id, message) {
  const element = document.getElementById(id);
  element.innerText = message;
  element.style.color = "green";
}

function markIncorrect(id, message) {
  const element = document.getElementById(id);
  element.innerText = message;
  element.style.color = "red";
}

// Resetta gli input e i feedback
function resetInputs() {
  document.getElementById("pastSimple").value = "";
  document.getElementById("pastParticiple").value = "";
  document.getElementById("feedbackSimple").innerText = "";
  document.getElementById("feedbackParticiple").innerText = "";
}

// Aggiunge un nuovo verbo
function addVerb() {
  const italian = prompt("Inserisci il verbo in italiano:");
  const english = prompt("Inserisci il verbo in inglese:");
  const past = prompt("Inserisci il past simple:");
  const participle = prompt("Inserisci il past participle:");

  if (italian && english && past && participle) {
    verbs.push({ italian, english, past, participle });
    alert("Nuovo verbo aggiunto con successo!");
  } else {
    alert("Tutti i campi devono essere compilati!");
  }
}

window.onload = nextVerb;
