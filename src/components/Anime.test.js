import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import store from '../store/store';
import App from '../App';

describe('Anime component', () => {
  it('renders correctly', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    await screen.findByTestId('list');
  });
});

describe('Anime component', () => {
  it('matches the snapshot', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const list = await screen.findByTestId('list');

    expect(list).toMatchSnapshot();
  });
});
