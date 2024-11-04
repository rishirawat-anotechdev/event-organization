import React, { useEffect, useRef, useState } from 'react';
import HeaderPage from '../components/HeaderPage';
import HeroPage from '../components/HeroPage';
import WhyChooseUs from '../components/WhyChooseUs';
import CategoryPage from '../components/CategoriesPage';
import EventsShowcase from '../components/EventShowCase';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import FounderPage from '../components/FounderPage';
import BlogPage from '../components/BlogPage';
import ClientSection from '../components/ClientPage';
import Footer from '../components/FooterPage';
import ContactForm from '../components/ContactForm';
import TestimonialPage from '../components/TestimonialPage';

const MainPage = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenModal(true);
    }, 3000); // 3-second delay

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const heroRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);
  const founderRef = useRef(null);
  const blogRef = useRef(null);
  const clientSectionRef = useRef(null);
  const eventShowCaseRef = useRef(null);

  return (
    <>
      <HeaderPage 
        aboutUsRef={aboutUsRef} 
        contactUsRef={contactUsRef}
        founderRef={founderRef}
        blogRef={blogRef}
        clientSectionRef={clientSectionRef}
        eventShowCaseRef={eventShowCaseRef}
      >
        <div ref={heroRef}><HeroPage /></div>
        <div><WhyChooseUs /></div>
        <div><CategoryPage /></div>
        <div ref={eventShowCaseRef}><EventsShowcase /></div>
        <div ref={aboutUsRef}><AboutUs /></div>
        {/* <TestimonialPage /> */}
        <div ref={contactUsRef}><ContactUs /></div>
        <div ref={founderRef}><FounderPage /></div>
        <div ref={blogRef}><BlogPage /></div>
        <div ref={clientSectionRef}><ClientSection /></div>

        <Footer />
        <ContactForm open={openModal} handleClose={handleClose} />
      </HeaderPage>
    </>
  );
};

export default MainPage;
