// components/Footer.jsx
'use client';
import { useRef, useEffect, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function Footer() {
  const footerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && footerRef.current) {
      import('gsap').then(({ gsap }) => {
        gsap.from(footerRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
        });
      });
    }
  }, [isMounted]);

  const currentYear = new Date().getFullYear();

  // const socialLinks = [
  //   { name: 'WhatsApp', icon: <IoLogoWhatsapp className='h-5 w-5' />, link: 'https://wa.me/qr/K5GKCLOXIZ3CE1' },
  //   // { name: 'Facebook', icon: <FaFacebook className='h-5 w-5' />, link: 'https://facebook.com/primedigital' },
  //   // { name: 'Instagram', icon: <AiFillInstagram className='h-5 w-5' />, link: 'https://instagram.com/primedigital' }
  // ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prime Digital',
    url: 'https://primedigitalid.com',
    logo: 'https://primedigitalid.com/images/PD.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62 821 452 220 16',
        contactType: 'Customer Service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English']
      }
    ],
    // sameAs: socialLinks.map(s => s.link)
  };

  return (
    <>
      <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(organizationSchema)}
      </Script>

      <footer
        ref={footerRef}
        className="py-12 bg-gradient-to-t from-green-900/10 to-transparent border-t border-green-900/30 relative overflow-hidden"
        aria-labelledby="footer-title"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0 flex-1 max-w-md">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/PD.png"
                  alt="Prime Digital Logo"
                  width={60}
                  height={60}
                  className="object-contain rounded-xl"
                />
                <div className="ml-4">
                  <h2 id="footer-title" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Prime Digital
                  </h2>
                  <p className="text-gray-400 text-sm">Digital Excellence Redefined</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                We create cutting-edge digital solutions to elevate your business in the online world. From websites to mobile apps and cybersecurity, we&apos;ve got you covered.
              </p>
              {/* <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    aria-label={social.name}
                    className="text-gray-400 hover:text-green-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500/10 transition-colors group-hover:scale-110">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div> */}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-400">Services</h3>
                <ul className="space-y-3">
                  <li><a href="#services" className="text-gray-400 hover:text-green-400">Web Development</a></li>
                  <li><a href="#services" className="text-gray-400 hover:text-green-400">Mobile Apps</a></li>
                  <li><a href="#services" className="text-gray-400 hover:text-green-400">Cyber Security</a></li>
                  <li><a href="#services" className="text-gray-400 hover:text-green-400">UI/UX Design</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-400">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#services" className="text-gray-400 hover:text-green-400">Services</a></li>
                  <li><a href="#team" className="text-gray-400 hover:text-green-400">Our Team</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-green-400">Pricing</a></li>
                  <li><a href="#questions" className="text-gray-400 hover:text-green-400">FAQs</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-400">Contact</h3>
                <ul className="space-y-3">
                  <li className="text-gray-400">+62 821 452 220 16</li>
                  <li className="text-gray-400">info@primedigital.com</li>
                  <li className="text-gray-400">Bali, Indonesia</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-green-900/30 mt-10 pt-8 text-center text-gray-500 text-sm">
            &copy; {currentYear} Prime Digital. All rights reserved.
          </div>
        </div>
        <div className="absolute bottom-10 left-10 w-4 h-4 rounded-full bg-green-500 opacity-20 animate-pulse" />
        <div className="absolute top-20 right-20 w-6 h-6 rounded-full bg-green-500 opacity-10 animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-emerald-400 opacity-30 animate-pulse" />
      </footer>
    </>
  );
}
