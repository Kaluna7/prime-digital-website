'use client';
import { useRef, useEffect } from 'react';
import Script from 'next/script';
import { services } from '../data/data';

export default function Services() {
  const serviceRefs = useRef([]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Prime Digital Services',
    description: 'Comprehensive digital solutions including web development, mobile apps, and cybersecurity.',
    provider: {
      '@type': 'Organization',
      name: 'Prime Digital',
      url: 'https://primedigitalid.com'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Our Services',
      itemListElement: services.map((service, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    }
  };

  useEffect(() => {
    let gsapInstance;

    (async () => {
      const gsapModule = await import('gsap');
      const cssPluginMod = await import('gsap/CSSPlugin');
      gsapInstance = gsapModule.gsap || gsapModule.default;
      const CSSPlugin = cssPluginMod.CSSPlugin || cssPluginMod.default;
      gsapInstance.registerPlugin(CSSPlugin);

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              gsapInstance.to(entry.target, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.2)'
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      serviceRefs.current.forEach(el => el && observer.observe(el));
      return () => serviceRefs.current.forEach(el => el && observer.unobserve(el));
    })();
  }, []);

  return (
    <>
      <Script id="service-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>

      <section id="services" className="py-20 relative" aria-labelledby="services-title">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-900/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 id="services-title" className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-green-400">Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive digital solutions to help your business thrive in the online world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                ref={el => (serviceRefs.current[idx] = el)}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-green-900/30 transform translate-y-20 opacity-0 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-6 text-green-400" aria-hidden="true">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center">
                      <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
