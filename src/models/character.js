import skill from "./skill.js";

const character = () => ({
    name: '',
    heroName: '',
    powerLevel: '',
    origin: '',
    info: '',
    attributes: [],
    milestones: {
        minor: [],
        major: [],
        usedMinor: [],
        usedMajor: []
    },
    drives: [],
    weaknesses: [],
    skills: [],
    resources: {
        quips: []
    },
    aspects: [],
    tracks: [],
    notes: []
});

export default character;
