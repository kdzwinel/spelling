const spellingInput = document.getElementById('spelling');
const submitBtn = document.getElementById('submit');
const playSoundBtn = document.getElementById('play-sound');
const counterText = document.getElementById('counter');
const historyList = document.getElementById('history');
const helperText = document.getElementById('helper');
const startBtn = document.getElementById('start');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');

let wordsAvailable = [];
let currentWord = null;
let rejectedCount = 0;

function updateCounter() {
    counterText.innerText = `Words left: ${wordsAvailable.length}`;
}

function approved() {
    rejectedCount = 0;
    helperText.innerText = '';

    if (wordsAvailable.length > 0) {
        speak('Good!', 'correct');
        loadWord();
    } else {
        win();
    }

    updateCounter();
    spellingInput.value = '';
}

function win() {
    speak('Good work Ala!', 'finish');
    submitBtn.setAttribute('disabled', 'disabled');
    playSoundBtn.setAttribute('disabled', 'disabled');
    spellingInput.setAttribute('disabled', 'disabled');
}

function rejected() {
    rejectedCount++;

    if (rejectedCount >= 3) {
        helperText.innerText = currentWord;
    }

    spellingInput.classList.add('wrong');
    speak(`Try again. The word is: ${currentWord}.`);
}

function loadWord() {
    currentWord = wordsAvailable.pop();

    console.log('word: ', currentWord);

    speak(currentWord);
}

function submitWord() {
    let text = '';

    if (spellingInput.value.toLowerCase() === currentWord.toLowerCase()) {
        text = `${spellingInput.value} ✅`;
        approved();
    } else {
        text = `${spellingInput.value} ❌`;
        rejected();
    }

    const li = document.createElement('li');
    li.innerText = text;
    historyList.prepend(li);
}

submitBtn.addEventListener('click', () => submitWord());

spellingInput.addEventListener('keydown', (e) => {
    spellingInput.classList.remove('wrong');

    if (e.key === 'Enter') {
        submitWord()
    }
});

playSoundBtn.addEventListener('click', () => speak(currentWord));

function start(set) {
    wordsAvailable = createSet(set);

    spellingInput.focus();

    loadWord();
    updateCounter();
}

window.onbeforeunload = () => {
    if (wordsAvailable.length > 0) {
        speak('Are you sure? All progress will be lost.');
        return 'Are you sure? All progress will be lost.';
    }
};

startBtn.addEventListener('click', () => {
    gameScreen.classList.remove('hidden');
    startScreen.classList.add('hidden');
    start('week8');
});