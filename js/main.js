const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start');
const setPicker = document.getElementById('pick-set');
const voicePicker = document.getElementById('pick-voice');
const changeVoice = document.getElementById('change-voice');
const testVoice = document.getElementById('test-voice');

const gameScreen = document.getElementById('game-screen');
const spellingInput = document.getElementById('spelling');
const submitBtn = document.getElementById('submit');
const playSoundBtn = document.getElementById('play-sound');
const showImageBtn = document.getElementById('show-image');
const counterText = document.getElementById('counter');
const historyList = document.getElementById('history');
const helperText = document.getElementById('helper');
const wordScreenImage = document.getElementById('word-image');

const endScreen = document.getElementById('end-screen');
const endScreenImage = document.getElementById('end-image');
const endStats = document.getElementById('end-stats');
const endNextRound = document.getElementById('end-next-round');

const Diff = new diff();

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

function imageForWord(word) {
    return fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${word}&rating=g`)
        .then(d => d.json())
        .then(data => data.data.images.original.url);
}

function win() {
    speak('Good work Ala!', 'finish');
    changeScreen('end');

    let winWords1 = ['petting', 'cuddling', 'cute', 'funny', 'interesting', 'adorable', 'small', 'baby', 'friendly'].sort(() => Math.random() - 0.5);
    let winWords2 = ['pet', 'animal', 'cat', 'bird', 'dog', 'unicorn'].sort(() => Math.random() - 0.5);

    imageForWord(winWords1[0] + ' ' + winWords2[0])
        .then(url => endScreenImage.innerHTML = `<img src="${url}" />`);

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
        const diff = Diff.main(input, correct);

        diff.forEach(([type, string]) => {
            if (type === -1) {
                helperText.innerHTML += `<del>${string}</del>`;
            } else if (type === 1) {
                helperText.innerHTML += `<ins>&#63;</ins>`;
            } else {
                helperText.innerHTML += `<span>${string}</span>`;
            }
        });

        showImageBtn.removeAttribute('disabled');
    }

    spellingInput.classList.add('wrong');
    speak(`Try again. The word is: ${currentWord}.`);
}

function loadWord() {
    currentWord = wordsAvailable.pop();

    console.log('word: ', currentWord);

    showImageBtn.setAttribute('disabled', 'disabled');
    wordScreenImage.innerHTML = '';

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

showImageBtn.addEventListener('click', () => {
    if (rejectedCount > 0) {
        imageForWord(currentWord)
            .then(url => wordScreenImage.innerHTML = `<img src="${url}" />`);
    }
});

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

getSets().forEach((set, idx, array) => {
    const option = document.createElement('option');
    option.value = set.name;
    option.innerText = `${set.name} (${set.size} words)`;

    if(array.length - 1 === idx) {
        option.setAttribute("selected", "selected");
    }

    setPicker.prepend(option);
});

changeVoice.addEventListener('click', () => {
    voicePicker.innerText = '';

    getVoices().forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} (${voice.lang})`;
    
        voicePicker.prepend(option);
    });
});

voicePicker.addEventListener('change', () => {
    voiceTypes.read = voicePicker.value;
});

testVoice.addEventListener('click', () => {
    speak('Ala is great at spelling!');
});