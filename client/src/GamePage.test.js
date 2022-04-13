/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import GamePage from './components/GamePage';

function Game() {
  const [user, setUser] = useState({ name: 'John' });
  const [maxScores] = useState({
    userMax: 0,
    globalMax: 50,
    globalName: 'Juju',
  });
  return (<GamePage scores={maxScores} user={user} setUser={setUser} />);
}
test('renders current score', () => {
  render(<Game />);
  const linkElement = screen.getByText(/Current Score: 0/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders max user score', () => {
  render(<Game />);
  const linkElement = screen.getByText(/Max User Score/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders max global score', () => {
  render(<Game />);
  const linkElement = screen.getByText(/50 Juju/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders who is celebrity', () => {
  render(<Game />);
  const linkElement = screen.getByText(/Who is this celebrity/i);
  expect(linkElement).toBeInTheDocument();
});

test('snapshot test', () => {
  const component = renderer.create(<Game />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
