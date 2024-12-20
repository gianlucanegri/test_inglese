
let verbs = [
  { italian: "essere", english: "be", past: "was/were", participle: "been" },
  { italian: "avere", english: "have", past: "had", participle: "had" }
];

let currentQuestion = {};
let score = 0;
let questionCount = 0;

function startTest() {
  document.getElementById("testContainer").style.display = "block";
  document.getElementById("result").innerText = "";
  questionCount = 0;
  score = 0;
  nextQuestion();
}

function nextQuestion() {
  if (questionCount >= 10) {
    showResults();
    return;
  }

  const index = Math.floor(Math.random() * verbs.length);
  currentQuestion = verbs[index];
  const testType = document.getElementById("testType").value;

  if (testType === "it-en") {
    document.getElementById("question").innerText = `Traduci in inglese: ${currentQuestion.italian}`;
  } else {
    document.getElementById("question").innerText = `Traduci in italiano: ${currentQuestion.english}`;
  }

  document.getElementById("answer").value = "";
  questionCount++;
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
  const testType = document.getElementById("testType").value;
  const correctAnswer = testType === "it-en" ? currentQuestion.english : currentQuestion.italian;

  if (userAnswer === correctAnswer.toLowerCase()) {
    score++;
    document.getElementById("feedback").innerText = "Corretto!";
  } else {
    document.getElementById("feedback").innerText = `Errato! La risposta corretta è: ${correctAnswer}`;
  }
  nextQuestion();
}

function showResults() {
  document.getElementById("result").innerText = `Test completato! Punteggio: ${score}/10`;
  document.getElementById("testContainer").style.display = "none";
}

function showAddVerbForm() {
  document.getElementById("addVerbContainer").style.display = "block";
}

function addVerb() {
  const newVerbItalian = document.getElementById("newVerbItalian").value.trim();
  if (!newVerbItalian) {
    document.getElementById("addVerbFeedback").innerText = "Inserisci il verbo in italiano.";
    return;
  }

  fetch(`https://api.mymemory.translated.net/get?q=${newVerbItalian}&langpair=it|en`)
    .then(response => response.json())
    .then(data => {
      const translation = data.responseData.translatedText;
      verbs.push({ italian: newVerbItalian, english: translation });
      document.getElementById("addVerbFeedback").innerText = "Verbo aggiunto con successo!";
    })
    .catch(() => {
      document.getElementById("addVerbFeedback").innerText = "Errore nell'aggiunta del verbo.";
    });
}
