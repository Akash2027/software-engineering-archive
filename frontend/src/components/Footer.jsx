import React from 'react';
import { FiHeart, FiBook, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <FiBook className="text-white" />
              </div>
              <h3 className="text-xl font-bold">VIT Archive</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your central hub for academic resources, question papers, and study materials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/search-papers" className="hover:text-primary transition-colors">Search Papers</a></li>
              <li><a href="/upload-papers" className="hover:text-primary transition-colors">Upload Papers</a></li>
              <li><a href="/notes" className="hover:text-primary transition-colors">Notes</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Question Papers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Study Notes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Reference Books</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <FiMail className="text-primary" />
                <span>support@vitarchive.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMapPin className="text-primary" />
                <span>VIT University, Vellore</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            Made with <FiHeart className="text-red-500 animate-pulse" /> for VIT Students
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2026 VIT Archive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;