import React, { useState } from "react";
import { API_BASE_URL } from "../App";
import '../styles/LoginPage.css';

function LoginPage({ onLogin }) {
    const [authMode, setAuthMode] = useState('login');

    // form data for registration
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // form data for login
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    // error message
    const [error, setError] = useState('');

    //loading while API req in process
    const [loading, setLoading] = useState(false);

    // Register form handlers

    // Update form fields as user types
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({
            ...registerForm,
            [name]: value,
        });
    };

    // Handle register form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // ============================================
        // VALIDATION
        // ============================================

        if (!registerForm.name.trim()) {
            setError('Name is required');
            return;
        }

        if (!registerForm.email.trim()) {
            setError('Email is required');
            return;
        }

        if (!registerForm.password) {
            setError('Password is required');
            return;
        }

        if (registerForm.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (registerForm.password !== registerForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // ============================================
            // API CALL: Register
            // ============================================
            // What we send:
            // - name, email, password
            //
            // What we get back:
            // - token (to authenticate future requests)
            // - user info (name, email, id)

            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: registerForm.name,
                    email: registerForm.email,
                    password: registerForm.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed');
                return;
            }

            // Registration successful!
            // Call onLogin to update App.js state and redirect to dashboard
            onLogin(data.token, data.user);

        } catch (err) {
            setError('Error registering: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // LOGIN FORM HANDLERS
    
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({
        ...loginForm,
        [name]: value,
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!loginForm.email.trim()) {
        setError('Email is required');
        return;
        }

        if (!loginForm.password) {
        setError('Password is required');
        return;
        }

        setLoading(true);

        try {
        // ============================================
        // API CALL: Login
        // ============================================

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email: loginForm.email,
            password: loginForm.password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || 'Login failed');
            return;
        }

        // Login successful!
        onLogin(data.token, data.user);

        } catch (err) {
        setError('Error logging in: ' + err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="login-page">
        <div className="login-container">
            <h1 className="app-title">💰 Expense Tracker</h1>

            {/* Error message */}
            {error && <div className="error-message">{error}</div>}

            {/* ============================================
                LOGIN FORM
                ============================================ */}
            {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form">
                <h2>Login</h2>

                <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    required
                />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="toggle-auth">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={() => {
                    setAuthMode('register');
                    setError('');
                    }}
                    className="toggle-btn"
                >
                    Register here
                </button>
                </p>
            </form>
            )}

            {/* ============================================
                REGISTER FORM
                ============================================ */}
            {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
                <h2>Register</h2>

                <div className="form-group">
                <label htmlFor="register-name">Full Name</label>
                <input
                    id="register-name"
                    type="text"
                    name="name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    placeholder="Enter your name"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    type="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    placeholder="Enter a password (min 6 characters)"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Confirm your password"
                    required
                />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Registering...' : 'Register'}
                </button>

                <p className="toggle-auth">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => {
                    setAuthMode('login');
                    setError('');
                    }}
                    className="toggle-btn"
                >
                    Login here
                </button>
                </p>
            </form>
            )}
        </div>
        </div>
    );
}

export default LoginPage;