import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RiveHeroSection from '../../components/sections/RiveHeroSection';
import HeroSection from '../../components/sections/HeroSection';
import FeaturesSection from '../../components/sections/FeaturesSection';
import EventsSection from '../../components/sections/EventsSection';
import Footer from '../../components/layout/Footer';
import './LandingPage.css';

const WHEEL_THRESHOLD = 48;
const SWIPE_THRESHOLD = 56;
const SCROLL_LOCK_DURATION = 1000;
const SECTION_COUNT = 5;

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const currentSectionRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const touchStartYRef = useRef(null);

  const handleRiveReady = useCallback(() => {
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  const scrollToSection = useCallback((targetIndex) => {
    const boundedIndex = Math.max(0, Math.min(targetIndex, SECTION_COUNT - 1));
    if (boundedIndex === currentSectionRef.current) return;

    isAnimatingRef.current = true;
    currentSectionRef.current = boundedIndex;
    setCurrentSection(boundedIndex);

    setTimeout(() => {
      isAnimatingRef.current = false;
      wheelAccumulatorRef.current = 0;
    }, SCROLL_LOCK_DURATION);
  }, []);

  useEffect(() => {
    document.body.classList.add('snap-mode');

    const handleWheel = (event) => {
      event.preventDefault();
      if (isAnimatingRef.current) return;

      wheelAccumulatorRef.current += event.deltaY;
      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_THRESHOLD) return;

      const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
      wheelAccumulatorRef.current = 0;
      scrollToSection(currentSectionRef.current + direction);
    };

    const handleKeyDown = (event) => {
      if (isAnimatingRef.current) return;

      const isDownKey = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ';
      const isUpKey = event.key === 'ArrowUp' || event.key === 'PageUp';

      if (isDownKey) {
        event.preventDefault();
        scrollToSection(currentSectionRef.current + 1);
      }
      if (isUpKey) {
        event.preventDefault();
        scrollToSection(currentSectionRef.current - 1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        scrollToSection(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        scrollToSection(SECTION_COUNT - 1);
      }
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event) => {
      if (touchStartYRef.current == null || isAnimatingRef.current) {
        touchStartYRef.current = null;
        return;
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - touchEndY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      scrollToSection(currentSectionRef.current + (deltaY > 0 ? 1 : -1));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.classList.remove('snap-mode');
    };
  }, [scrollToSection]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="landing-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="landing-loader__content">
              <motion.img
                src="/playground.svg"
                alt="Playground"
                className="landing-loader__logo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <div className="landing-loader__bar">
                <motion.div
                  className="landing-loader__bar-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="landing-page">
        <div
          className="landing-page__track"
          style={{ transform: `translateY(-${currentSection * 100}svh)` }}
        >
          <div className="landing-page__section">
            <RiveHeroSection onReady={handleRiveReady} />
          </div>
          <SectionReveal active={currentSection >= 1}>
            <HeroSection />
          </SectionReveal>
          <SectionReveal active={currentSection >= 2}>
            <FeaturesSection />
          </SectionReveal>
          <SectionReveal active={currentSection >= 3}>
            <EventsSection />
          </SectionReveal>
          <SectionReveal active={currentSection >= 4}>
            <Footer />
          </SectionReveal>
        </div>

        {SECTION_COUNT > 0 && !isLoading && (
          <div className="landing-section-indicator" role="navigation" aria-label="Progression des sections">
            <span className="landing-section-indicator__count">
              {String(currentSection + 1).padStart(2, '0')} / {String(SECTION_COUNT).padStart(2, '0')}
            </span>
            <div className="landing-section-indicator__dots">
              {Array.from({ length: SECTION_COUNT }).map((_, index) => (
                <button
                  key={`section-${index + 1}`}
                  type="button"
                  className={`landing-section-indicator__dot cursor-target ${index === currentSection ? 'is-active' : ''}`}
                  onClick={() => scrollToSection(index)}
                  aria-label={`Aller a la section ${index + 1}`}
                  aria-current={index === currentSection ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

const SectionReveal = ({ children, active }) => {
  const [hasBeenActive, setHasBeenActive] = useState(false);

  useEffect(() => {
    if (active) setHasBeenActive(true);
  }, [active]);

  return (
    <motion.div
      className="landing-page__section section-reveal"
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={
        hasBeenActive
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.97 }
      }
      transition={{
        duration: 0.8,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default LandingPage;
