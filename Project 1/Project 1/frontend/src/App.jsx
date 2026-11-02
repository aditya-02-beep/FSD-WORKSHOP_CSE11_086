import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import FAQs from './components/FAQs';
import ContactUs from './components/ContactUs';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import SearchStudent from './components/SearchStudent';

function App() {
  const location = useLocation();

  const isDirectoryPage =
    location.pathname.startsWith('/students') ||
    location.pathname.startsWith('/add') ||
    location.pathname.startsWith('/edit') ||
    location.pathname.startsWith('/search');

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <main className={`flex-grow-1 ${!isDirectoryPage ? 'pb-5' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
          <Route path="/search" element={<SearchStudent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isDirectoryPage && (
        <footer className="bg-white border-top py-3 text-center text-muted small mt-auto">
          <div className="container">
            Student Management System
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
