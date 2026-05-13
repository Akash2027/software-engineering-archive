import React, { useState } from 'react';
import { FiFileText, FiUpload, FiDownload, FiSearch, FiImage, FiFile, FiEye } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const NotesPage = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notes, setNotes] = useState([]);
  const [searching, setSearching] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    semester: '',
    slot: '',
    file: null,
    fileType: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const semesters = [
    'Summer Semester 2025-26', 'Winter Semester 2025-26', 'Fall Semester 2025-26',
    'Summer Semester 2024-25', 'Winter Semester 2024-25', 'Fall Semester 2024-25',
    'Summer Semester 2023-24', 'Tri Semester III & VI 2023-24', 'Winter Semester 2023-24',
    'Tri Semester II & V 2023-24', 'Tri Semester I & IV 2023-24', 'Summer Semester 2022-23',
    'Fall Semester 2023-24', 'Tri Semester III & VI 2022-23', 'Winter Semester 2022-23',
    'Tri Semester II & V 2022-23', 'Tri Semester I & IV 2022-23', 'Fall Semester 2022-23',
    'Summer Semester Special 2021-22', 'Winter Semester 2021-22', 'Fall Semester 2021-22'
  ];

  const slots = [
    'A1', 'A1+TA1', 'B1', 'B1+TB1', 'C1', 'C1+TC1', 'D1', 'D1+TD1',
    'E1', 'E1+TE1', 'F1', 'F1+TF1', 'G1', 'G1+TG1',
    'A2', 'A2+TA2', 'B2', 'B2+TB2', 'C2', 'C2+TC2', 'D2', 'D2+TD2',
    'E2', 'E2+TE2', 'F2', 'F2+TF2', 'G2', 'G2+TG2',
    'A3', 'A3+TA3', 'B3', 'B3+TB3', 'C3', 'C3+TC3', 'D3', 'D3+TD3',
    'E3', 'E3+TE3', 'F3', 'F3+TF3', 'G3', 'G3+TG3'
  ];

  const handleSearchNotes = async (course) => {
    if (!course) return;
    setSelectedCourse(course);
    setSearching(true);
    try {
      const response = await axios.get(`${API_URL}/notes/${course.course_code}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    } finally {
      setSearching(false);
    }
  };

  const handleView = (note) => {
    window.open(`${API_URL}/view/note/${note.note_id}`, '_blank');
  };

  const handleDownload = async (note) => {
    try {
      window.open(`${API_URL}/download/note/${note.note_id}`, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      window.open(note.file_url, '_blank');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (file && allowedTypes.includes(file.type)) {
      let fileType = '';
      if (file.type === 'application/pdf') fileType = 'PDF';
      else if (file.type.includes('image')) fileType = 'Image';
      setUploadForm({ ...uploadForm, file, fileType });
      setUploadStatus('');
    } else {
      setUploadStatus('Please select a valid PDF or image file');
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !uploadForm.title || !uploadForm.semester || !uploadForm.slot || !uploadForm.file) {
      setUploadStatus('Please fill all fields and select a file');
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append('file', uploadForm.file);
    data.append('course_code', selectedCourse.course_code);
    data.append('course_name', selectedCourse.course_name);
    data.append('title', uploadForm.title);
    data.append('semester', uploadForm.semester);
    data.append('slot', uploadForm.slot);
    data.append('file_type', uploadForm.fileType);

    try {
      const response = await axios.post(`${API_URL}/upload-note`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setUploadStatus('Note uploaded successfully!');
        setUploadForm({ title: '', semester: '', slot: '', file: null, fileType: '' });
        setSelectedCourse(null);
        document.getElementById('note-file-input').value = '';
        if (selectedCourse) {
          handleSearchNotes(selectedCourse);
        }
      }
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="gradient-text">Software Engineering Notes</span>
        </h1>
        <p className="text-gray-600 text-lg">Access and share comprehensive study notes</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'search' 
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          <FiSearch /> Search Notes
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'upload' 
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          <FiUpload /> Upload Notes
        </button>
      </div>

      {activeTab === 'search' && (
        <div>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onCourseSelect={handleSearchNotes} placeholder="Search course to find notes..." />
          </div>

          {searching && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-500">Loading notes...</p>
            </div>
          )}

          {selectedCourse && !searching && (
            <div>
              <h2 className="text-2xl font-bold mb-4">{selectedCourse.course_code} - {selectedCourse.course_name}</h2>
              {notes.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
                  <FiFileText className="mx-auto text-4xl text-yellow-500 mb-2" />
                  <p className="text-gray-600">No notes available for this course yet.</p>
                  <button onClick={() => setActiveTab('upload')} className="mt-3 text-primary hover:underline">
                    Be the first to upload notes!
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notes.map((note, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {note.file_type === 'PDF' ? <FiFile className="text-red-500 text-xl" /> : <FiImage className="text-blue-500 text-xl" />}
                          <h3 className="font-semibold text-lg">{note.title}</h3>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleView(note)} 
                            className="text-blue-500 hover:scale-110 transition-transform"
                            title="View"
                          >
                            <FiEye size={20} />
                          </button>
                          <button 
                            onClick={() => handleDownload(note)} 
                            className="text-primary hover:scale-110 transition-transform"
                            title="Download"
                          >
                            <FiDownload size={20} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">📚 {note.semester}</p>
                      <p className="text-sm text-gray-500">⏰ Slot: {note.slot}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Upload Study Notes</h2>
            
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Select Course *</label>
                <SearchBar onCourseSelect={setSelectedCourse} placeholder="Search Software Engineering course..." />
                {selectedCourse && (
                  <p className="mt-2 text-sm text-green-600">Selected: {selectedCourse.course_code} - {selectedCourse.course_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Note Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="e.g., Data Structures Complete Notes"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Semester *</label>
                <select
                  value={uploadForm.semester}
                  onChange={(e) => setUploadForm({ ...uploadForm, semester: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  required
                >
                  <option value="">Select Semester</option>
                  {semesters.map(sem => <option key={sem} value={sem}>{sem}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Slot *</label>
                <select
                  value={uploadForm.slot}
                  onChange={(e) => setUploadForm({ ...uploadForm, slot: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  required
                >
                  <option value="">Select Slot</option>
                  {slots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">File (PDF or Image) *</label>
                <input
                  id="note-file-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
                {uploadForm.file && (
                  <p className="mt-2 text-sm text-green-600">✓ {uploadForm.file.name}</p>
                )}
              </div>

              {uploadStatus && (
                <div className={`p-3 rounded-lg ${uploadStatus.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {uploadStatus}
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : <span className="flex items-center justify-center gap-2"><FiUpload /> Upload Notes</span>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;