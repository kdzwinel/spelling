const spellingInput = document.getElementById('spelling');
const submitBtn = document.getElementById('submit');
const playSoundBtn = document.getElementById('play-sound');
const counterText = document.getElementById('counter');
const historyList = document.getElementById('history');
const helperText = document.getElementById('helper');
const startBtn = document.getElementById('start');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');

const words = {
    months: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ],
    week8: [
        'necklace',
        'noun',
        'brave',
        'happy',
        'can',
        'could',
        'couldn\'t',
        'sad',
        'proud',
        'parents',
        'memory',
        'memories',
        'teddy bear',
        'beach',
        'peak',
        'picnic',
    ],
    test: ['apple', 'cat']
};

function getVoice(name) {
    let voice = speechSynthesis.getVoices().filter(v => v.name === name);

    if (voice.length === 0) {
        voice = speechSynthesis.getVoices().filter(v => v.lang === 'en-US');
    }

    readVoice = voice[0];
    console.log('Voice: ', readVoice);

    return readVoice;
}

let wordsAvailable = [];
let currentWord = null;
let rejectedCount = 0;

function speak(text, voice) {
    if (!voice) {
        voice = getVoice('Samantha');
    }

    //speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    speechSynthesis.speak(utterance);
}

function updateCounter() {
    counterText.innerText = `Words left: ${wordsAvailable.length}`;
}

function approved() {
    rejectedCount = 0;
    helperText.innerText = '';

    if (wordsAvailable.length > 0) {
        speak('Good!', getVoice('Bubbles'));
        loadWord();
    } else {
        win();
    }

    updateCounter();
    spellingInput.value = '';
}

function win() {
    speak('Good work Ala!', getVoice('Cellos'));
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
    wordsAvailable = [];
    set.forEach(i => wordsAvailable.push(i));
    wordsAvailable = wordsAvailable.sort((a,b) => Math.random() > 0.5);

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
    start(words.week8);
});