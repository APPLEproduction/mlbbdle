// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// Hero Data
const heroes = [
    {
        name: "Layla",
        splashArt: "https://example.com/layla.jpg",
        quote: "Keep it up, until you're as brilliant as me!",
        ability: "Malefic Bomb",
        role: "Marksman"
    },
    {
        name: "Alucard",
        splashArt: "https://example.com/alucard.jpg",
        quote: "Nothing lasts forever, we can change the future.",
        ability: "Fission Wave",
        role: "Fighter"
    },
    // Add more heroes here...
];

// Leaderboard array (to be replaced with database in production)
let leaderboard = [];

// Get a random hero
app.get('/random-hero', (req, res) => {
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    const type = req.query.type || 'name'; // default to 'name'

    let response = { name: randomHero.name };

    switch (type) {
        case 'quote':
            response.quote = randomHero.quote;
            break;
        case 'ability':
            response.ability = randomHero.ability;
            break;
        case 'splash':
            response.splashArt = randomHero.splashArt;
            break;
        default:
            response.name = randomHero.name;
    }

    res.json(response);
});

// Post new score to the leaderboard
app.post('/submit-score', (req, res) => {
    const { username, score } = req.body;
    leaderboard.push({ username, score });
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10); // Keep top 10 scores
    res.json({ message: "Score submitted successfully!", leaderboard });
});

// Get leaderboard
app.get('/leaderboard', (req, res) => {
    res.json(leaderboard);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
