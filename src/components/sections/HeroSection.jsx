import { motion } from 'framer-motion';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import LightRays from '../animations/LightRays';
import CircularText from '../animations/CircularText';
import MagicRings from '../animations/MagicRings';
import logoGobelin from '../../assets/logo-gobelin.png';
import './HeroSection.css';

const floatVariants = {
  animate: (i) => ({
    y: [0, -12, 0],
    rotate: [0, i % 2 === 0 ? 8 : -8, 0],
    transition: {
      duration: 4 + i * 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

const highlightStats = [
  { label: 'Campagnes actives', value: '18', icon: 'hgi-sword-01' },
  { label: 'Tables reservees ce soir', value: '52', icon: 'hgi-calendar-03' },
  { label: 'Score communaute', value: '4.9/5', icon: 'hgi-star' },
];

const HeroSection = () => {
  return (
    <section className="hero-section snap-section" id="showcase">
      <div className="hero-section__rays">
        <LightRays
          raysColor="#a7c957"
          raysOrigin="top-center"
          raysSpeed={0.62}
          lightSpread={1.5}
          rayLength={2.2}
          fadeDistance={1.5}
          followMouse
          mouseInfluence={0.2}
        />
      </div>

      <div className="hero-section__rings">
        <MagicRings
          color="#a7c957"
          colorTwo="#bc4749"
          ringCount={5}
          speed={0.7}
          attenuation={10}
          lineThickness={1.5}
          baseRadius={0.2}
          radiusStep={0.08}
          opacity={0.22}
          followMouse
          mouseInfluence={0.14}
          clickBurst
        />
      </div>

      <motion.div
        className="geo-circle hero-geo hero-geo--1"
        style={{ background: 'var(--yellow-green-soft)', border: 'none' }}
        custom={0}
        variants={floatVariants}
        animate="animate"
      />
      <motion.div
        className="geo-square hero-geo hero-geo--2"
        style={{ background: 'var(--blushed-brick)', border: 'none' }}
        custom={1}
        variants={floatVariants}
        animate="animate"
      />
      <motion.div
        className="geo-circle hero-geo hero-geo--3"
        style={{ borderColor: 'var(--yellow-green-soft)', width: 66, height: 66 }}
        custom={2}
        variants={floatVariants}
        animate="animate"
      />
      <motion.div className="geo-triangle hero-geo hero-geo--4" custom={3} variants={floatVariants} animate="animate" />
      <motion.div
        className="geo-square hero-geo hero-geo--5"
        style={{ background: 'var(--sage-green-soft)', border: 'none', width: 20, height: 20 }}
        custom={4}
        variants={floatVariants}
        animate="animate"
      />
      <motion.div className="geo-cross hero-geo hero-geo--6" custom={5} variants={floatVariants} animate="animate" />

      <div className="hero-section__content container">
        <motion.div
          className="hero-section__left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="hero-section__eyebrow tag-chip">
            <i className="hgi-stroke hgi-dashboard-circle" aria-hidden="true" />
            Bar a Jeux + JDR a Bordeaux
          </p>

          <SplitText
            text="PLAYGROUND"
            tag="h1"
            className="hero-section__title"
            splitType="chars"
            delay={44}
            duration={1}
            ease="power3.out"
            from={{ opacity: 0, y: 80, rotateX: -90 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            textAlign="left"
            threshold={0.1}
            rootMargin="-50px"
          />

          <BlurText
            text="Des sessions JDR vivantes, des jeux de societe qui tournent, et une app qui suit ton rythme."
            className="hero-section__subtitle decorative"
            animateBy="words"
            delay={70}
            direction="top"
          />

          <motion.p
            className="hero-section__description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            Univers brutaliste, couleurs tranchantes, et interactions fluides. Reserve ta table,
            commande sans quitter ta partie, et tracke tes performances en direct.
          </motion.p>

          <motion.div
            className="hero-section__tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag-chip">
              <i className="hgi-stroke hgi-book-open-01" aria-hidden="true" />
              +500 jeux
            </span>
            <span className="tag-chip">
              <i className="hgi-stroke hgi-fire" aria-hidden="true" />
              snacks & boissons
            </span>
            <span className="tag-chip">
              <i className="hgi-stroke hgi-notification-03" aria-hidden="true" />
              evenements live
            </span>
          </motion.div>

          <motion.div
            className="hero-section__cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="/app/order" className="btn btn--primary btn--large btn--pill cursor-target">
              <i className="hgi-stroke hgi-cursor-click-01" aria-hidden="true" />
              Commander en table
            </a>
            <a href="/app/stats" className="btn btn--large btn--pill cursor-target">
              <i className="hgi-stroke hgi-chart-line-data-01" aria-hidden="true" />
              Voir mes stats
            </a>
          </motion.div>

          <motion.div
            className="hero-section__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {highlightStats.map((stat) => (
              <article key={stat.label} className="hero-stat card-brutal cursor-target">
                <i className={`hgi-stroke ${stat.icon}`} aria-hidden="true" />
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </article>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-section__right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-mascot card-brutal cursor-target">
            <span className="hero-mascot__badge tag-chip">
              <i className="hgi-stroke hgi-fire" aria-hidden="true" />
              color + impact
            </span>

            <motion.img
              src={logoGobelin}
              alt="Gobelin Playground"
              className="hero-section__gobelin"
              initial={{ scale: 0, rotate: -100 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            />

            <CircularText
              text="PLAYGROUND • BRUTALIST • COLORFUL • "
              spinDuration={13}
              onHover="speedUp"
              className="hero-circular"
            />

            <p className="hero-mascot__caption decorative">L' aventure commence a ta table.</p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="/#features"
        className="hero-section__scroll cursor-target"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <i className="hgi-stroke hgi-cursor-click-01" aria-hidden="true" />
        scroll
      </motion.a>
    </section>
  );
};

export default HeroSection;
