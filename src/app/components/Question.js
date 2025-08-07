// components/Question.jsx
'use client'
import { useRef, useEffect, useState } from 'react';
import Script from 'next/script';
import { gsap } from 'gsap';
import { faqs } from '../data/data';

export default function Question() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const questionRefs = useRef([]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(questionRefs.current, {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>

      <section
        ref={sectionRef}
        className="py-20 px-4 sm:px-2 md:px-2 relative overflow-hidden"
        id="questions"
        aria-labelledby="faq-title"
      >
        <div className="text-center mb-16">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-green-400">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and pricing
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => questionRefs.current[index] = el}
              className="mb-4 transform translate-y-20 opacity-0"
            >
              <div
                className={`bg-gray-900/50 backdrop-blur-sm rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? 'border-green-500 shadow-lg shadow-green-500/20'
                    : 'border-green-900/30 hover:border-green-500/50'
                }`}
                onClick={() => toggleQuestion(index)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-xl font-medium pr-4">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-green-500 transition-transform duration-300 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-green-900/30">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Still have questions? We are here to help!
            </p>
            <a
              href="https://wa.me/qr/K5GKCLOXIZ3CE1"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
