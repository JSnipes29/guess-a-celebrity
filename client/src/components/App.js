/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  useNavigate, BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import '../assets/App.css';
import '../assets/styles.css';
import LoginForm from './LoginForm';
import GamePage from './GamePage';
import Score from './ScorePage';

function Game({ user, scores, setUser }) {
  const navigate = useNavigate();
  const routeChange = (path, state) => {
    navigate(path, state);
  };
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<GamePage scores={scores} user={user} routeChange={routeChange} />} />
        <Route path="/score" element={<Score user={user} setUser={setUser} routeChange={routeChange} />} />
      </Routes>
    </div>
  );
}

function App() {
  // user
  const [user, setUser] = useState({ name: '' });
  // the scores to show while playing
  const [maxScores, setScores] = useState({
    userMax: 0,
    globalMax: 0,
    globalName: '',
  });
  return (
    <div className="App">
      {(user.name === '') ? (
        <div>
          <h1 style={{ marginBottom: '2.5em' }}>Guess That Celebrity</h1>
          <Box style={{ top: '50%' }} color="white" bgcolor="palevioletred" p={1}>
            <div>
              Enter your name:
            </div>
          </Box>
          <LoginForm setScores={setScores} setUsers={setUser} />
        </div>
      ) : (
        <Router>
          <Game scores={maxScores} user={user} setUser={setUser} />
        </Router>
      ) }
    </div>
  );
}

export default App;
