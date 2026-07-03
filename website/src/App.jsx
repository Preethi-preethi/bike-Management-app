import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import SupportedModels from './components/SupportedModels';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-brand relative overflow-x-hidden text-slate-900 font-inter">
      <div className="ambient-orb bg-accent-neon/30 w-[800px] h-[800px] top-[-200px] left-[-200px]"></div>
      <div className="ambient-orb bg-accent-hover/30 w-[600px] h-[600px] bottom-[-100px] right-[-100px]" style={{ animationDelay: '2s' }}></div>

      <Navbar onOpenBookingModal={openModal} />
      <Hero onOpenBookingModal={openModal} />
      <About />
      <Features />
      <HowItWorks />
      <Testimonials />
      <SupportedModels />
      <Footer />

      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
