'use client';
import { useRef, useEffect } from 'react';
import Script from 'next/script';
import { plans } from '../data/data';

export default function Pricing() {
  const sectionRef = useRef(null);
  const pricingRefs = useRef([]);

  const offerCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    'name': 'Pricing Plans',
    'itemListElement': plans.map((plan, index) => ({
      '@type': 'OfferCatalog',
      'name': plan.name,
      'itemListElement': plan.features.map(feature => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Product',
          'name': plan.name,
          'description': feature
        },
        'price': plan.price.replace(/[^0-9.]/g, ''),
        'priceCurrency': 'USD'
      }))
    }))
  };


  function handleClick() {
 window.location.href = "https://wa.me/qr/K5GKCLOXIZ3CE1";
  }

  useEffect(() => {
    let gsapInstance;

    (async () => {
      const gsapModule = await import('gsap');
      const cssPluginMod = await import('gsap/CSSPlugin');
      gsapInstance = gsapModule.gsap || gsapModule.default;
      const CSSPlugin = cssPluginMod.CSSPlugin || cssPluginMod.default;
      gsapInstance.registerPlugin(CSSPlugin);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const elems = pricingRefs.current.filter(Boolean);
              gsapInstance.to(elems, {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    })();
  }, []);

  return (
    <>
      <Script id="offercatalog-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(offerCatalogSchema)}
      </Script>

      <section
        id="pricing"
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-black via-green-900/5 to-black px-5 md:px-0"
        aria-labelledby="pricing-title"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold mb-4">
              Pricing <span className="text-green-400">Plans</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your business needs. All plans come with our quality guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                ref={(el) => (pricingRefs.current[index] = el)}
                className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border transform translate-y-20 opacity-0 transition-all duration-300 hover:-translate-y-2 flex flex-col relative${
                  plan.popular
                    ? ' border-green-500 scale-105 z-10 shadow-lg shadow-green-500/20'
                    : ' border-green-900/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-green-400 mb-6">{plan.price}</div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mt-1 mr-2">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleClick}
                  className={`w-full py-3 rounded-lg font-bold transition-all  ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

