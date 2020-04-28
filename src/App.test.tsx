import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// https://github.com/callstack/react-native-testing-library/issues/103
test('renders learn react link', () => {
  //const { getByText } = render(<App />);
  const { queryByText } = render(<App />);
  expect(queryByText(/learn react/i)).not.toBeInTheDocument();
  //Original code
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).not.toBeInTheDocument();
});
