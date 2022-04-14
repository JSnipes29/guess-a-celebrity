/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles.css';
import Account from '../modules/Account';
import Api from '../modules/Api';

export default function Score({ user, setUser, routeChange }) {
  let { state } = useLocation();
  if (state === null) {
    state = {
      score: 0,
    };
  }
  let { score } = state;
  if (score === undefined) {
    score = 0;
  }
  // Get the top scores
  const [scores, setScores] = useState([{ name: 'Loading', score: 'Loading'}, { name: 'Loading', score: 'Loading'}, { name: 'Loading', score: 'Loading'}]);
  useEffect(() => {
    async function fetch() {
      await Api.getTop().then((data) => setScores(data));
    }
    fetch();
  }, [])
  const deleteAccount = (async() => {
    await Api.deleteAccount(user.name);
    setUser({
      name: '',
    });
    routeChange('/', {});
  });
  const playAgain = (() => {
    routeChange('/');
  });
  return (
    <div>
      <div id="scores">Scores:</div>
      <div id="yours">Your Score</div>
      <h1>{score}</h1>
      <button
        type="submit"
        onClick={deleteAccount}
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          color: '#FF0000',
        }}
      >
        Delete Account
      </button>
      <br />
      <br />
      {
        scores.map((s, index) => (
          <>
            <div id={`score${index + 1})`}>
              {`${index + 1})`}
            </div>
            <div>
              {`${s.name}: ${s.score}`}
            </div>
            <br />
            <br />
          </>
        ))
        }
      <button
        type="submit"
        onClick={playAgain}
        className="button"
        style={{
          bottom: 5,
          background: '#008080',
        }}
      >
        Play Again
      </button>
    </div>
  );
}
