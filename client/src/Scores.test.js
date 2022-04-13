const { login } = require('./modules/Account');
const scores = require('./modules/Scores');

const name = 'Jay';

test('not top score', () => {
  localStorage.clear();
  login(name);
  const score = 0;
  scores.updateTop(name, score);
  expect(localStorage.__STORE__['top']).toBe(JSON.stringify([[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']]));
});

test('new 3rd score', () => {
  localStorage.clear();
  login(name);
  const score = 10;
  scores.updateTop(name, score);
  expect(localStorage.__STORE__['top']).toBe(JSON.stringify([[50, 'JuJu'], [25, 'Ruthy'], [score, name]]));
});

test('new 2nd score', () => {
  localStorage.clear();
  login(name);
  const score = 30;
  scores.updateTop(name, score);
  expect(localStorage.__STORE__['top']).toBe(JSON.stringify([[50, 'JuJu'], [score, name], [25, 'Ruthy']]));
});

test('new 1st score', () => {
  localStorage.clear();
  login(name);
  const score = 100;
  scores.updateTop(name, score);
  expect(localStorage.__STORE__['top']).toBe(JSON.stringify([[score, name], [50, 'JuJu'], [25, 'Ruthy']]));
});

test('get user max', () => {
  localStorage.clear();
  login(name);
  const userMax = scores.getUserMax(name);
  expect(userMax).toBe('0');
});
