'use client';
import { useRef, useEffect } from 'react';
import Script from 'next/script';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);


  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://primedigitalid.com/'
      }
    ]
  };

  useEffect(() => {
    let ctx;
    let animationTimeout;

    const loadAnimation = async () => {
      try {
        const gsap = (await import('gsap')).default;

        ctx = gsap.context(() => {
          if (!textRef.current || !buttonRef.current) return;

          const tl = gsap.timeline();

          tl.fromTo(
            Array.from(textRef.current.children),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.2,
              duration: 1,
              ease: 'power3.out',
              delay: 0.5,
            }
          );

          tl.fromTo(
            buttonRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
            },
            '-=0.5'
          );
        });
      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };

    animationTimeout = setTimeout(loadAnimation, 100);

    return () => {
      clearTimeout(animationTimeout);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      {/* JSON-LD for BreadcrumbList */}
      <Script id="breadcrumb-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>

      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center relative overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 ref={textRef} id="hero-title" className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-gray-300">Digital Excellence</span>
              <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mt-2">
                Redefined
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl">
              Prime Digital delivers cutting-edge web solutions, mobile applications,
              and cybersecurity services to elevate your digital presence.
            </p>

            <div ref={buttonRef}>
              <a
                href="https://wa.me/qr/K5GKCLOXIZ3CE1"
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-transform duration-300 hover:scale-105"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          />
        </div>
      </section>
    </>
  );
}
