/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import LoginForm from './components/LoginForm';

function LoginComponent() {
  const [, setUser] = useState({ name: '' });
  const [, setScores] = useState({
    userMax: 0,
    globalMax: 0,
    globalName: '',
  });
  return (
    <LoginForm setScores={setScores} setUser={setUser} />
  );
}
test('renders enter your name', () => {
  render(<LoginComponent />);
  const linkElement = screen.getByText(/Name:/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders input name', () => {
  render(<LoginComponent />);
  expect(screen.getByDisplayValue('').id).toBe('name');
});

test('snapshot test', () => {
  const component = renderer.create(<LoginComponent />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
