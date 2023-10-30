const voiceTypes = {
    'read': 'Samantha',
    'correct': 'Bubbles',
    'finish': 'Cellos'
};

function getVoice(type) {
    let voice = speechSynthesis.getVoices().filter(v => v.name === voiceTypes[type]);

    if (voice.length === 0) {
        voice = speechSynthesis.getVoices().filter(v => v.lang === 'en-US');
    }

    return voice[0];
}

function speak(text, voiceType ='read') {
    let voice = getVoice(voiceType);
 
    //speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    speechSynthesis.speak(utterance);
}