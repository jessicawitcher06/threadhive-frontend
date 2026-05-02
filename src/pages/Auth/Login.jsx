import React, { useState } from 'react';
import "./Auth.css";
import loginPlaceholderImage from '../../../resources/login-collaboration.jpg';

function Login() {
  // Define relevant state variables for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    // Implement logic to print it on console and success on alert
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    alert('Login successful!');
  };

  return (
    <div className="auth-container login-page">
      <div className="login-shell">
        <section className="login-form-panel">
          <p className="login-kicker">ThreadHive Community</p>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue your conversations.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button className="login-submit" type="submit">Login</button>
          </form>
        </section>

        <aside className="login-visual-panel" aria-hidden="true">
          <img src={loginPlaceholderImage} alt="" />
        </aside>
      </div>
    </div>
  );
}

export default Login;