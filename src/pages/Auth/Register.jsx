import React, { useState } from 'react';
import "./Auth.css";
import registerImage from '../../../resources/register-welcome.jpg';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Register Attempt:', form);
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <div className="auth-container auth-page">
      <div className="auth-split-shell">
        <div className="auth-box">
          <p className="auth-kicker">ThreadHive Community</p>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join the conversation today.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>
        </div>
        <aside className="auth-split-visual-panel" aria-hidden="true">
          <img src={registerImage} alt="" />
        </aside>
      </div>
    </div>
  );
}

export default Register;