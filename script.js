/* 1/ Charge un paragraphe depuis une API. */

fetch('https://speedtype.api.pierre-jehan.com/')

const btnStart = document.querySelector("#btn-start"); 
const selectDuration = document.querySelector("#duration"); 
const timeLeftDisplay = document.querySelector("#time-left"); 
const wordsDisplay = document.querySelector("#words-display"); 
const textInput = document.querySelector("#text-input"); 

btnStart.addEventListener("click", function(){
    const duree = parseInt(selectDuration.value); 
    timeLeftDisplay.textContent =duree; 
    fetch('https://speedtype.api.pierre-jehan.com/', {
        headers: {
            "Accept": "application/json"
        }
    })

    .then(response => response.json())
    .then(data => {
        wordsDisplay.textContent = data.content; 
        textInput.disabled = false; 
        textInput.focus(); 
    })
    .catch(error => {
        console.error("Erreur : ", error); 
    });
    startTimer(duree); 

}); 

/* 2/ Lance un chrono. */
let timeLeft; 
let timer; 

function startTimer(duree) {
    timeleft = duree; 
    timer = setInterval(function(){
        timeLeft--; 
        document.querySelector("#time-left").textContent = timeLeft; 
        if (timeLeft <= 0) {
            clearInterval(timer); 
            endGame(); 
        }
    }, 1000); 
}
function endGame() {
    document.querySelector("#text-input").disabled = true; 
    alert("Temps écoulé !"); 
}

/* 3/ Compare ce que tape, l'utilisateur avec le texte affiché.*/











/* 4/ Calcule un score. */














/* 5/ Enregistre le score via une API REST. */














/* 6/ Affiche les meilleurs scores dans une modale. */ 

