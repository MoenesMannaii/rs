"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useUser();
  const userName = user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || "User";

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown and menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.navbar') && (isMenuOpen || isDropdownOpen)) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMenuOpen, isDropdownOpen]);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="fixed z-20 w-full px-8 mx-auto max-w-screen-lg lg:my-2 lg:rounded-full bg-neutral-900/80 backdrop-blur-md navbar">
      <nav className="flex flex-wrap items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-white dark:text-white">
              Runaway Society
            </span>
          </Link>
          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            className="p-2 ml-auto text-white rounded-md lg:hidden hover:text-green-300 focus:text-green-300 focus:bg-green-900/50 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors duration-200"
            onClick={toggleMenu}
            onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>

        {/* Desktop & Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col items-center justify-end flex-1 pt-6 lg:pt-0 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
            <li>
              <Link
                href="#adventure"
                className="text-white dark:text-white hover:text-green-300 focus:text-green-300 transition-colors duration-200 focus-visible:ring-2 ring-green-300 focus:outline-none px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Adventure
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="text-white dark:text-white hover:text-green-300 focus:text-green-300 transition-colors duration-200 focus-visible:ring-2 ring-green-300 focus:outline-none px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white dark:text-white hover:text-green-300 focus:text-green-300 transition-colors duration-200 focus-visible:ring-2 ring-green-300 focus:outline-none px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li className="relative">
              <button
                aria-label="Explore Menu"
                className="flex items-center gap-x-1 text-white dark:text-white hover:text-green-300 focus:text-green-300 transition-colors duration-200 focus-visible:ring-2 ring-green-300 focus:outline-none px-4 py-2 rounded-md"
                onClick={toggleDropdown}
                onKeyDown={(e) => handleKeyDown(e, toggleDropdown)}
              >
                <span>Explore</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293
                    "
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 lg:left-auto lg:right-0 bg-neutral-900/80 mt-4 w-48 rounded-b-md shadow-lg z-20 backdrop-blur-sm">
                  <Link
                    href="#testimonials"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 transition-colors duration-200"
                    onClick={() => {
                      toggleDropdown();
                      setIsMenuOpen(false);
                    }}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="#advices"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 transition-colors duration-200"
                    onClick={() => {
                      toggleDropdown();
                      setIsMenuOpen(false);
                    }}
                  >
                    Eco Tips
                  </Link>
                </div>
              )}
            </li>
          </ul>
          <div className="flex flex-col items-center mt-6 lg:mt-0 lg:flex-row lg:ml-6 gap-3">
            <SignedOut>
              <SignInButton>
                <button className="px-5 py-1.5 text-white dark:text-white border border-white/80 dark:border-white/80 rounded-md font-medium hover:border-green-300 hover:text-green-300 transition-all duration-200">
                  Login
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-5 py-1.5 text-white dark:text-white bg-green-700 rounded-md font-medium hover:bg-green-800 transition-all duration-200">
                  Register
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-10 h-10',
                    userButtonPopoverCard: 'bg-neutral-900/80 backdrop-blur-md text-white',
                  }
                }}
                
              />
               <div className="text-sm text-title">
                      <p className="text-[9px] text-gray-400 font-light">Welcome Back,</p>
                      <p className="font-medium truncate max-w-[120px]" title={userName}>
                        {userName}
                      </p>
                    </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;