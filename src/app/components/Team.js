// components/Team.jsx
'use client';
import { useRef, useEffect } from 'react';
import Script from 'next/script';
import { teamMembers } from '../data/data';

export default function Team() {
  const teamRefs = useRef([]);

  const personSchemas = teamMembers.map(member => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.photoUrl || '',
    url: member.profileUrl || ''
  }));

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Prime Digital',
        url: 'https://primedigitalid.com',
        logo: 'https://primedigitalid.com/images/PD.png'
      },
      ...personSchemas
    ]
  };

  useEffect(() => {
    let gsapInstance;
    (async () => {
      const gsapModule = await import('gsap');
      const cssPluginMod = await import('gsap/CSSPlugin');
      gsapInstance = gsapModule.gsap || gsapModule.default;
      const CSSPlugin = cssPluginMod.CSSPlugin || cssPluginMod.default;
      gsapInstance.registerPlugin(CSSPlugin);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            gsapInstance.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      teamRefs.current.forEach((el) => el && observer.observe(el));
      return () => teamRefs.current.forEach((el) => el && observer.unobserve(el));
    })();
  }, []);

  return (
    <>
      <Script id="team-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(organizationSchema)}
      </Script>

      <section id="team" className="py-20 relative" aria-labelledby="team-title">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-900/10 to-transparent" />
        <div className="container mx-auto px-10 relative z-10 flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 id="team-title" className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-green-400">Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet the talented professionals dedicated to bringing your digital vision to life
            </p>
          </div>

          <div className="flex flex-wrap w-full gap-8 justify-center items-center">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                ref={(el) => (teamRefs.current[idx] = el)}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-green-900/30 transform translate-y-20 opacity-0 transition-all duration-300 hover:border-green-500/50 hover:-translate-y-2 md:max-h-[35rem] md:h-[30rem] md:max-w-[50rem] sm:w-[25rem] md:w-[20rem] h-fit"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mx-auto mb-6">
                  {member.photoUrl && <img src={member.photoUrl} alt={`Foto ${member.name}`} className="rounded-full w-full h-full object-cover" />}
                </div>
                <h3 className="text-2xl font-bold text-center mb-1">{member.name}</h3>
                <p className="text-green-500 text-center mb-4">{member.role}</p>
                <p className="text-gray-400 text-center">{member.bio}</p>
                <p className="text-gray-400 text-center py-2">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
