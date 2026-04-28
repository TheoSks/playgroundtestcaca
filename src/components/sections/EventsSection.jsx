import { motion } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import CurvedLoop from '../animations/CurvedLoop';
import MagicRings from '../animations/MagicRings';
import './EventsSection.css';

const events = [
  {
    date: 'Mardi 19:30',
    title: 'Session JDR - Ombres de Karnath',
    desc: 'Campagne dark fantasy, 5 places, rythme narration + combat tactique.',
    tag: 'JDR',
    icon: 'hgi-sword-01',
  },
  {
    date: 'Jeudi 20:00',
    title: 'Tournoi Boardgames',
    desc: 'Classement hebdo, lot special, rotation de jeux experts et ambiance arena.',
    tag: 'Tournoi',
    icon: 'hgi-award-01',
  },
  {
    date: 'Samedi 16:00',
    title: 'Initiation JDR',
    desc: 'Format debutant pour apprendre les bases sans pression en 90 minutes.',
    tag: 'Start',
    icon: 'hgi-user-add-01',
  },
];

const appBlocks = [
  {
    title: 'Commande live',
    desc: 'Tu restes en jeu pendant que la cuisine gere la mission.',
    icon: 'hgi-clipboard',
    href: '/app/order',
    cta: 'Ouvrir la commande',
  },
  {
    title: 'Stats joueur',
    desc: 'Visualise progression, victoires et serie en cours.',
    icon: 'hgi-chart-line-data-01',
    href: '/app/stats',
    cta: 'Voir mes stats',
  },
];

const EventsSection = () => {
  return (
    <section className="events-section snap-section" id="events">
      <div className="events-section__rings">
        <MagicRings
          color="#a7c957"
          colorTwo="#bc4749"
          ringCount={4}
          speed={0.55}
          attenuation={12}
          lineThickness={1.4}
          baseRadius={0.23}
          radiusStep={0.09}
          opacity={0.32}
          followMouse
          mouseInfluence={0.16}
          clickBurst
        />
      </div>

      <div className="container events-section__content">
        <div className="events-section__header">
          <p className="events-section__kicker">Evenements + web app</p>
          <h2 className="events-section__title">
            <span className="decorative">Reserve, joue,</span> et tracke ton parcours
          </h2>

          <ScrollReveal
            containerClassName="events-reveal"
            textClassName="events-reveal-text"
          >
            L application relie les deux mondes: l energie du bar et le suivi de ta progression joueur.
          </ScrollReveal>
        </div>

        <div className="events-section__grid">
          <div className="events-section__cards">
            {events.map((event, i) => (
              <motion.article
                key={event.title}
                className="event-card cursor-target"
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.24 } }}
              >
                <div className="event-card__meta">
                  <span className="event-card__tag">{event.tag}</span>
                  <span className="event-card__date">{event.date}</span>
                </div>
                <h3 className="event-card__title">
                  <i className={`hgi-stroke ${event.icon}`} aria-hidden="true" />
                  {event.title}
                </h3>
                <p className="event-card__desc">{event.desc}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            className="events-app-card cursor-target"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="events-app-card__kicker tag-chip">
              <i className="hgi-stroke hgi-dashboard-circle" aria-hidden="true" />
              web app
            </p>
            <h3>Deux ecrans qui boostent la partie</h3>

            <div className="events-app-list">
              {appBlocks.map((block) => (
                <a key={block.title} href={block.href} className="events-app-list__item">
                  <i className={`hgi-stroke ${block.icon}`} aria-hidden="true" />
                  <div>
                    <strong>{block.title}</strong>
                    <p>{block.desc}</p>
                    <span>{block.cta}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>

      <div className="events-section__curved">
        <CurvedLoop
          marqueeText="reserve ton crew • choisis ton scenario • ouvre la commande • monte dans le classement • "
          speed={1.8}
          curveAmount={180}
          className="events-curved-text"
        />
      </div>
    </section>
  );
};

export default EventsSection;
