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

}); 










/* 2/ Lance un chrono. */











/* 3/ Compare ce que tape, l'utilisateur avec le texte affiché.*/











/* 4/ Calcule un score. */














/* 5/ Enregistre le score via une API REST. */














/* 6/ Affiche les meilleurs scores dans une modale. */ 

