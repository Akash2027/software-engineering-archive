import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import axios from 'axios';

const SearchBar = ({ onCourseSelect, placeholder = "Search by course code or name..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 1) {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/search?q=${encodeURIComponent(query)}`);
          setSuggestions(response.data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (course) => {
    setQuery(`${course.course_code} - ${course.course_name}`);
    setShowSuggestions(false);
    if (onCourseSelect) {
      onCourseSelect(course);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 text-lg" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <FiX className="text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p className="text-sm mt-2">Searching courses...</p>
            </div>
          )}
          {!isLoading && suggestions.length === 0 && query.length >= 1 && (
            <div className="p-4 text-center text-gray-500">
              <p>No courses found matching "{query}"</p>
              <p className="text-sm mt-1">Try searching by course code or name</p>
            </div>
          )}
          {suggestions.map((course, index) => (
            <button
              key={index}
              onClick={() => handleSelect(course)}
              className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-200 border-b border-gray-100 last:border-0"
            >
              <div className="font-semibold text-gray-800">{course.course_code}</div>
              <div className="text-sm text-gray-500">{course.course_name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;