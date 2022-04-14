/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import questions from '../assets/questions/questions.json';
import '../assets/styles.css';
import Scores from '../modules/Scores';
import Api from '../modules/Api';

const c1 = require('../assets/questions/celeb1.jpeg');
const c2 = require('../assets/questions/celeb2.jpeg');
const c3 = require('../assets/questions/celeb3.jpeg');
const c4 = require('../assets/questions/celeb4.jpeg');
const c5 = require('../assets/questions/celeb5.jpeg');
const c6 = require('../assets/questions/celeb6.jpeg');
const c7 = require('../assets/questions/celeb7.jpeg');
const c8 = require('../assets/questions/celeb8.jpeg');
const c9 = require('../assets/questions/celeb9.jpeg');
const c10 = require('../assets/questions/celeb10.jpeg');

const cmap = new Map([
  ['celeb1.jpeg', c1], ['celeb2.jpeg', c2], ['celeb3.jpeg', c3], ['celeb4.jpeg', c4], ['celeb5.jpeg', c5],
  ['celeb6.jpeg', c6], ['celeb7.jpeg', c7], ['celeb8.jpeg', c8], ['celeb9.jpeg', c9], ['celeb10.jpeg', c10],
]);

export default function GamePage({ scores, user, routeChange }) {
  const [currQuestion, setCurrQuestion] = useState(Math.floor(Math.random() * 10));
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState({
    image: undefined,
    answer: '',
    answers: [],
  });
  const [userMax, setUserMax] = useState(0);
  useEffect(() => {
    const { name } = user;
    async function fetch() {
    Api.getUserMax(name).then((data) => setUserMax(data))
    }
    fetch();
  }, []);
  useEffect(async () => {
    console.log(currQuestion);
    let q = 1;
    if (!Number.isNaN(currQuestion)) {
      q = currQuestion;
    }
    q = q + 1
    const resp = await Api.getQuestion(q);
    setQuestion({
      image: resp.image,
      answer: resp.answer,
      answers: resp.answers,
    })
  }, [currQuestion]);
  async function chooseAnswer (selected) {
    let s = score;
    if (selected === question.answer) {
      setScore(score + 100);
      s += 100;
      alert('You got the answer correct!');
    } else {
      alert('You got the answer wrong!');
    }
    if (counter + 1 >= 10) {
      const name = user.name;
      console.log(name);
      await Api.updateUserMax(name, s);
      // Go to score page
      routeChange('/score', { state: { score: s } });
    }
    setCounter(counter + 1);
    setCurrQuestion(Math.floor(Math.random() * 10));
    console.log(currQuestion);
  };
  console.log(question);
  console.log(question.answers);
  return (
    <div>
      <div id="title">Who is this celebrity?</div>
      <div className="answer-section">
        <div><img src={question.image} alt="" width="338" height="338" /></div>
        {
        question.answers.map((answerOption, index) => (
          <>
            <button type="submit" id={`a${index}`} className="button" onClick={() => chooseAnswer(answerOption)}>{answerOption}</button>
            <br />
            <br />
          </>
        ))
        }
      </div>
      <div style={{
        position: 'absolute',
        right: 5,
        top: 5,
      }}
      >
        {`Current Score: ${score}`}
      </div>
      <div style={{
        position: 'absolute',
        right: 5,
        top: 25,
      }}
      >
        {`Max User Score: ${userMax}`}
      </div>
      <div style={{
        position: 'absolute',
        right: 5,
        top: 45,
      }}
      >
        {`Max Global Score: ${scores.globalMax} ${scores.globalName}`}
      </div>

    </div>
  );
}
