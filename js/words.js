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
    ],
    week20: [
        'Pencil holder',
        'Planter',
        'Collection',
        'Collector',
        'Invention',
        'Inventor',
        'Director',
        'Direction',
        'Blood vessels',
        'Intestines',
        'Stomach',
        'Brain',
        'Heart rate',
        'Lungs',
        'Nutrients'
    ],
    week21: [
        'complained',
        'triceratops',
        'pliers',
        'wires',
        'tools',
        'jumperoo',
        'pygmy goat',
        'bicycles',
        'municipal',
        'shred',
        'welder',
        'thundered',
        'tips',
        'spits',
        'prehistoric'
    ],
    week22: [
        'four-story building',
        'scientists',
        'alike',
        'existed',
        'fossils',
        'million',
        'nest',
        'studied',
        'timeline',
        'instruction',
        'dinosaur',
        'footprints',
        'omnivore',
        'carnivore',
        'herbivore'
    ],
    week23: [
        'Weapon',
        'Huge',
        'Grown-up',
        'Balance',
        'Perhaps',
        'Blank',
        'Complement',
        'Mentally',
        'Food chain',
        'Consumer',
        'Energy',
        'Producers',
        'Grasshopper',
        'Hawk',
        'Could',
    ],
    week24: [
        'heavy',
        'should',
        'discoveries',
        'information',
        'both',
        'language',
        'feathers',
        'ninety-nine',
        'biggest',
        'graphs',
        'data',
        'axes',
        'axis',
        'bar chart',
        'carroll diagram'
    ],
    week25: [
        'multiplication',
        'division',
        'remainder',
        'quotient',
        'dividend',
        'divisor',
        'riddles',
        'puzzles',
        'codes',
        'neighbour',
        'Easter',
        'stripes',
        'spots',
        'without',
        'different'
    ],
    week26: [
        'climbed',
        'travelled',
        'walked',
        'touched',
        'mountain',
        'country',
        'bravely',
        'whisper',
        'tossed',
        'food chain',
        'primary',
        'secondary',
        'tertiary',
        'producer'
    ],
    week27: [
        'fair',
        'solution',
        'expensive',
        'delicious',
        'pay',
        'enjoying',
        'message',
        'decode',
        'caught',
        'messenger',
        'Julius Ceasar',
        'forcemeter',
        'standard units',
        'newton',
        'constitution'
    ],
    week33: [
        'muscles',
        'together',
        'ankle',
        'spine',
        'elbow',
        'knee',
        'skull',
        'wrist',
        'blood vessels',
        'breathe',
        'exercise',
        'friction',
        'surface',
        'grip',
        'measurements'
    ],
    // new year
    week34: [
        'keen',
        'community',
        'aunt',
        'cousin',
        'both',
        'lively',
        'brilliant',
        'caring',
        'linear',
        'sequence',
        'difference',
        'rule',
        'frame',
        'jaw',
        'rib cage',
        'skull',
        'skeleton',
        'spine',
        'bones',
        'neighbourhood'
    ],
    week35: [
        "leaflet",
        "hospital",
        "charity",
        "raise money",
        "event",
        "imperative",
        "adverb",
        "thousand",
        "million",
        "digit",
        "temperature",
        "treasure",
        "follow",
        "surgery",
        "hidden",
        "groan",
        "contract",
        "relax",
        "attach",
        "alliteration"
    ],
    week36: [
        "freezing",
        "icy",
        "dry",
        "huge",
        "wide",
        "wet",
        "beautiful",
        "mountains",
        "humid",
        "cool",
        "warm",
        "landscape",
        "rainforest",
        "timetable",
        "leap year",
        "interval",
        "identify",
        "vertebrate",
        "invertebrate",
        "exoskeleton"
    ],
    week37: [
        "germs",
        "infect",
        "instructions",
        "medicines",
        "prevent",
        "explore",
        "orbit",
        "support",
        "discover",
        "poisonous",
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "Pluto"
    ],
    week38: [
        "natural",
        "lightning",
        "northern lights",
        "constellation",
        "rainbow",
        "sunset",
        "satellite",
        "telescope",
        "space shuttle",
        "rover",
        "compose",
        "decompose",
        "whole",
        "special",
        "bright",
        "astronaut",
        "space",
        "difference",
        "regroup",
        "technology"
    ],
    week39: [
        "balcony",
        "roof",
        "bricks",
        "wood",
        "wool",
        "chimney",
        "ecological",
        "solar panels",
        "detached house",
        "stilt house",
        "yurt",
        "bungalow",
        "apartment",
        "canal boat",
        "energy",
        "predict",
        "movement",
        "underground",
        "environment"
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