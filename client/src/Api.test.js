const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const api = require('./modules/Api');

let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

test('invalid login player', async () => {
  mock.onGet('/user').reply(200);
  mock.onPost('/login').reply(200, { player: { player: 'Jay', score: 0 } });
  const response = await api.default.login({ s: 'Jay' });
  expect(response).toBe(-3);
});

test('invalid login blank name', async () => {
  mock.onGet('/user').reply(200);
  mock.onPost('/login').reply(200, { player: { player: 'Jay', score: 0 } });
  const response = await api.default.login({ name: '' });
  expect(response).toBe(-3);
});

test('invalid login invalid characters', async () => {
  mock.onGet('/user').reply(200);
  mock.onPost('/login').reply(200, { player: { player: 'Jay', score: 0 } });
  const response = await api.default.login({ name: '$45jdf_' });
  expect(response).toBe(-2);
});

test('login player', async () => {
  mock.onGet('/user').reply(200);
  mock.onPost('/login').reply(200, { player: { player: 'Jay', score: 0 } });
  const response = await api.default.login({ name: 'Jay' });
  expect(response.player).toMatchObject({ player: 'Jay', score: 0 });
});

test('delete player', async () => {
  mock.onDelete('/deleteAccount').reply(200, { player: { player: 'serena' } });
  const response = await api.default.deleteAccount({ name: 'serena' });
  expect(response.player).toMatchObject({ player: 'serena' });
});

test('update max not bigger', async () => {
  mock.onGet('/userMax').reply(200, 50);
  const response = await api.default.updateUserMax({ name: 'serena' }, 20);
  expect(response).toBe(-1);
});

test('update max bigger', async () => {
  mock.onGet('/userMax').reply(200, 50);
  mock.onPost('/updateUser').reply(200, { player: { player: 'serena', score: 500 } });
  const response = await api.default.updateUserMax({ name: 'serena' }, 500);
  expect(response.player).toMatchObject({ player: 'serena', score: 500 });
});

test('get top players', async () => {
  mock.onGet('/top').reply(200, { top: { top: [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']] } });
  const response = await api.default.getTop();
  expect(response.top).toMatchObject({ top: [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']] });
});

test('get user max', async () => {
  mock.onGet('/userMax', { player: 'Jay' }).reply(200, 50);
  const response = await api.default.getUserMax({ name: 'Jay' });
  expect(response).toBe(50);
});

test('updateTop no new top', async () => {
  mock.onGet('/top').reply(200, { top: { top: [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']] } });
  mock.onPost('/top').reply(200, { top: { top: [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']] } });
  const response = await api.default.updateTop({ name: 'Jay' }, 0);
  expect(response).toBe(0);
});

test('updateTop new 3rd top', async () => {
  const name = 'Jay';
  const score = 10;
  mock.onGet('/top').reply(200, { top: { top: [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']] } });
  mock.onPost('/top').reply(200, { top: { top: [[50, 'JuJu'], [25, 'Ruthy'], [score, name]] } });
  const response = await api.default.updateTop({ name }, score);
  expect(response.top).toStrictEqual({ top: [[50, 'JuJu'], [25, 'Ruthy'], [score, name]] });
});

test('updateTop new 2nd top', async () => {
  const name = 'Jaden';
  const score = 30;
  mock.onGet('/top').reply(200, { top: { top: [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']] } });
  mock.onPost('/top').reply(200, { top: { top: [[50, 'JuJu'], [score, name], [25, 'Ruthy']] } });
  const response = await api.default.updateTop({ name }, score);
  expect(response.top).toStrictEqual({ top: [[50, 'JuJu'], [score, name], [25, 'Ruthy']] });
});

test('updateTop new 1st top', async () => {
  const name = 'Levi';
  const score = 100;
  mock.onGet('/top').reply(200, { top: { top: [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']] } });
  mock.onPost('/top').reply(200, { top: { top: [[score, name], [50, 'JuJu'], [25, 'Ruthy']] } });
  const response = await api.default.updateTop({ name }, score);
  expect(response.top).toStrictEqual({ top: [[score, name], [50, 'JuJu'], [25, 'Ruthy']] });
});
