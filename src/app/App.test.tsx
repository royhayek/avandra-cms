import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create a mock Redux store
const mockStore = configureMockStore();

const store = mockStore({
  ui: {
    lang: 'en',
    theme: 'light'
  }
});

// Mock the react-redux useSelector hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}));

describe('App Component', () => {
  beforeEach(() => {
    // Mock any useSelector calls with the desired data
    (useSelector as jest.Mock).mockReturnValue({
      lang: 'en', // replace with your desired value
      theme: 'light' // replace with your desired value
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    // You can add more specific assertions based on your component structure
  });

  // Add more test cases as needed for different scenarios
});
