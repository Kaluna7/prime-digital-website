import Script from 'next/script';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Team from './components/Team';
import Footer from './components/Footer';
import Question from './components/Question';
import { WhatsappBtn } from './utils/WhatsappBtn';

export const metadata = {
  title: 'Prime Digital - Website Solution',
  description: 'Prime Digital menyediakan solusi website, mobile apps, dan keamanan siber premium untuk bisnis Anda.',
  alternates: {
    canonical: '/',  // isikan domain prime digital
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prime Digital",
    "url": "https://primedigitalid.com",
    "logo": "https://primedigitalid.com/images/PD.png",
    "sameAs": [
      "https://facebook.com/primedigital",
      "https://linkedin.com/company/primedigital"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+62-361-123456",
      "contactType": "Customer Service"
    }]
  };

  return (
    <>
      <Script id="organization-jsonld" type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </Script>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services />
          <Pricing />
          <Team />
          <Question />
          <WhatsappBtn />
        </main>
        <Footer />
      </div>
    </>
  );
}
