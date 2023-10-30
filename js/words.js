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

function createSet(setName, random=true) {
    let set = [];

    words[setName].forEach(i => set.push(i));
    
    if (random) {
        set = set.sort(() => Math.random() > 0.5);
    }

    return set;
}