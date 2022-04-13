/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Score from './components/ScorePage';

function ScorePage() {
  const [user, setUser] = useState({ name: 'John' });
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Score user={user} setUser={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}
test('renders scores', () => {
  render(<ScorePage />);
  const linkElement = screen.getByText(/Scores:/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders your score', () => {
  render(<ScorePage />);
  const linkElement = screen.getByText(/Your score/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders play again', () => {
  render(<ScorePage />);
  const linkElement = screen.getByText(/Play Again/i);
  expect(linkElement).toBeInTheDocument();
});

test('snapshot test', () => {
  const component = renderer.create(<ScorePage />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
