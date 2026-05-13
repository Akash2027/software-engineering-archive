import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUpload, FiFileText, FiTrendingUp, FiBookOpen, FiDownload, FiCode, FiGitBranch } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalPapers: 0,
    totalNotes: 0,
    totalCourses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ totalPapers: 0, totalNotes: 0, totalCourses: 85 });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FiSearch,
      title: 'Smart Search',
      description: 'Find Software Engineering papers and notes by course code or name',
      color: 'from-blue-500 to-cyan-500',
      link: '/search-papers'
    },
    {
      icon: FiUpload,
      title: 'Upload Materials',
      description: 'Share question papers and notes (PDF & Images supported)',
      color: 'from-green-500 to-emerald-500',
      link: '/upload-papers'
    },
    {
      icon: FiFileText,
      title: 'Study Notes',
      description: 'Access comprehensive Software Engineering notes',
      color: 'from-purple-500 to-pink-500',
      link: '/notes'
    },
    {
      icon: FiDownload,
      title: 'Easy Downloads',
      description: 'Download with proper naming format for easy organization',
      color: 'from-orange-500 to-red-500',
      link: '/search-papers'
    }
  ];

  const handleCourseSelect = (course) => {
    window.location.href = `/subject/${course.course_code}`;
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <FiCode className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
              <span className="gradient-text">Software Engineering Archive</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Your dedicated repository for Software Engineering question papers, notes, and study materials
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              SWE2001 • SWE2005 • SWE3001 • SWE4010 • SWE4012 and 85+ Software Engineering courses
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <SearchBar onCourseSelect={handleCourseSelect} />
              <p className="text-sm text-gray-500 mt-3">
                Search by course code (e.g., SWE2005) or course name (e.g., Software Testing)
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search-papers" className="btn-primary flex items-center justify-center gap-2 px-8 py-3 text-lg">
                <FiSearch /> Browse Question Papers
              </Link>
              <Link to="/upload-papers" className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                <FiUpload /> Contribute Materials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Real Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiFileText className="text-white text-3xl" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {loading ? '...' : stats.totalPapers}
              </div>
              <div className="text-gray-600 font-semibold">Question Papers</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiBookOpen className="text-white text-3xl" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {loading ? '...' : stats.totalNotes}
              </div>
              <div className="text-gray-600 font-semibold">Study Notes</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiGitBranch className="text-white text-3xl" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {loading ? '...' : stats.totalCourses}
              </div>
              <div className="text-gray-600 font-semibold">SWE Courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Software Engineering Archive?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything Software Engineering students need to excel in their academics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular SWE Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Popular Software Engineering Courses</h2>
            <p className="text-gray-600">Most accessed study materials this semester</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { code: 'SWE2001', name: 'Data Structures and Algorithms' },
              { code: 'SWE2005', name: 'Software Testing' },
              { code: 'SWE3001', name: 'Operating Systems' },
              { code: 'SWE1701', name: 'Software Engineering' },
              { code: 'SWE4010', name: 'Artificial Intelligence' },
              { code: 'SWE4012', name: 'Machine Learning' },
            ].map((course, index) => (
              <Link
                key={index}
                to={`/subject/${course.code}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/50"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="px-3 py-1 bg-primary/10 rounded-lg">
                    <span className="text-primary font-mono font-semibold">{course.code}</span>
                  </div>
                  <FiTrendingUp className="text-green-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">{course.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;