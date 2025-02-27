const request = require('supertest');
const server = require('../app'); // Adjust the path if necessary

describe('API Endpoints', () => {
    afterAll(() => {
        server.close(); // Close the server after tests
    });

    it('GET /api/mitzvot/all should return all mitzvot', async () => {
        const response = await request(server).get('/api/mitzvot/all');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    
    it('GET /api/mitzvot/ai/search should return AI search results', async () => {
        const response = await request(server).get('/api/mitzvot/ai/search?q=test');
        expect(response.status).toBe(200);
        await expect(response.body).toBeInstanceOf(Object);
    },60000);

    it('GET /api/mitzvot/ai/search should return status 400 if no query is provided', async () => {
        const response = await request(server).get('/api/mitzvot/ai/search');
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('GET /api/mitzvot/search should return search results', async () => {
        const response = await request(server).get('/api/mitzvot/search?q=test');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /api/mitzvot/search should return 400 error if no query is provided', async () => {
        const response = await request(server).get('/api/mitzvot/search');
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('GET /api/mitzvot/search should return 404 if no mitzvot found', async () => {
        const response = await request(server).get('/api/mitzvot/search?q=fasfasfasfsaf');
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('GET /api/tanakh/random should return a random section from Tanakh', async () => {
        const response = await request(server).get('/api/tanakh/random');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('book');
        expect(response.body).toHaveProperty('line');
    });

    it('GET /api/tanakh/random/english should return a random section from Tanakh in English', async () => {
        const response = await request(server).get('/api/tanakh/random/english');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('book');
        expect(response.body).toHaveProperty('line');
        expect(response.body).toHaveProperty('english');
    });

    it('GET /api/mitzvot/source should return mitzvot by source', async () => {
        const response = await request(server).get('/api/mitzvot/source?source=test');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /api/mitzvot/source should return 400 error if no query param source is provided', async () => {
        const response = await request(server).get('/api/mitzvot/source');
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('GET /api/mitzvot/random should return a random mitzvah', async () => {
        const response = await request(server).get('/api/mitzvot/random');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('description');
    });

    it('POST /api/mitzvot/ai should return AI generated mitzvah summary', async () => {
        const response = await request(server)
            .post('/api/mitzvot/ai')
            .send({ prompt: 'test' });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('POST /api/mitzvot/ai should return 400 error if Body parameter "prompt" not provided', async () => {
        const response = await request(server)
            .post('/api/mitzvot/ai')
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('GET /api/mitzvot/ai/explain/:id should return AI explanation of mitzvah', async () => {
        const response = await request(server).get('/api/mitzvot/ai/explain/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('GET /api/mitzvot/ai/explain/:id should return 404 error if no mitzvah found', async () => {
        const response = await request(server).get('/api/mitzvot/ai/explain/9999');
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    });
});
