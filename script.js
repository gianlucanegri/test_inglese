
let verbsDefault = [];
let verbsCustom = [];
let useCustomVerbs = false;
let currentVerb = {};
let score = 0;
let totalQuestions = 0;

// Carica i verbi iniziali
fetch('verbs.json')
    .then(response => response.json())
    .then(data => {
        verbsDefault = data.verbi_default;
        verbsCustom = JSON.parse(localStorage.getItem('verbsCustom')) || [];
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
        alert('Nessun verbo disponibile!');
    }
}

function checkAnswer() {
    const pastSimple = document.getElementById('pastSimple').value.trim().toLowerCase();
    const pastParticiple = document.getElementById('pastParticiple').value.trim().toLowerCase();

    totalQuestions++;
    if (pastSimple === currentVerb.past_simple && pastParticiple === currentVerb.past_participle) {
        score++;
        document.getElementById('feedback').innerText = '✅ Risposta corretta!';
    } else {
        document.getElementById('feedback').innerText = `❌ Sbagliato! Corretto: ${currentVerb.past_simple}, ${currentVerb.past_participle}`;
    }
    document.getElementById('score').innerText = `Risposte corrette: ${score}/${totalQuestions}`;
}

function addVerb() {
    const italian = prompt('Inserisci il verbo in italiano:');
    if (italian) {
        // Simula traduzione e coniugazione
        const pastSimple = italian + 'ed';
        const pastParticiple = italian + 'ed';
        verbsCustom.push({ italiano: italian, past_simple: pastSimple, past_participle: pastParticiple });
        localStorage.setItem('verbsCustom', JSON.stringify(verbsCustom));
        alert('Verbo aggiunto con successo!');
    }
}

function showVerbs() {
    const verbs = useCustomVerbs ? verbsCustom : verbsDefault;
    const verbList = verbs.map(v => `${v.italiano}: ${v.past_simple}, ${v.past_participle}`).join('\n');
    alert(`Lista Verbi:\n${verbList}`);
}

function switchVerbList() {
    useCustomVerbs = !useCustomVerbs;
    alert(`Stai usando i verbi ${useCustomVerbs ? 'personalizzati' : 'predefiniti'}.`);
    nextQuestion();
}

function clearFields() {
    document.getElementById('pastSimple').value = '';
    document.getElementById('pastParticiple').value = '';
    document.getElementById('feedback').innerText = '';
}
