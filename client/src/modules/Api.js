import axios from 'axios';

const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV ===  'developer' 
  ? 'http://localhost:5002' : '';
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
  if(user.data === null) {
    await axios.post(`${rootURL}/login`, { name: player });
    user = await axios.get(`${rootURL}/player/${player}`);
  }
  user = user.data;
  const leaders = await axios.get(`${rootURL}/leaders`);
  const leader = leaders.data[0];
  return { maxScore: user.score, globalMaxScore: leader.score, globalName: leader.name };
}

async function deleteAccount(player) {
  const response = await axios.delete(`${rootURL}/player`, { data: { name: player }});
  return response.data;
}

async function updateUserMax(player, score) {
  const user = await axios.get(`${rootURL}/player/${player}`);
  if (score > user.data.score) {
    const response = await axios.put(`${rootURL}/player/${player}`, { score });
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


export default {
  login, deleteAccount, updateUserMax, getTop, getUserMax, getQuestion, setup,
};
