let listTheSecretNumber = [];
let limitNumber = 50;
let secretNumber = generateRandomNumber();
let attempts = 1;


function displayTextOnScreen(tag, text){
    let field = document.querySelector(tag);
    field.innerHTML = text;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.85; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API no supported in this browser.");
    }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1);
    let numberOfElementsInTheList = listTheSecretNumber.length;

    if (numberOfElementsInTheList == limitNumber){
        listTheSecretNumber = [];
    }

    if (listTheSecretNumber.includes(chosenNumber)){
        return generateRandomNumber();
    } else {
        listTheSecretNumber.push(chosenNumber);
        console.log(listTheSecretNumber);
        return chosenNumber;
    }
}

function clearField() {
    guess = document.querySelector('input');
    guess.value = '';
}

displayInitialMessage();
function displayInitialMessage() {
    displayTextOnScreen('h1', 'Game of the secret number');
    displayTextOnScreen('p' , 'Choose a number between 1 and 10');
    document.getElementById('restart').setAttribute('disabled' , true);
}

function restartGame() {
    secretNumber = generateRandomNumber();
    clearField();
    attempts = 1;
    displayInitialMessage();
}


function checkGuess() {
    let guess = document.querySelector('input').value;
    if (guess == secretNumber){
        displayTextOnScreen('h1', 'You got it right!');
        let wordAttempt = attempts > 1 ? 'attempts' : 'attempt';
        let messageAttempts = `You discovered the secret number with ${attempts} ${wordAttempt}!`;
        displayTextOnScreen('p', messageAttempts);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if( guess > secretNumber) {
            displayTextOnScreen('p', ' The secret number is less!');
        } else{
            displayTextOnScreen('p', 'The secret number is greater');
        }
        attempts++;
        clearField();
    }
}

