import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '850px' }}>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-2">Contact Us</h1>
        <p className="lead text-muted">
          We are here to assist with inquiries, platform feedback, and technical assistance.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-5">
          <div className="card h-100 shadow-sm border-0 p-4">
            <h4 className="fw-bold text-primary mb-3">Get in Touch</h4>
            <p className="text-muted small mb-4">
              Fill out the form and our coordinators will reach back out to you shortly.
            </p>

            <div className="mb-4">
              <h6 className="fw-semibold text-dark mb-1">Academic Department</h6>
              <p className="text-muted small mb-0">Computer Science & Engineering</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-semibold text-dark mb-1">Email Inquiries</h6>
              <p className="text-muted small mb-1">
                <a href="mailto:akshatavs1122@gmail.com" className="text-decoration-none text-primary">
                  akshatavs1122@gmail.com
                </a>
              </p>
              <p className="text-muted small mb-0">
                <a href="mailto:akshatavs1122@outlook.com" className="text-decoration-none text-primary">
                  akshatavs1122@outlook.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card shadow-sm border-0 p-4">
            {submitted && (
              <div className="alert alert-success text-center py-3 mb-3">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
