import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Login from '../src/pages/Auth/Login';
import Register from '../src/pages/Auth/Register';

describe('Auth Components', () => {
  describe('Login Component', () => {
    it('renders the login form fields', () => {
      render(<Login />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('captures user input in controlled login fields', async () => {
      render(<Login />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(emailInput, 'jane@example.com');
      await userEvent.type(passwordInput, 'securePassword123');

      expect(emailInput).toHaveValue('jane@example.com');
      expect(passwordInput).toHaveValue('securePassword123');
    });

    it('submits the correct login data', async () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      render(<Login />);

      await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'securePassword123');
      await userEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(logSpy).toHaveBeenCalledWith('Login submitted:', {
        email: 'jane@example.com',
        password: 'securePassword123',
      });
      expect(alertSpy).toHaveBeenCalledWith('Login successful!');

      logSpy.mockRestore();
      alertSpy.mockRestore();
    });
  });

  describe('Register Component', () => {
    it('renders the register form fields', () => {
      render(<Register />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('logs the form data on submit', async () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

      render(<Register />);
      await userEvent.type(screen.getByLabelText(/name/i), 'JohnDoe');
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'password123');
      await userEvent.click(screen.getByRole('button', { name: /register/i }));

      expect(logSpy).toHaveBeenCalledWith('Register Attempt:', {
        name: 'JohnDoe',
        email: 'john@example.com',
        password: 'password123',
      });

      logSpy.mockRestore();
    });
  });
});