import axios from 'axios';

// const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV ===  'developer' 
//  ? 'http://localhost:5002' : '';
const rootURL = 'http://localhost:5002'
async function login(player) {
  const regex = /^[0-9a-zA-Z]+$/;
  if (!player.name) {
    return -3;
  }
  if (!player.name.match(regex)) {
    return -2;
  } 
  const response = await axios.post(`${rootURL}/login`, { player: `${player.name}` });
  return response.data;
}

async function setup(player) {
  const regex = /^[0-9a-zA-Z]+$/;
  if (!player) {
    return -3;
  }
  if (!player.match(regex)) {
    return -2;
  }
  let user = await axios.get(`${rootURL}/player/${player}`);
  if(user === null) {
    await axios.post(`${rootURL}/login`, { player: `${player}` });
    user = await axios.get(`${rootURL}/player/${player}`);
  }
  user = user.data;
  const leaders = await axios.get(`${rootURL}/leaders`);
  const leader = leaders.data[0];
  return { maxScore: user.score, globalMaxScore: leader.score, globalName: leader.name };
}

async function deleteAccount(player) {
  const response = await axios.delete(`${rootURL}/deleteAccount`, { player: `${player.name}` });
  return response.data;
}

async function updateUserMax(player, score) {
  const currentMax = await axios.get(`${rootURL}/userMax`, { player: `${player.name}` });
  if (score > currentMax.data) {
    const response = await axios.post(`${rootURL}/updateUser`, { player: `${player.name}` });
    return response.data;
  }
  return -1;
}

async function getTop() {
  const response = await axios.get(`${rootURL}/leaders`);
  return response.data;
}

async function getQuestion(id) {
  const response = await axios.get(`${rootURL}/question/${id}`);
  return response.data;
}

async function getUserMax(player) {
  const userMax = await axios.get(`${rootURL}/player/${player}`);
  return userMax.data.score;
}

async function updateTop(player, s) {
  const initialResponse = await getTop();
  const data = initialResponse.top;
  let { top } = data;
  const { name } = player;
  let top1 = top[0][0];
  let top1Name = top[0][1];
  let top2 = top[1][0];
  let top2Name = top[1][1];
  let top3 = top[2][0];
  let top3Name = top[2][1];
  if (s > top3) {
    top3 = s;
    top3Name = name;
    if (top3 > top2) {
      const temp = top3;
      const tempName = top3Name;
      top3 = top2;
      top3Name = top2Name;
      top2 = temp;
      top2Name = tempName;
      if (top2 > top1) {
        const temp2 = top2;
        const tempName2 = top2Name;
        top2 = top1;
        top2Name = top1Name;
        top1 = temp2;
        top1Name = tempName2;
      }
    }
  } else {
    return 0;
  }
  top = [[top1, top1Name], [top2, top2Name], [top3, top3Name]];
  const response = await axios.post(`${rootURL}/top`, { top });
  return response.data;
}

export default {
  login, deleteAccount, updateUserMax, getTop, getUserMax, updateTop, getQuestion, setup,
};
