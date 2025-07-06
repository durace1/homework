/*
import { test, expect } from '@playwright/test';


const URL = 'https://apichallenges.herokuapp.com/';
let token;
test.describe('Challenge', () => {
    test.beforeAll(async ({ request }) => {
        const response = await request.post(`${URL}challenger`);
        const headers = await response.headers();
        token = headers['x-challenger'];
        //
        console.log(`${URL}gui/challenges/${token}`);
    });

    test('получить список челленджей', async ({ request }) => {
        const response = await request.get(`${URL}challenges`, {
            headers: {
                'x-challenger': token,
            },
        });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.challenges.length).toBe(59);
    });
})


test.describe.only('Challenge', () => {
    test.beforeAll(async ({ request }) => {
        const api = new Api(request);
        const response = await api.challenger.post();

        const headers = await response.headers();
        token = headers['x-challenger'];
        //console.log(`${URL}gui/challenges/${token}`);
    });

    test('получить список челленджей', async ({ request }) => {
    const api = new Api(request);
    const response = await api.challenges.get(token);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.challenges.length).toBe(59);
    });

    test('#03 GET /todos(200)', async ({ request }) => {
    const api = new Api(request);
    const response = await api.todos.get(token);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.todos.length).toBe(10);
    });
*/