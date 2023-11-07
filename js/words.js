const words = {
    test: ['apple', 'cat'],
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
    week9: [
        'dissolving',
        'soluble',
        'insoluble',
        'buy',
        'change',
        'desert',
        'dessert',
        'sandy',
        'rocky',
        'antarctica',
        'degrees',
        'largest',
        'tallest',
        'drier',
        'colder'
    ]
};

function createSet(setName, random=true) {
    let set = [];

    words[setName].forEach(i => set.push(i));
    
    if (random) {
        set = set.sort(() => Math.random() - 0.5);
    }

    return set;
}

function getSets() {
    const setNames = Object.keys(words);

    return setNames.map(name => ({
        name,
        size: words[name].length
    }));
}