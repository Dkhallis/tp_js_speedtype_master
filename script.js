let timeLeft; 
let timer; 
let correctWords = 0; 
let currentParagraph = ""; 
let gameDuration = 0; 
let currentPage = 1; 

const btnStart = document.querySelector("#btn-start");
const selectDuration = document.querySelector("#duration"); 
const timeLeftDisplay = document.querySelector("#time-Left"); 
const wordsDisplay = document.querySelector("#words-display"); 
const textInput = document.querySelector("#text-input"); 
const resultsSection = document.querySelector("#results"); 
const correctWordsDisplay = document.querySelector("#correct-words"); 
const wpmDisplay = document.querySelector("#wpm"); 

const btnSave = document.querySelector("#btn-save"); 
const pseudoInput = document.querySelector("#pseudo"); 

const btnScores = document.querySelector("#btn-scores");
const modal = document.querySelector("#modal-scores"); 
const scoresBody = document.querySelector("#scores-body"); 
const btnPrev = document.querySelector("#btn-prev"); 
const btnNext = document.querySelector("#btn-next");
const pageInfo = document.querySelector("#page-info"); 

/* 1/ Charge un paragraphe depuis une API. */

btnStart.addEventListener("click", function () {
    correctWords = 0; 
    textInput.value = ""; 
    resultsSection.style.display = "none"; 
    
    gameDuration = parseInt(selectDuration.value);
    timeLeft = gameDuration; 

    timeLeftDisplay.textContent = timeLeft; 

    loadParagraph(); 

    startTimer(); 
}); 

function loadParagraph () {
    fetch("https://speedtype.api.pierre-jehan.com/random-paragraph", {
        headers: {
            "Accept": "application/json"
        }

    })
    .then(response => response.json())
    .then(data => {
        currentParagraph = data.content; 
        wordsDisplay.textContent = currentParagraph; 
        textInput.disabled = false; 
        textInput.focus(); 
    })
    .catch(error => {
        console.error("Erreur API :", error); 

    }); 
}

/* 2/ Lance un chrono. */

function startTimer() {

    timer = setInterval(function(){

        timeLeft--; 
        timeLeftDisplay.textContent =timeLeft; 


        if (timeLeft <= 0) {
            clearInterval(timer); 
            endGame(); 
        }
    }, 1000); 
}


/* 3/ Compare ce que tape, l'utilisateur avec le texte affiché.*/
textInput.addEventListener("input", function (){
    const motsTapes = textInput.value.split(" "); 
    const motsOriginaux = currentParagraph.split(" "); 
    correctWords = 0; 

    for (let i = 0; i < motsTapes.length; i++) {
        if (motsTapes[i] === motsOriginaux[i]){
            correctWords++; 
        }
    }
});

/* 4/ Calcule un score. */

function calculateWPM () {
    const wpm = (correctWords / gameDuration) * 60; 
    return Math.round(wpm); 
}

function endGame(){
    textInput.disabled = true; 
    const wpm = calculateWPM();

    correctWordsDisplay.textContent = correctWords; 
    wpmDisplay.textContent = wpm; 

    resultsSection.style.display = "block"; 
}


/* 5/ Enregistre le score via une API REST. */
function saveScore(){
    const pseudo = pseudoInput.value.trim(); 
    if (!pseudo) {
        alert("Veuillez entrer un pseudo"); 
        return; 
    }
    const scoreData = {
        pseudo: pseudo, 
        timeLimit: gameDuration,
        wpm: calculateWPM()
    }; 
    fetch("https://speedtype.api.pierre-jehan.com/scores", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify(scoreData)
    })
    .then(response => response.json())
    .then(data=>{
        alert("Score enregistré ! "); 
        console.log(data); 
    })
    .catch(error => {
        console.error("Erreur POST :", error); 
    })
}
btnSave.addEventListener("click", saveScore); 


/* 6/ Affiche les meilleurs scores dans une modale. */ 
function loadScores(page = 1) {
    fetch('https://speedtype.api.pierre-jehan.com/scores?order[wpm]=desc&page=${page}',{
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        scoresBody.innerHTML = ""; 
        data["hydra:member"].forEach(score=>{
            const row = document.createElement("tr"); 
            row.innerHTML = `
                <td>${score.pseudo}</td>
                <td>${score.timeLimit}</td>
                <td>${score.wpm}</td>
                <td>${new Date(score.createdAt).toLocaleDateString()}</td>
            `;
            scoresBody.appendChild(row); 
        }); 
        pageInfo.textContent = `Page ${page}`; 
    })
    .catch(error => {
        console.error("Erreur GET scores :", error); 
    }); 
}
btnNext.addEventListener("click", function (){
    currentPage++; 
    loadScores(currentPage);
});

btnPrev.addEventListener("click", function (){
    if (currentPage > 1) {
        currentPage--; 
        loadScores(currentPage); 
    }
});

document.querySelector("#btn-close").addEventListener("click", function (){
    modal.close(); 
}); 

modal.addEventListener("click", function (event){
    if (event.target === modal) {
        modal.close();
    }
});