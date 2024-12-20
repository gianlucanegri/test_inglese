
let verbsDefault = [
    { italiano: "giocare", past_simple: "played", past_participle: "played" },
    { italiano: "scrivere", past_simple: "wrote", past_participle: "written" },
    { italiano: "leggere", past_simple: "read", past_participle: "read" },
    { italiano: "correre", past_simple: "ran", past_participle: "run" },
    { italiano: "cantare", past_simple: "sang", past_participle: "sung" }
];

let verbsCustom = JSON.parse(localStorage.getItem("verbsCustom")) || [];
let currentVerb = {};
let score = 0;
let totalQuestions = 0;

function nextQuestion() {
    clearFields();
    const verbs = verbsCustom.length ? verbsCustom : verbsDefault;
    currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
    document.getElementById("verb").innerText = `Verbo: ${currentVerb.italiano}`;
}

function checkAnswer() {
    const simple = document.getElementById("pastSimple").value.trim().toLowerCase();
    const participle = document.getElementById("pastParticiple").value.trim().toLowerCase();
    totalQuestions++;

    if (simple === currentVerb.past_simple && participle === currentVerb.past_participle) {
        score++;
        document.getElementById("feedback").innerText = "✅ Risposta corretta!";
    } else {
        document.getElementById("feedback").innerText = `❌ Sbagliato! Corretto: ${currentVerb.past_simple}, ${currentVerb.past_participle}`;
    }
    document.getElementById("score").innerText = `Punteggio: ${score}/${totalQuestions}`;
}

function addVerb() {
    const italian = prompt("Inserisci il verbo in italiano:");
    if (italian) {
        const simple = italian + "ed";
        const participle = italian + "ed";
        verbsCustom.push({ italiano: italian, past_simple: simple, past_participle: participle });
        localStorage.setItem("verbsCustom", JSON.stringify(verbsCustom));
        alert(`Verbo aggiunto: ${italian} -> ${simple}, ${participle}`);
    }
}

function showVerbs() {
    const verbs = verbsCustom.length ? verbsCustom : verbsDefault;
    alert(verbs.map(v => `${v.italiano}: ${v.past_simple}, ${v.past_participle}`).join("\n"));
}

function clearFields() {
    document.getElementById("pastSimple").value = "";
    document.getElementById("pastParticiple").value = "";
    document.getElementById("feedback").innerText = "";
}

nextQuestion();
