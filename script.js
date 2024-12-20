let verbsDefault = [];
let verbsCustom = [];
let useCustomVerbs = false;
let currentVerb = {};
let score = 0;
let totalQuestions = 0;

fetch('verbs.json')
    .then(response => response.json())
    .then(data => {
        verbsDefault = data.verbi_default;
        verbsCustom = data.verbi_personalizzati;
        nextQuestion();
    });

function nextQuestion() {
    clearFields();
    const verbs = useCustomVerbs ? verbsCustom : verbsDefault;
    if (verbs.length > 0) {
        const index = Math.floor(Math.random() * verbs.length);
        currentVerb = verbs[index];
        document.getElementById('verb').innerText = `Verbo: ${currentVerb.italiano}`;
    } else {
        alert("Nessun verbo disponibile!");
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

function addVerb() {
    const italian = prompt("Inserisci il verbo in italiano:");
    const pastSimple = prompt("Inserisci il Past Simple:");
    const pastParticiple = prompt("Inserisci il Past Participle:");

    if (italian && pastSimple && pastParticiple) {
        verbsCustom.push({ italiano: italian, past_simple: pastSimple, past_participle: pastParticiple });
        alert("Verbo aggiunto con successo!");
    } else {
        alert("Tutti i campi sono obbligatori!");
    }
}

function showVerbs() {
    const verbs = useCustomVerbs ? verbsCustom : verbsDefault;
    alert(verbs.map(v => `${v.italiano}: ${v.past_simple}, ${v.past_participle}`).join("\n"));
}

function switchVerbList() {
    useCustomVerbs = !useCustomVerbs;
    alert(`Stai utilizzando i verbi ${useCustomVerbs ? "personalizzati" : "default"}.`);
    nextQuestion();
}

function clearFields() {
    document.getElementById('pastSimple').value = '';
    document.getElementById('pastParticiple').value = '';
    document.getElementById('feedback').innerText = '';
}