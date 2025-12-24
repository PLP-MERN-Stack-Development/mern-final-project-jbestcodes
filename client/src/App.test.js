import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Bright Academy LMS', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Assuming Home component has "Bright Academy" text
  const titleElement = screen.getByText(/Bright Academy/i);
  expect(titleElement).toBeInTheDocument();
});
