/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import App from './components/App';

function GamePage() {
  const [user, setUser] = useState({ name: '' });
  const [maxScores] = useState({
    userMax: 0,
    globalMax: 0,
    globalName: '',
  });
  return (<App.Game scores={maxScores} user={user} setUser={setUser} />);
}
test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Guess That Celebrity/i);
  expect(linkElement).toBeInTheDocument();
});

test('login button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('snapshot test', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
