import React from 'react';
import { render, screen } from '@testing-library/react'; 
import '@testing-library/jest-dom'; 
import LandingPage from './pages/LandingPage';

describe('LandingPage component', () => {
  it('renders the welcome message', () => {
    render(<LandingPage />);
    const welcomeText = screen.getByText('Welcome to the Student Portal');
    expect(welcomeText).toBeInTheDocument();
  });

  it('renders the login link', () => {
    render(<LandingPage />);
    const loginLink = screen.getByRole('link', { name: /Please login to continue/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
