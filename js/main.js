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

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ix7d37l86S4mTyWNzuEm7elI3OCfJatn&s=${winWords1[0] + ' ' + winWords2[0]}&rating=g`)
        .then(d => d.json())
        .then(data => {
            endScreenImage.innerHTML = `<img src="${data.data.images.original.url}" />`;
        });

    const ul = document.createElement('ul');
    let stars = 0;

    stats.forEach(stat => {
        const li = document.createElement('li');
        li.innerText = `${stat.word} - ${stat.attempts} attempt${stat.attempts > 1 ? 's' : ''} ${stat.attempts === 1 ? '⭐️' : ''}`;

        if (stat.attempts === 1) {
            stars++;
        }

        ul.appendChild(li);
    });

    endStats.innerHTML = `<p>You've got ${stars} star${stars > 1 ? 's' : ''} out of ${stats.length}.</p>`;
    endStats.appendChild(ul);
}

function rejected(input, correct) {
    rejectedCount++;

    if (rejectedCount >= 3) {
        helperText.innerText = `correct spelling is: "${currentWord}"`;
    } else {
        helperText.innerHTML = '';
        input.split('').forEach((letter, idx) => {
            helperText.innerHTML += (letter === correct[idx]) ? letter : `<u>${letter}</u>`;
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
        rejected(userInput, currentWord);
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

function start() {
    wordsAvailable = createSet(setPicker.value);

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
    changeScreen('game');
    start();
});

getSets().forEach(set => {
    const option = document.createElement('option');
    option.value = set.name;
    option.innerText = `${set.name} (${set.size} words)`;

    setPicker.prepend(option);
});