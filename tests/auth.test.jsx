import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Login from '../src/pages/Auth/Login';
import Register from '../src/pages/Auth/Register';
import ResetPassword from '../src/pages/Auth/ResetPassword';

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

    it('captures user input in controlled register fields', async () => {
      render(<Register />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(nameInput, 'Jane Doe');
      await userEvent.type(emailInput, 'jane@example.com');
      await userEvent.type(passwordInput, 'mypassword');

      expect(nameInput).toHaveValue('Jane Doe');
      expect(emailInput).toHaveValue('jane@example.com');
      expect(passwordInput).toHaveValue('mypassword');
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

  describe('ResetPassword Component', () => {
    it('renders all reset password form fields', () => {
      render(<ResetPassword />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/old password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
    });

    it('captures user input in controlled reset password fields', async () => {
      render(<ResetPassword />);

      await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/old password/i), 'oldPass123');
      await userEvent.type(screen.getByLabelText(/new password/i), 'newPass456');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'newPass456');

      expect(screen.getByLabelText(/email/i)).toHaveValue('jane@example.com');
      expect(screen.getByLabelText(/old password/i)).toHaveValue('oldPass123');
      expect(screen.getByLabelText(/new password/i)).toHaveValue('newPass456');
      expect(screen.getByLabelText(/confirm password/i)).toHaveValue('newPass456');
    });

    it('shows error when new password matches old password', async () => {
      render(<ResetPassword />);

      await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/old password/i), 'samePass1');
      await userEvent.type(screen.getByLabelText(/new password/i), 'samePass1');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'samePass1');
      await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

      expect(screen.getByText(/new password must be different/i)).toBeInTheDocument();
    });

    it('shows error when new password and confirm password do not match', async () => {
      render(<ResetPassword />);

      await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/old password/i), 'oldPass123');
      await userEvent.type(screen.getByLabelText(/new password/i), 'newPass456');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'differentPass');
      await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

      expect(screen.getByText(/must match/i)).toBeInTheDocument();
    });

    it('shows success message and calls callback on valid submission', async () => {
      const onResetPassword = vi.fn();
      render(<ResetPassword onResetPassword={onResetPassword} />);

      await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/old password/i), 'oldPass123');
      await userEvent.type(screen.getByLabelText(/new password/i), 'newPass456');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'newPass456');
      await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

      expect(screen.getByText(/password reset successful/i)).toBeInTheDocument();
      expect(onResetPassword).toHaveBeenCalledWith({
        email: 'jane@example.com',
        oldPassword: 'oldPass123',
        newPassword: 'newPass456',
      });
    });
  });
});