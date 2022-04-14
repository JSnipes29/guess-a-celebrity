/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import '../assets/App.css';
import Account from '../modules/Account';
import Api from '../modules/Api';

export default function LoginForm({ setScores, setUsers }) {
  const [username, setUsername] = useState({ name: '' });
  const submit = async (e) => {
    e.preventDefault();
    const result = await Api.setup(username.name);
    if (result === -1) {
      alert('Please enter a valid name');
    } else if (result === -2) {
      alert('Please enter letters and numbers only.');
    } else {
      setUsers({
        name: username.name,
      });
      setScores({
        userMax: result.maxScore,
        globalMax: result.globalMaxScore,
        globalName: result.globalName,
      });
    }
  };
  return (
    <div>
      <div>
        <div>Name:</div>
        <input type="text" name="name" id="name" onChange={(e) => setUsername({ ...username, name: e.target.value })} value={username.name} />
      </div>
      <input id="login" className="button" type="submit" value="login" onClick={submit} />
    </div>
  );
}
