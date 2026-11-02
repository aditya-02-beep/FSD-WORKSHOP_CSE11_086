import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <section className="position-relative w-100 overflow-hidden" style={{ minHeight: '400px' }}>
        <img
          src="/images/hero_banner.png"
          alt="Student Management System"
          className="w-100 d-block"
          style={{
            height: '460px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
          style={{
            background: 'linear-gradient(to right, rgba(233, 245, 219, 0.9) 0%, rgba(233, 245, 219, 0.7) 45%, rgba(233, 245, 219, 0) 80%)'
          }}
        >
          <div className="container px-4 px-md-5">
            <div className="col-12 col-md-8 col-lg-6">
              <h1 className="display-4 fw-bold mb-3 text-primary">
                Student Management System
              </h1>
              <p className="lead fw-semibold mb-0" style={{ color: '#384627' }}>
                A streamlined web platform to add, view, update, and manage student records efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="text-center mb-5 pb-3">
            <h2 className="display-6 fw-bold text-primary">Key Platform Features</h2>
            <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Comprehensive capabilities designed for effortless student data administration and academic operations.
            </p>
          </div>

          <div className="d-flex flex-column gap-5">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-md-6 order-md-1 text-center">
                <img
                  src="/images/feature1_lifecycle.png"
                  alt="Student Lifecycle Management"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxHeight: '340px', width: 'auto' }}
                />
              </div>
              <div className="col-md-6 order-md-2">
                <div className="p-2">
                  <h3 className="fw-bold text-primary mb-3">Student Lifecycle Management</h3>
                  <p className="text-muted mb-3 leading-relaxed">
                    Maintain complete student records from enrollment to graduation, including student ID, name, email, department, semester, and contact phone numbers.
                  </p>
                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2">✓ Structured tracking across admission, academics, and graduation</li>
                    <li className="mb-2">✓ Centralized department and semester progression</li>
                    <li>✓ Unified student profile records</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-2" style={{ borderColor: 'var(--pal-2)' }} />

            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-md-6 order-md-2 text-center">
                <img
                  src="/images/feature2_search.png"
                  alt="Instant Search & Filtering"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxHeight: '340px', width: 'auto' }}
                />
              </div>
              <div className="col-md-6 order-md-1">
                <div className="p-2">
                  <h3 className="fw-bold text-primary mb-3">Instant Search & Filtering</h3>
                  <p className="text-muted mb-3 leading-relaxed">
                    Locate records effortlessly with real-time, case-insensitive search by student name or numeric ID, alongside instantaneous branch filters for CSE, CS, IT, and ECE.
                  </p>
                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2">✓ Real-time case-insensitive name search</li>
                    <li className="mb-2">✓ Exact ID lookup with instant response</li>
                    <li>✓ Dropdown department filtering</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-2" style={{ borderColor: 'var(--pal-2)' }} />

            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-md-6 order-md-1 text-center">
                <img
                  src="/images/feature3_integrity.png"
                  alt="Strict Data Integrity Rules"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxHeight: '340px', width: 'auto' }}
                />
              </div>
              <div className="col-md-6 order-md-2">
                <div className="p-2">
                  <h3 className="fw-bold text-primary mb-3">Strict Data Integrity Rules</h3>
                  <p className="text-muted mb-3 leading-relaxed">
                    Guarantees unique ID validation, email syntax verification, 10-digit mobile number checks, and semester boundary limits (1 to 8) to prevent corrupt data entry.
                  </p>
                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2">✓ Unique identifier enforcement</li>
                    <li className="mb-2">✓ Accurate, validated, and consistent records</li>
                    <li>✓ Zero duplicate submissions allowed</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-2" style={{ borderColor: 'var(--pal-2)' }} />

            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-md-6 order-md-2 text-center">
                <img
                  src="/images/feature4_updates.png"
                  alt="Frictionless In-Place Updates"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxHeight: '340px', width: 'auto' }}
                />
              </div>
              <div className="col-md-6 order-md-1">
                <div className="p-2">
                  <h3 className="fw-bold text-primary mb-3">Frictionless In-Place Updates</h3>
                  <p className="text-muted mb-3 leading-relaxed">
                    Load pre-filled student details into edit forms in one click. Update records seamlessly with instant state propagation and zero full-page reloads.
                  </p>
                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2">✓ Instant pre-fill into edit view</li>
                    <li className="mb-2">✓ Live REST API synchronizations</li>
                    <li>✓ Smooth state update without page reload</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-2" style={{ borderColor: 'var(--pal-2)' }} />

            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-md-6 order-md-1 text-center">
                <img
                  src="/images/feature5_deletion.png"
                  alt="Protected Record Deletion"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxHeight: '340px', width: 'auto' }}
                />
              </div>
              <div className="col-md-6 order-md-2">
                <div className="p-2">
                  <h3 className="fw-bold text-primary mb-3">Protected Record Deletion</h3>
                  <p className="text-muted mb-3 leading-relaxed">
                    Safety-first confirmation prompts ensure records are never deleted accidentally, keeping academic datasets protected, compliant, and permanent.
                  </p>
                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2">✓ Double confirmation before deletion</li>
                    <li className="mb-2">✓ Immediate UI table synchrony</li>
                    <li>✓ Secure deletion lifecycle</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-2" style={{ borderColor: 'var(--pal-2)' }} />

            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-md-6 order-md-2 text-center">
                <img
                  src="/images/feature6_performance.png"
                  alt="High Performance Processing"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxHeight: '340px', width: 'auto' }}
                />
              </div>
              <div className="col-md-6 order-md-1">
                <div className="p-2">
                  <h3 className="fw-bold text-primary mb-3">High-Performance Processing</h3>
                  <p className="text-muted mb-3 leading-relaxed">
                    Blazing-fast in-memory processing delivers instant response times across queries, insertions, modifications, and deletions.
                  </p>
                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2">✓ Zero database latency overhead</li>
                    <li className="mb-2">✓ Instantaneous REST API responses</li>
                    <li>✓ Lightweight and high-throughput execution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
