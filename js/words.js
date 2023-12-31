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
    ],
    week10: [
        'Oasis',
        'Slowly',
        'Funny',
        'Pretty',
        'Honest',
        'Brave',
        'Strong',
        'Wise',
        'Kind',
        'Prism',
        'Edges',
        'Faces',
        'Vertices',
        'Shapes',
        'Triangular'
    ],
    week11: [
        'Reptile',
        'Sharp',
        'Spike',
        'Venom',
        'Venomous',
        'Puff up',
        'Scales',
        'Mice',
        'Colourful',
        'Aluminium',
        'Carbon',
        'Diesel',
        'Global warming',
        'Copper',
        'Smelting'
    ],
    week12: [
        'Adaptations',
        'Hump',
        'Eyelashes',
        'Foot',
        'Feet',
        'Leaf',
        'Leaves',
        'Underground',
        'Tunnel',
        'Enough',
        'Arrays',
        'Pattern',
        'Funnel',
        'Through',
        'December'
    ],
    week13: [
        'Square',
        'Triangle',
        'Circle',
        'Rectangle',
        'Optical',
        'Illusion',
        'Multiply',
        'Divide',
        'Noun',
        'Verb',
        'Adjective',
        'Light',
        'Shadow',
        'Blocked',
        'Even',
        'Odd'
    ],
    week14: [
        'Patient',
		'Impatient',
		'Polite',
		'Impolite',
		'Afraid',
		'Unafraid',
		'Always',
		'Usually',
		'Sometimes',
		'Never',
		'Centimetre',
		'Kilometre',
		'Height',
		'Width',
		'Conclusion'
    ]
};

function createSet(setName, random = true) {
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