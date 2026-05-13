import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBookOpen, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';

const SearchPapersPage = () => {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState([
    { code: 'SWE2005', name: 'Software Testing' },
    { code: 'SWE2001', name: 'Data Structures and Algorithms' },
    { code: 'SWE3001', name: 'Operating Systems' }
  ]);

  const handleCourseSelect = (course) => {
    // Save to recent searches
    const updated = [course, ...recentSearches.filter(c => c.code !== course.course_code)].slice(0, 5);
    setRecentSearches(updated);
    // Navigate to subject details
    navigate(`/subject/${course.course_code}`);
  };

  const popularCourses = [
    { code: 'SWE2001', name: 'Data Structures and Algorithms', papers: 45 },
    { code: 'SWE2005', name: 'Software Testing', papers: 32 },
    { code: 'SWE3001', name: 'Operating Systems', papers: 28 },
    { code: 'SWE2004', name: 'Software Architecture and Design', papers: 24 },
    { code: 'SWE2020', name: 'Software Metrics', papers: 19 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="gradient-text">Search Question Papers</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find previous year question papers by course code or name
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <FiSearch className="text-primary text-xl" />
            <h2 className="text-xl font-bold">Search for Papers</h2>
          </div>
          <SearchBar onCourseSelect={handleCourseSelect} placeholder="Type course code or name..." />
          <p className="text-sm text-gray-500 mt-4">
            💡 Try searching: SWE2005, Software Testing, Data Structures, etc.
          </p>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <FiTrendingUp className="text-green-500 text-2xl" />
          <h2 className="text-2xl font-bold">Popular Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCourses.map((course, index) => (
            <button
              key={index}
              onClick={() => handleCourseSelect({ course_code: course.code, course_name: course.name })}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 text-left group border border-gray-100 hover:border-primary/50"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg">
                  {course.code}
                </span>
                <FiArrowRight className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
              <p className="text-sm text-gray-500">{course.papers} question papers available</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FiBookOpen className="text-secondary text-xl" />
            <h2 className="text-xl font-bold">Recent Searches</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleCourseSelect({ course_code: search.code, course_name: search.name })}
                className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all duration-300 text-sm"
              >
                {search.code} - {search.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPapersPage;