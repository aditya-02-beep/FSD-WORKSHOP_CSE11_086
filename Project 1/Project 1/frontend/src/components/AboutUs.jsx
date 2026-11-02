import React from 'react';

const AboutUs = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-2">About Us</h1>
        <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Empowering academic administrators, coordinators, and faculties with a modern, streamlined student record management ecosystem.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm border-0 p-4">
            <h3 className="fw-bold text-primary mb-3">Our Mission</h3>
            <p className="text-muted leading-relaxed">
              Our mission is to simplify academic data handling by providing an intuitive, lightweight, and reliable platform. Managing student profiles, enrollment numbers, contact details, and department allocations should be seamless and error-free.
            </p>
            <p className="text-muted leading-relaxed">
              We focus on speed, data consistency, and responsive design to ensure administrators can perform day-to-day operations with zero friction.
            </p>
            <div className="row g-3 mt-2">
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded text-center">
                  <h4 className="fw-bold text-primary mb-1">Instant</h4>
                  <small className="text-muted">Real-Time Updates</small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded text-center">
                  <h4 className="fw-bold text-primary mb-1">100%</h4>
                  <small className="text-muted">Responsive Layout</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card h-100 shadow-sm border-0 p-4">
            <h3 className="fw-bold text-primary mb-3">Core Platform Standards</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0 py-3 bg-transparent border-bottom">
                <strong className="d-block text-dark">Data Validation & Integrity</strong>
                <span className="text-muted small">
                  Enforces unique student identifiers, valid email formats, 10-digit mobile verification, and semester boundary limits.
                </span>
              </li>
              <li className="list-group-item px-0 py-3 bg-transparent border-bottom">
                <strong className="d-block text-dark">Real-Time Search & Filtering</strong>
                <span className="text-muted small">
                  Instant search across student records by name or unique student ID with case-insensitive matching.
                </span>
              </li>
              <li className="list-group-item px-0 py-3 bg-transparent border-0">
                <strong className="d-block text-dark">Modular Full-Stack Architecture</strong>
                <span className="text-muted small">
                  Decoupled client-server interaction powered by structured REST API endpoints and state-driven UI.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
