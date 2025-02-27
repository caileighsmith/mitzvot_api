import { render } from 'preact';
import { useState } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import './style.css';

export function App() {
    return (
        <div class="app">
            <header>
                <a href="https://preactjs.com" target="_blank">
                    <img src={preactLogo} alt="Preact logo" height="160" width="160" />
                </a>
                <h1>Get Started building Vite-powered Preact Apps</h1>
            </header>
            <section class="resources">
                <Resource
                    title="Learn Preact"
                    description="If you're new to Preact, try the interactive tutorial to learn important concepts"
                    href="https://preactjs.com/tutorial"
                />
                <Resource
                    title="Differences to React"
                    description="If you're coming from React, you may want to check out our docs to see where Preact differs"
                    href="https://preactjs.com/guide/v10/differences-to-react"
                />
                <Resource
                    title="Learn Vite"
                    description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
                    href="https://vitejs.dev"
                />
            </section>
            <section class="api-calls">
                <ApiData endpoint="/api/tanakh/random" title="Random Tanakh Section" />
                <ApiData endpoint="/api/tanakh/random/english" title="Random Tanakh Section (English)" />
                <ApiData endpoint="/api/mitzvot/all" title="All Mitzvot" />
                <ApiData endpoint="/api/mitzvot/random" title="Random Mitzvah" />
                <ApiSearchData endpoint="/api/mitzvot/search" title="Search Mitzvot" />
                <ApiSearchData endpoint="/api/mitzvot/ai/search" title="AI Search Mitzvot" />
                <ApiPostData endpoint="/api/mitzvot/ai" title="AI Mitzvah Summary" />
                <ApiExplainData endpoint="/api/mitzvot/ai/explain" title="AI Explain Mitzvah" />
            </section>
        </div>
    );
}

function Resource(props) {
    return (
        <a href={props.href} target="_blank" class="resource">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </a>
    );
}

function ApiData({ endpoint, title }) {
    const [data, setData] = useState(null);

    const fetchData = () => {
        fetch(`https://web-production-aae7.up.railway.app${endpoint}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div class="api-data">
            <h2>{title}</h2>
            <button onClick={fetchData}>Fetch Data</button>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Click the button to load data</p>
            )}
        </div>
    );
}

function ApiSearchData({ endpoint, title }) {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState('');

    const fetchData = () => {
        fetch(`https://web-production-aae7.up.railway.app${endpoint}?q=${query}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div class="api-search-data">
            <h2>{title}</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query"
            />
            <button onClick={fetchData}>Search</button>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Enter a query and click the button to search</p>
            )}
        </div>
    );
}

function ApiPostData({ endpoint, title }) {
    const [data, setData] = useState(null);
    const [prompt, setPrompt] = useState('');

    const fetchData = () => {
        fetch(`https://web-production-aae7.up.railway.app${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div class="api-post-data">
            <h2>{title}</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt"
            />
            <button onClick={fetchData}>Submit</button>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Enter a prompt and click the button to submit</p>
            )}
        </div>
    );
}

function ApiExplainData({ endpoint, title }) {
    const [data, setData] = useState(null);
    const [id, setId] = useState('');

    const fetchData = () => {
        fetch(`https://web-production-aae7.up.railway.app${endpoint}/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div class="api-explain-data">
            <h2>{title}</h2>
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Mitzvah ID"
            />
            <button onClick={fetchData}>Explain</button>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Enter a Mitzvah ID and click the button to explain</p>
            )}
        </div>
    );
}

render(<App />, document.getElementById('app'));