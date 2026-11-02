import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqList = [
    {
      question: "How is student data stored and managed?",
      answer: "Student records are stored and maintained actively in an in-memory JavaScript array on the backend server. All CRUD operations (Create, Read, Update, Delete) are handled dynamically via REST API endpoints without requiring an external database."
    },
    {
      question: "Can duplicate Student IDs be added?",
      answer: "No. Student ID is enforced as a required, unique numeric identifier. The backend system checks existing records and rejects any duplicates with a clear validation error message."
    },
    {
      question: "Can I update the Student ID after creating a record?",
      answer: "The Student ID field is locked and disabled during edit mode to preserve data integrity. All other fields including Name, Email, Branch, Semester, and Mobile Number can be freely modified."
    },
    {
      question: "How does the search and filter mechanism work?",
      answer: "The directory provides a real-time, case-insensitive search that matches against Student Name and Student ID simultaneously, along with an instant dropdown filter for branches (CSE, CS, IT, ECE)."
    },
    {
      question: "Is there a confirmation step before deleting a student?",
      answer: "Yes. When you click Delete, a confirmation dialog appears to prevent accidental deletions. Once confirmed, the record is removed immediately and the UI updates without requiring a page refresh."
    }
  ];

  return (
    <div className="container py-5" style={{ maxWidth: '850px' }}>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-2">Frequently Asked Questions</h1>
        <p className="lead text-muted">
          Find answers to common questions about managing student profiles, data validations, and search features.
        </p>
      </div>

      <div className="accordion mb-5" id="faqsPageAccordion">
        {faqList.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="accordion-item mb-3 border rounded shadow-sm overflow-hidden"
            >
              <h2 className="accordion-header">
                <button
                  className={`accordion-button fw-semibold ${!isOpen ? 'collapsed' : ''}`}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                </button>
              </h2>
              {isOpen && (
                <div className="accordion-collapse show">
                  <div className="accordion-body text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-muted mb-2">Still have questions?</p>
        <Link to="/contact" className="btn btn-outline-primary px-4">
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default FAQs;
