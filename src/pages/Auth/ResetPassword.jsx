import { useState } from 'react';
import './Auth.css';

function ResetPassword({ onResetPassword }) {
  const [form, setForm] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (form.oldPassword === form.newPassword) {
      setIsSuccess(false);
      setError('New password must be different from old password.');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setIsSuccess(false);
      setError('New password and confirm password must match.');
      return;
    }

    setError('');
    setIsSuccess(true);

    if (onResetPassword) {
      onResetPassword({
        email: form.email,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
    }
  };

  return (
    <div className="auth-container auth-page">
      <div className="auth-box">
        <p className="auth-kicker">ThreadHive Community</p>
        <h2>Reset Password</h2>
        <p className="auth-subtitle">Enter your details to set a new password.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="reset-email">Email</label>
          <input
            id="reset-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <label htmlFor="old-password">Old Password</label>
          <input
            id="old-password"
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Old Password"
            required
          />

          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          <button type="submit">Reset Password</button>
        </form>

        {error && <p>{error}</p>}
        {isSuccess && <p>Password reset successful.</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
