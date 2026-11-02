import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      setMessage({ text: 'Failed to load students from server.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete student ID: ${id}?`);
    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter((s) => s.id !== id));
      setMessage({ text: `Student with ID ${id} deleted successfully.`, type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Error deleting student.', type: 'danger' });
    }
  };

  const filteredStudents = students.filter((student) => {
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      String(student.id).includes(query);

    const matchesBranch = branchFilter === 'ALL' || student.branch === branchFilter;

    return matchesSearch && matchesBranch;
  });

  return (
    <div className="directory-page-bg">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h3 className="mb-0 text-primary fw-bold">Student Directory</h3>
          <Link to="/add" className="btn btn-success">
            Add New Student
          </Link>
        </div>

      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ text: '', type: '' })}></button>
        </div>
      )}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Student Name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
              >
                <option value="ALL">All Branches</option>
                <option value="CSE">CSE</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="alert alert-info text-center py-4">
          <h5>No student records found.</h5>
          <p className="mb-0 text-muted">
            {searchTerm || branchFilter !== 'ALL'
              ? 'Try adjusting your search or filter criteria.'
              : 'Click "+ Add New Student" to create your first record.'}
          </p>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Mobile Number</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="fw-bold">{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                      <a href={`mailto:${student.email}`} className="text-decoration-none">
                        {student.email}
                      </a>
                    </td>
                    <td>{student.branch}</td>
                    <td>Sem {student.semester}</td>
                    <td>{student.mobile}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => navigate(`/edit/${student.id}`)}
                        title="Edit Student"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(student.id)}
                        title="Delete Student"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default StudentList;
