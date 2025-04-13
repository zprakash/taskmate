import React from 'react';
import { render, screen } from '@testing-library/react';
import Auth from '../../pages/Auth';

describe('Auth Page', () => {
  it('shows login form by default', () => {
    render(<Auth />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('switches to register form', () => {
    render(<Auth />);
    fireEvent.click(screen.getByText('Need an account? Register'));
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
