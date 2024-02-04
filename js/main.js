const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start');
const setPicker = document.getElementById('pick-set');

const gameScreen = document.getElementById('game-screen');
const spellingInput = document.getElementById('spelling');
const submitBtn = document.getElementById('submit');
const playSoundBtn = document.getElementById('play-sound');
const counterText = document.getElementById('counter');
const historyList = document.getElementById('history');
const helperText = document.getElementById('helper');

const endScreen = document.getElementById('end-screen');
const endScreenImage = document.getElementById('end-image');
const endStats = document.getElementById('end-stats');
const endNextRound = document.getElementById('end-next-round');

const GIPHY_API_KEY = 'ix7d37l86S4mTyWNzuEm7elI3OCfJatn';

let wordsAvailable = [];
let currentWord = null;
let rejectedCount = 0;
const stats = [];

function changeScreen(name) {
    const screenMap = {
        start: startScreen,
        game: gameScreen,
        end: endScreen
    };

    Object.keys(screenMap).forEach(key => {
        if (key === name) {
            screenMap[key].classList.remove('hidden');
        } else {
            screenMap[key].classList.add('hidden');
        }
    })
}

function updateCounter() {
    counterText.innerText = `Words left: ${wordsAvailable.length}`;
}

function approved() {
    stats.push({word: currentWord, attempts: 1 + rejectedCount});

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
    changeScreen('end');

    let winWords1 = ['petting', 'cuddling', 'cute', 'funny', 'interesting', 'adorable', 'small', 'baby', 'friendly'].sort(() => Math.random() - 0.5);
    let winWords2 = ['pet', 'animal', 'cat', 'bird', 'dog', 'unicorn'].sort(() => Math.random() - 0.5);

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${winWords1[0] + ' ' + winWords2[0]}&rating=g`)
        .then(d => d.json())
        .then(data => {
            endScreenImage.innerHTML = `<img src="${data.data.images.original.url}" />`;
        });

    const ul = document.createElement('ul');
    let stars = 0;
    let repeatWords = 0;

    stats.forEach(stat => {
        const li = document.createElement('li');
        li.innerText = `${stat.word} - ${stat.attempts} attempt${stat.attempts > 1 ? 's' : ''} ${stat.attempts === 1 ? '⭐️' : ''}`;

        if (stat.attempts === 1) {
            stars++;
        } else {
            repeatWords++;
        }

        ul.appendChild(li);
    });

    if (repeatWords === 0) {
        endNextRound.style.display = 'none';
    } else {
        endNextRound.innerText = `Next Round (${repeatWords} words)`;
    }

    endStats.innerHTML = `<p>You've got ${stars} star${stars > 1 ? 's' : ''} out of ${stats.length}.</p>`;
    endStats.appendChild(ul);
}

function rejected(input, correct) {
    rejectedCount++;

    if (rejectedCount >= 2) {
        helperText.innerText = `correct spelling is: "${currentWord}"`;
    } else {
        helperText.innerHTML = '';
        input.split('').forEach((letter, idx) => {
            helperText.innerHTML += (letter === correct[idx]) ? letter : `<span class='wrong-letter'>${letter}</span>`;
        });
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
    const userInput = spellingInput.value.trim().toLowerCase();
    const correctValue = currentWord.toLowerCase();

    if (userInput === correctValue) {
        text = `${spellingInput.value} ✅`;
        approved();
    } else {
        text = `${spellingInput.value} ❌`;
        rejected(userInput, correctValue);
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

endNextRound.addEventListener('click', () => {
    // only words that were not provided correctly on first attempt
    start(stats.filter(s => s.attempts > 1).map(s => s.word));
});

function start(words) {
    changeScreen('game');

    currentWord = null;
    rejectedCount = 0;
    stats.length = 0;
    wordsAvailable = words;

    historyList.innerHTML = '';
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
    start(createSet(setPicker.value));
});

getSets().forEach(set => {
    const option = document.createElement('option');
    option.value = set.name;
    option.innerText = `${set.name} (${set.size} words)`;

    setPicker.prepend(option);
});