const account = require('./modules/Account');

test('login blank name', () => {
  const result = account.login('');
  expect(result).toBe(-1);
  expect(Object.keys(localStorage.__STORE__).length).toBe(0);
});

test('login invalid characters name', () => {
  const result = account.login('jkldjkfl&(*((');
  expect(result).toBe(-2);
  expect(Object.keys(localStorage.__STORE__).length).toBe(0);
});

test('login', () => {
  const result = account.login('Jay');
  expect(result.maxScore).toBe(0);
  expect(result.globalMaxScore).toBe(50);
  expect(result.globalName).toBe('JuJu');
  expect(localStorage.__STORE__['Jay']).toBe(JSON.stringify(0));
  expect(localStorage.__STORE__['top']).toBe(JSON.stringify([[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']]));
  expect(Object.keys(localStorage.__STORE__).length).toBe(2);
});

test('delete account', () => {
  const name = 'Jay';
  account.login(name);
  account.deleteAccount(name);
  expect(localStorage.__STORE__[name]).toBe(undefined);
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
});

test('update user max not bigger', () => {
  const name = 'Jay';
  account.login(name);
  account.updateUserMax(-10);
  expect(localStorage.__STORE__[name]).toBe(JSON.stringify(0));
});

test('update user max', () => {
  const name = 'Jay';
  account.login(name);
  account.updateUserMax(name, 10);
  expect(localStorage.__STORE__['Jay']).toBe(JSON.stringify(10));
});

test('getTop', () => {
  const top = account.getTop();
  expect(top).toStrictEqual([[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']]);
  expect(localStorage.__STORE__['top']).toBe(JSON.stringify([[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']]));
});

test('getTop null', () => {
  localStorage.setItem('top', null);
  const top = account.getTop();
  expect(top).toStrictEqual([[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']]);
  expect(localStorage.__STORE__['top']).toBe(JSON.stringify([[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']]));
});
