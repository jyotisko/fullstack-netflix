import React from 'react';
import LandingHeader from './LandingHeader';
import Features from './Features';
import FrequentlyAsked from './FrequentlyAsked';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <>
      <LandingHeader />
      <Features />
      <FrequentlyAsked />
      <Footer />
    </>
  );
}

export default Home;
