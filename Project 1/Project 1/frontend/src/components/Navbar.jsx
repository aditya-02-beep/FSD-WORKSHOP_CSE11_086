import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AUTH_URL = 'http://localhost:5000/api/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDirectoryPage =
    location.pathname.startsWith('/students') ||
    location.pathname.startsWith('/add') ||
    location.pathname.startsWith('/edit') ||
    location.pathname.startsWith('/search');

  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const openModal = (signupMode = false) => {
    setIsSignUp(signupMode);
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignUp) {
      if (!name.trim()) {
        setError('Full Name is required.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please try again.');
        return;
      }
      if (password.length < 4) {
        setError('Password must be at least 4 characters.');
        return;
      }

      setLoading(true);
      try {
        const res = await axios.post(`${AUTH_URL}/signup`, {
          name: name.trim(),
          email: email.trim(),
          password: password.trim()
        });
        setSuccess(res.data.message || 'Account created successfully! Redirecting...');
        setTimeout(() => {
          closeModal();
          navigate('/students');
        }, 1000);
      } catch (err) {
        setError(err.response?.data?.message || 'Error creating account. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!email || !password) {
        setError('Please enter your email/username and password.');
        return;
      }

      setLoading(true);
      try {
        await axios.post(`${AUTH_URL}/login`, {
          email: email.trim(),
          password: password.trim()
        });
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          closeModal();
          navigate('/students');
        }, 800);
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid email/username or password.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center py-0" to="/" title="Home">
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                height: '60px',
                width: 'auto',
                transform: 'scale(1.35)',
                transformOrigin: 'left center'
              }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            {!isDirectoryPage ? (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
                <li className="nav-item">
                  <NavLink className="nav-link px-3" to="/about">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link px-3" to="/faqs">
                    FAQs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link px-3" to="/contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
            ) : (
              <div className="mx-auto"></div>
            )}

            <div className="d-flex">
              {isDirectoryPage ? (
                <button
                  className="btn btn-outline-danger px-3 fw-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-primary px-3 fw-semibold"
                  onClick={() => openModal(false)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '440px' }}>
            <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white py-3">
                <h5 className="modal-title fw-bold">
                  {isSignUp ? 'Create New Account' : 'Account Login'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  {error && <div className="alert alert-danger py-2 small">{error}</div>}
                  {success && <div className="alert alert-success py-2 small">{success}</div>}

                  {isSignUp && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold small">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      {isSignUp ? 'Email Address' : 'Email Address / Username'}
                    </label>
                    <input
                      type={isSignUp ? 'email' : 'text'}
                      className="form-control"
                      placeholder={isSignUp ? 'Enter Email Address' : 'Enter Email or Username'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {isSignUp && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold small">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold mt-2"
                    disabled={loading}
                  >
                    {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
                  </button>

                  <div className="text-center mt-3 pt-2 border-top">
                    {isSignUp ? (
                      <p className="small text-muted mb-0">
                        Already have an account?{' '}
                        <button
                          type="button"
                          className="btn btn-link p-0 text-decoration-none fw-semibold text-primary small"
                          onClick={() => {
                            setIsSignUp(false);
                            setError('');
                            setSuccess('');
                          }}
                        >
                          Log In
                        </button>
                      </p>
                    ) : (
                      <p className="small text-muted mb-0">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          className="btn btn-link p-0 text-decoration-none fw-semibold text-primary small"
                          onClick={() => {
                            setIsSignUp(true);
                            setError('');
                            setSuccess('');
                          }}
                        >
                          Sign Up
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
