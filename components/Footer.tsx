import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-semibold text-white">Runaway Society</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Your one-stop path for hiking, climbing, and camping gear.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-green-400 transition-colors">Blogs</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 text-sm">
                Email: support@northscape.com
                <br />
                Phone: +216 28 888 XXX
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col max-w-7xl items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Runaway Society. All rights reserved.
        </p>

        <div className="flex -mx-2 space-x-4">
          <a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300" aria-label="Instagram">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300" aria-label="Facebook">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-300" aria-label="WhatsApp">
            <FaWhatsapp className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
