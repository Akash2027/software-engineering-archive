import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { FiDownload, FiFileText, FiArrowLeft, FiBookOpen, FiClock, FiEye, FiImage } from 'react-icons/fi';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const SubjectDetailsPage = () => {
  const { courseCode } = useParams();
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState(null);
  const [papers, setPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('papers');

  useEffect(() => {
    fetchCourseData();
  }, [courseCode]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const [papersRes, notesRes] = await Promise.all([
        axios.get(`${API_URL}/papers/${courseCode}`),
        axios.get(`${API_URL}/notes/${courseCode}`)
      ]);
      setPapers(papersRes.data);
      setNotes(notesRes.data);
      
      if (papersRes.data.length > 0) {
        setCourseInfo({
          course_code: papersRes.data[0].course_code,
          course_name: papersRes.data[0].course_name
        });
      } else if (notesRes.data.length > 0) {
        setCourseInfo({
          course_code: notesRes.data[0].course_code,
          course_name: notesRes.data[0].course_name
        });
      } else {
        try {
          const searchRes = await axios.get(`${API_URL}/search?q=${courseCode}`);
          if (searchRes.data.length > 0) {
            setCourseInfo({
              course_code: searchRes.data[0].course_code,
              course_name: searchRes.data[0].course_name
            });
          }
        } catch (e) {
          console.error('Error fetching course info:', e);
        }
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (item, type) => {
    const itemId = type === 'paper' ? item.paper_id : item.note_id;
    window.open(`${API_URL}/view/${type}/${itemId}`, '_blank');
  };

  const handleDownload = (item, type) => {
    const itemId = type === 'paper' ? item.paper_id : item.note_id;
    window.open(`${API_URL}/download/${type}/${itemId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading course materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">{courseCode}</h1>
        <h2 className="text-xl text-gray-700">{courseInfo?.course_name || 'Software Engineering Course'}</h2>
        <div className="flex gap-4 mt-4">
          <span className="px-3 py-1 bg-primary/20 rounded-full text-primary text-sm">
            {papers.length} Question Papers
          </span>
          <span className="px-3 py-1 bg-secondary/20 rounded-full text-secondary text-sm">
            {notes.length} Notes
          </span>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('papers')}
          className={`px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'papers'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          <FiFileText /> Question Papers ({papers.length})
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'notes'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          <FiBookOpen /> Notes ({notes.length})
        </button>
      </div>

      {activeTab === 'papers' && (
        <div>
          {papers.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <FiFileText className="mx-auto text-4xl text-gray-400 mb-3" />
              <p className="text-gray-500">No question papers available for this course yet.</p>
              <button
                onClick={() => navigate('/upload-papers')}
                className="mt-4 text-primary hover:underline"
              >
                Be the first to upload!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {papers.map((paper, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {paper.exam_type}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                          <FiClock className="text-sm" /> {paper.slot}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {paper.file_type}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">{paper.semester}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Uploaded: {paper.uploaded_at ? new Date(paper.uploaded_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(paper, 'paper')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
                      >
                        <FiEye /> View
                      </button>
                      <button
                        onClick={() => handleDownload(paper, 'paper')}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <FiDownload /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          {notes.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <FiBookOpen className="mx-auto text-4xl text-gray-400 mb-3" />
              <p className="text-gray-500">No notes available for this course yet.</p>
              <button
                onClick={() => navigate('/notes')}
                className="mt-4 text-primary hover:underline"
              >
                Upload notes now!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {note.file_type === 'PDF' ? <FiFileText className="text-red-500" /> : <FiImage className="text-green-500" />}
                        <h3 className="font-semibold text-lg">{note.title}</h3>
                      </div>
                      <div className="flex gap-2 mb-2 flex-wrap">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{note.file_type}</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs flex items-center gap-1">
                          <FiClock className="text-xs" /> {note.slot}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{note.semester}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleView(note, 'note')}
                        className="text-blue-500 hover:scale-110 transition-transform p-2"
                      >
                        <FiEye size={20} />
                      </button>
                      <button
                        onClick={() => handleDownload(note, 'note')}
                        className="text-primary hover:scale-110 transition-transform p-2"
                      >
                        <FiDownload size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectDetailsPage;