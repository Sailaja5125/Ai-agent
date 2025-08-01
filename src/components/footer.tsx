import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#1B1B1B] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-[#059865] text-xl font-bold mb-4">Your Company</h2>
          <p className="text-sm text-gray-300">
            Building scalable, beautiful web experiences with passion and precision.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-[#059865] text-xl font-bold mb-4">Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#059865] transition">Home</a></li>
            <li><a href="#" className="hover:text-[#059865] transition">About</a></li>
            <li><a href="#" className="hover:text-[#059865] transition">Projects</a></li>
            <li><a href="#" className="hover:text-[#059865] transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-[#059865] text-xl font-bold mb-4">Contact</h2>
          <p className="text-sm text-gray-300">Email: info@yourdomain.com</p>
          <p className="text-sm text-gray-300">Phone: +91 9876543210</p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-[#059865] hover:text-white">FB</a>
            <a href="#" className="text-[#059865] hover:text-white">TW</a>
            <a href="#" className="text-[#059865] hover:text-white">GH</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        &copy; 2025 Your Company. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;