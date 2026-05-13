import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiCheckCircle, FiAlertCircle, FiInfo, FiImage, FiFileText } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const UploadPapersPage = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    examType: '',
    semester: '',
    slot: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' });

  const examTypes = ['CAT 1', 'CAT 2', 'CAT 3', 'FAT', 'Quiz', 'Assignment', 'Mid Sem', 'End Sem'];
  
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

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setUploadStatus({ type: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (allowedTypes.includes(file.type)) {
        setFormData({ ...formData, file });
        setUploadStatus({ type: '', message: '' });
      } else {
        setUploadStatus({ type: 'error', message: 'Please select a valid PDF or image file (JPEG, PNG, GIF)' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      setUploadStatus({ type: 'error', message: 'Please select a course first' });
      return;
    }
    
    if (!formData.examType || !formData.semester || !formData.slot || !formData.file) {
      setUploadStatus({ type: 'error', message: 'Please fill all fields and select a file' });
      return;
    }

    setUploading(true);
    setUploadStatus({ type: '', message: '' });

    const uploadData = new FormData();
    uploadData.append('file', formData.file);
    uploadData.append('course_code', selectedCourse.course_code);
    uploadData.append('course_name', selectedCourse.course_name);
    uploadData.append('exam_type', formData.examType);
    uploadData.append('semester', formData.semester);
    uploadData.append('slot', formData.slot);

    try {
      const response = await axios.post(`${API_URL}/upload-paper`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        setUploadStatus({ type: 'success', message: 'Question paper uploaded successfully!' });
        setFormData({ examType: '', semester: '', slot: '', file: null });
        setSelectedCourse(null);
        document.getElementById('file-input').value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({ type: 'error', message: 'Failed to upload. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="gradient-text">Upload Question Paper</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Support PDF, JPEG, PNG, GIF - All file types accepted!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">1</div>
              <span className="font-semibold">Select Course</span>
            </div>
            <div className="h-px flex-1 mx-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">2</div>
              <span className="font-semibold text-gray-600">Fill Details</span>
            </div>
            <div className="h-px flex-1 mx-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">3</div>
              <span className="font-semibold text-gray-600">Upload</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Course <span className="text-red-500">*</span>
            </label>
            <SearchBar onCourseSelect={handleCourseSelect} placeholder="Search for Software Engineering course..." />
            {selectedCourse && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  ✅ Selected: <strong>{selectedCourse.course_code}</strong> - {selectedCourse.course_name}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Exam Type <span className="text-red-500">*</span>
            </label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
              required
            >
              <option value="">Select Exam Type</option>
              {examTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Semester <span className="text-red-500">*</span>
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
              required
            >
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Slot <span className="text-red-500">*</span>
            </label>
            <select
              name="slot"
              value={formData.slot}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
              required
            >
              <option value="">Select Slot</option>
              {slots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question Paper <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
              <input
                id="file-input"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-input" className="cursor-pointer block">
                <div className="flex justify-center gap-4 mb-2">
                  <FiFileText className="text-4xl text-red-500" />
                  <FiImage className="text-4xl text-green-500" />
                </div>
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400 mt-1">PDF, JPEG, PNG, GIF supported (Max 10MB)</p>
              </label>
              {formData.file && (
                <div className="mt-3 p-2 bg-green-50 rounded-lg flex items-center justify-center gap-2">
                  {formData.file.type === 'application/pdf' ? 
                    <FiFileText className="text-red-500" /> : 
                    <FiImage className="text-green-500" />
                  }
                  <span className="text-sm text-green-700">{formData.file.name}</span>
                </div>
              )}
            </div>
          </div>

          {uploadStatus.message && (
            <div className={`p-4 rounded-xl flex items-center gap-2 ${
              uploadStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
              uploadStatus.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-blue-50 text-blue-800'
            }`}>
              {uploadStatus.type === 'success' ? <FiCheckCircle /> : uploadStatus.type === 'error' ? <FiAlertCircle /> : <FiInfo />}
              {uploadStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
              uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiUpload /> Upload Question Paper
              </span>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">📋 Upload Guidelines:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Upload question papers as PDF or images (JPEG, PNG, GIF)</li>
          <li>• Multiple images can be uploaded as separate entries</li>
          <li>• Ensure the paper is clear and readable</li>
          <li>• Maximum file size: 10MB per file</li>
          <li>• Double-check exam type, semester, and slot before submitting</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadPapersPage;