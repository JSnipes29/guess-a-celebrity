/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import '../assets/styles.css';
import Api from '../modules/Api';


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
  // Get the user max score to display
  useEffect(() => {
    const { name } = user;
    async function fetch() {
    Api.getUserMax(name).then((data) => setUserMax(data))
    }
    fetch();
  }, []);
  // fetch a random question from the database
  useEffect(() => {
      async function fetchQuestion() {
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
    }
    fetchQuestion();
  }, [currQuestion]);
  // choose an answer and proceed to next page
  async function chooseAnswer (selected) {
    let s = score;
    if (selected === question.answer) {
      setScore(score + 100);
      s += 100;
      alert('You got the answer correct!');
    } else {
      alert('You got the answer wrong!');
    }
    // if ten questions are answered, move to score page
    if (counter + 1 >= 10) {
      const name = user.name;
      await Api.updateUserMax(name, s);
      // Go to score page
      routeChange('/score', { state: { score: s } });
    }
    setCounter(counter + 1);
    setCurrQuestion(Math.floor(Math.random() * 10));
  };
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
