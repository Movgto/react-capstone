import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import Home from './Home';

describe('Homepage component', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
    );

    await screen.findByTestId('list');
  });

  it('matches the snapshot', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
    );

    const list = await screen.findByTestId('list');

    expect(list).toMatchSnapshot();
  });
});
