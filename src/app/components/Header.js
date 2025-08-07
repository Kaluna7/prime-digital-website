"use client";

import { useState, useRef, useEffect } from 'react';
import { navLinks } from '../data/data';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let hasScrolled = false;
    let gsapInstance;

    (async () => {
      const gsapModule = await import('gsap');
      const cssPluginMod = await import('gsap/CSSPlugin');
      gsapInstance = gsapModule.gsap || gsapModule.default;
      const CSSPlugin = cssPluginMod.CSSPlugin || cssPluginMod.default;

      gsapInstance.registerPlugin(CSSPlugin);

      const handleScroll = () => {
        if (!headerRef.current) return;

        const currentY = window.scrollY;

        if (!hasScrolled && currentY > 15) {
          hasScrolled = true;
        }

        if (hasScrolled) {
          if (currentY > lastScrollY && currentY > 80) {
            gsapInstance.to(headerRef.current, { y: -100, duration: 0.1 });
          } else {
            gsapInstance.to(headerRef.current, { y: 0, duration: 0.1 });
          }
        }

        lastScrollY = currentY;
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    })();
  }, []);


  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur-sm border-b border-green-900 transition-all duration-300"
    >
      <div className="container mx-auto px-4 md:py-4 py-2 flex justify-between items-center">
        <div className="mr-4">
                        <Image 
                          src='/images/PD.png'
                          alt='Prime Digital Logo'
                          width={50}
                          height={50}
                          className="object-contain rounded-xl"
                        />
                      </div>

        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative group text-gray-300 hover:text-green-400 transition-colors duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden mt-2 pb-4 flex flex-col space-y-2">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="py-2 px-4 rounded hover:bg-gray-800 text-gray-300 hover:text-green-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
