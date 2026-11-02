import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const SearchStudent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const res = await axios.get(API_URL);
      const q = query.toLowerCase().trim();
      const matched = res.data.filter(
        (s) => s.name.toLowerCase().includes(q) || String(s.id) === q
      );
      setResults(matched);
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="directory-page-bg">
      <div className="container" style={{ maxWidth: '800px' }}>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-dark text-white py-3">
          <h4 className="card-title mb-0 text-center">Search Student Records</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSearch} className="row g-2">
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Student Name or ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {hasSearched && (
        <div>
          {results.length === 0 ? (
            <div className="alert alert-warning text-center">
              <h5>No student found matching "{query}"</h5>
              <p className="mb-0">Please verify the ID or Name and try again.</p>
            </div>
          ) : (
            <div className="row g-3">
              {results.map((student) => (
                <div className="col-md-6" key={student.id}>
                  <div className="card h-100 shadow-sm border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title text-primary mb-0">{student.name}</h5>
                        <span className="badge bg-info text-dark">ID: {student.id}</span>
                      </div>
                      <p className="card-text mb-1">
                        <strong>Email:</strong> {student.email}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Branch:</strong> {student.branch} | <strong>Semester:</strong> {student.semester}
                      </p>
                      <p className="card-text mb-3">
                        <strong>Mobile:</strong> {student.mobile}
                      </p>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate(`/edit/${student.id}`)}
                        >
                          Edit
                        </button>
                        <Link to="/students" className="btn btn-sm btn-outline-secondary">
                          View in Directory
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchStudent;
