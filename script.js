let verbs = [];
let currentVerb = {};
let score = 0;
let totalQuestions = 0;

// Carica il JSON dei verbi
fetch('verbs.json')
    .then(response => response.json())
    .then(data => {
        verbs = data.verbi;
        nextQuestion();
    });

function nextQuestion() {
    clearFields();
    if (verbs.length > 0) {
        const index = Math.floor(Math.random() * verbs.length);
        currentVerb = verbs[index];
        document.getElementById('verb').innerText = `Verbo: ${currentVerb.italiano}`;
    }
}

function checkAnswer() {
    const pastSimple = document.getElementById('pastSimple').value.trim().toLowerCase();
    const pastParticiple = document.getElementById('pastParticiple').value.trim().toLowerCase();

    totalQuestions++;
    if (pastSimple === currentVerb.past_simple && pastParticiple === currentVerb.past_participle) {
        score++;
        document.getElementById('feedback').innerText = 'Corretto!';
    } else {
        document.getElementById('feedback').innerText = `Sbagliato! Corretto: ${currentVerb.past_simple}, ${currentVerb.past_participle}`;
    }
    document.getElementById('score').innerText = `Risposte corrette: ${score}/${totalQuestions}`;
}

function clearFields() {
    document.getElementById('pastSimple').value = '';
    document.getElementById('pastParticiple').value = '';
    document.getElementById('feedback').innerText = '';
}

function showResults() {
    alert(`Domande totali: ${totalQuestions}\nRisposte corrette: ${score}\nPercentuale: ${(score/totalQuestions * 100).toFixed(2)}%`);
    score = 0;
    totalQuestions = 0;
    document.getElementById('score').innerText = '';
}