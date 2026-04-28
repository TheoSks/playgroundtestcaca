import { motion } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import ScrollVelocity from '../animations/ScrollVelocity';
import './FeaturesSection.css';

const features = [
  {
    icon: 'hgi-book-open-01',
    title: '+500 jeux en rotation',
    description: 'Boardgames, jeux experts, party games et sorties du moment avec staff conseil.',
    color: 'var(--grad-lime)',
  },
  {
    icon: 'hgi-sword-01',
    title: 'Campagnes JDR',
    description: 'One-shots et longues campagnes avec des GMs experimentes et des univers varies.',
    color: 'var(--grad-brick)',
  },
  {
    icon: 'hgi-fire',
    title: 'Commande a table',
    description: 'L app permet de commander boissons et snacks sans casser le flow de la partie.',
    color: 'var(--grad-sage)',
  },
  {
    icon: 'hgi-chart-line-data-01',
    title: 'Statistiques joueur',
    description: 'Suivi de progression personnage, victoires, serie en cours, classement entre amis.',
    color: 'var(--grad-hunter)',
  },
];

const tonightSlots = [
  { time: '18:30', table: 'Table B3', game: 'Heat: Pedal to the Metal' },
  { time: '20:00', table: 'Salle Donjon', game: 'Session JDR - Ombres de Karnath' },
  { time: '21:45', table: 'Table A1', game: 'Terraforming Mars' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const FeaturesSection = () => {
  return (
    <section className="features-section snap-section" id="features">
      <div className="features-section__velocity">
        <ScrollVelocity
          texts={[
            'JEUX DE SOCIETE • CAMPAGNES JDR • COMMANDE IN-APP • CLASSEMENTS LIVE •',
          ]}
          velocity={62}
          className="features-velocity-text"
        />
      </div>

      <div className="container">
        <div className="features-section__header">
          <p className="features-section__kicker">Le coeur de l experience Playground</p>

          <ScrollReveal
            containerClassName="features-reveal"
            textClassName="features-reveal-text"
          >
            Un lieu physique fort + une web app qui fluidifie la partie: reservation, commande et stats en direct.
          </ScrollReveal>

          <h2 className="features-section__title">
            <span className="decorative">Pourquoi</span> Playground frappe fort
          </h2>
        </div>

        <div className="features-section__layout">
          <div className="features-section__grid">
            {features.map((feature, i) => (
              <motion.article
                key={feature.title}
                className="feature-card cursor-target"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="feature-card__top">
                  <div className="feature-card__icon-wrapper" style={{ background: feature.color }}>
                    <i className={`hgi-stroke ${feature.icon}`} aria-hidden="true" />
                  </div>
                  <div className="feature-card__number">0{i + 1}</div>
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            className="features-slot-card cursor-target"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="features-slot-card__eyebrow tag-chip">
              <i className="hgi-stroke hgi-calendar-03" aria-hidden="true" />
              creneaux live
            </p>
            <h3 className="features-slot-card__title">Ce soir a Playground</h3>
            <ul className="features-slot-list">
              {tonightSlots.map((slot) => (
                <li key={slot.time + slot.table}>
                  <span className="features-slot-list__hour">{slot.time}</span>
                  <div>
                    <strong>{slot.table}</strong>
                    <p>{slot.game}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a href="/app/order" className="btn btn--primary btn--large cursor-target">
              <i className="hgi-stroke hgi-cursor-click-01" aria-hidden="true" />
              Commander depuis ma table
            </a>
          </motion.aside>
        </div>
      </div>

      <motion.div
        className="geo-circle features-geo--1"
        style={{ borderColor: 'var(--blushed-brick)', width: 88, height: 88, top: '14%', right: '5%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="geo-square features-geo--2"
        style={{ background: 'var(--yellow-green)', border: 'none', width: 26, height: 26, bottom: '16%', left: '3%' }}
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </section>
  );
};

export default FeaturesSection;
