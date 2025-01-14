const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3000;

const {toEnglish} = require('./util/hebrewToEnglishFunction');
const {trimMarkdown} = require('./util/trimMarkdownFunction').default;
const { mitzvahSummary, explainMitzvah } = require('./aiFunction');

const { getRandomSection } = require('./util/tanakhUtilFunction');

app.use(cors()); // Enable CORS

const mitzvot = require('./mitzvot.json');

app.get('/api/mitzvot/all', (req, res) => {
    res.json(mitzvot);
});

app.get('/api/mitzvot/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send({ error: 'Query parameter "q" is required' });
    }

    const results = mitzvot.filter(mitzvah => mitzvah.description.toLowerCase().includes(query.toLowerCase()));
    res.json(results);
});

app.get('/api/tanakh/random', (req, res) => {
    res.json(getRandomSection());
});

app.get('/api/tanakh/random/english', (req, res) => {
    const section = getRandomSection();
    toEnglish(section.line).then(english => {
        res.json({
            book: section.book,
            line: section.line,
            english
        });
    });
});

app.get('/api/mitzvot/source', (req, res) => {
    const sourceQuery = req.query.source;
    if (!sourceQuery) {
        return res.status(400).send({ error: 'Query parameter "source" is required' });
    }

    const results = mitzvot.filter(mitzvah => mitzvah.source.toLowerCase().includes(sourceQuery.toLowerCase()));
    res.json(results);
});

app.get('/api/mitzvot/random', (req, res)=>{
    const randomIndex = Math.floor(Math.random() * mitzvot.length);
    res.json(mitzvot[randomIndex]);
})

// parsing JSON bodies
app.use(express.json());

app.post('/api/mitzvot/ai', async (req, res) => {
    // Requires JSON request body data to be present in form of { "prompt": "..." }
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).send({ error: 'Body parameter "prompt" is required' });
    }
    const response = await mitzvahSummary(prompt);
    console.log(response);
    res.send(response);
});

app.get('/api/mitzvot/ai/explain/:id', async (req, res)=>{
    const id = Number(req.params.id);
    if (id > 613 || id < 1) {
        return res.status(404).send({ error: 'Mitzvah not found. Remember, there are only 613 official Mitzvot!' });
    }
    const response = await explainMitzvah(id);

    if (response.error) {
        return res.status(404).send(response);
    }   
    //trimMarkdown just takes a JSON string and returns the parsed JSON object
    res.send(trimMarkdown(response));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});