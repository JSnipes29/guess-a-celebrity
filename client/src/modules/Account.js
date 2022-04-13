function login(username) {
  const regex = /^[0-9a-zA-Z]+$/;
  if (username === '') {
    return -1;
  }
  if (!username.match(regex)) {
    return -2;
  }
  let maxScore = localStorage.getItem(username);
  let top = JSON.parse(localStorage.getItem('top'));
  if (top === null || top === 'null') {
    top = [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']];
    localStorage.setItem('top', JSON.stringify(top));
  }
  if (maxScore === null || maxScore === 'null') {
    maxScore = 0;
    localStorage.setItem(username, 0);
  }
  const globalMaxScore = top[0][0];
  const globalName = top[0][1];
  console.log(maxScore);
  return { maxScore, globalMaxScore, globalName };
}

function deleteAccount(name) {
  localStorage.removeItem(name);
}

function updateUserMax(name, score) {
  const userMax = localStorage.getItem(name);
  if (score > userMax) {
    localStorage.setItem(name, score);
  }
}

function getTop() {
  let top = JSON.parse(localStorage.getItem('top'));
  if (top === null || top === 'null' || top === undefined) {
    top = [[50, 'JuJu'], [25, 'Ruthy'], [0, 'Dad']];
    localStorage.setItem('top', JSON.stringify(top));
  }
  return top;
}
module.exports = {
  login, deleteAccount, updateUserMax, getTop,
};
