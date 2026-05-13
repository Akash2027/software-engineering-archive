import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPapersPage from './pages/SearchPapersPage';
import UploadPapersPage from './pages/UploadPapersPage';
import NotesPage from './pages/NotesPage';
import SubjectDetailsPage from './pages/SubjectDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-papers" element={<SearchPapersPage />} />
            <Route path="/upload-papers" element={<UploadPapersPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/subject/:courseCode" element={<SubjectDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;