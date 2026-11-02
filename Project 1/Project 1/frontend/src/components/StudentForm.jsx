import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    branch: 'CSE',
    semester: '1',
    mobile: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      axios.get(`${API_URL}/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => setError(err.response?.data?.message || 'Error loading student details.'));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, formData);
        setSuccess('Student details updated successfully! Redirecting...');
      } else {
        await axios.post(API_URL, formData);
        setSuccess('Student added successfully! Redirecting...');
      }
      setTimeout(() => navigate('/students'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="directory-page-bg">
      <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white py-3">
          <h4 className="card-title mb-0 text-center">
            {isEditMode ? 'Edit Student' : 'Add New Student'}
          </h4>
        </div>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Student ID</label>
              <input
                type="number"
                name="id"
                className="form-control"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter Student ID"
                required
                disabled={isEditMode}
              />
              {isEditMode && <small className="text-muted">Student ID cannot be changed.</small>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Branch</label>
              <select
                name="branch"
                className="form-select"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="CSE">CSE</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Semester (1 - 8)</label>
              <input
                type="number"
                name="semester"
                className="form-control"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Enter Semester"
                min="1"
                max="8"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Mobile Number (10 digits)</label>
              <input
                type="tel"
                name="mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                pattern="[0-9]{10}"
                title="Please enter a 10 digit phone number"
                required
              />
            </div>

            <div className="d-flex justify-content-between pt-2">
              <Link to="/students" className="btn btn-secondary px-4">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? 'Saving...' : isEditMode ? 'Update Student' : 'Add Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default StudentForm;
